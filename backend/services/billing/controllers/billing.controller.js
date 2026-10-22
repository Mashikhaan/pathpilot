import razorpay from "../config/razorpay.js";
import billingModel from "../models/billing.model.js";
import crypto from "crypto";

//PLANS
const PLANS = {
    starter: {
        amount: 199,
        interviewCoin: 300
    }
}

//create order controller
export const createOrderController = async (req, res) => {
    try {
        const {planId} = req.body;
        const userId = req.headers["x-user_id"];
        const plan = PLANS[planId];

        if(!plan){
            return res.status(400).json({
                success: false,
                message: "Invalid plan"
            })
        }

        //create order
        const order = await razorpay.orders.create({
            amount: plan.amount * 100, //amount in paise
            currency: "INR",
            receipt: `receipt-${Date.now()}`
        })

        //create billing
        await billingModel.create({
            userId,
            amount: plan.amount,
            interviewCoins: plan.interviewCoin,
            razorpayOrderId: order.id,
            status: "created"
        })

        return res.status(201).json({
            success: true,
            order
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create order"
        })
    }
}

// verify payment controller
export const verifyPaymentController = async (req, res) => {
     try{

       const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
       } = req.body;
   
       //validation
       if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature){
        return res.status(400).json({
            success: false,
            message: "Payment details are required"
        })
       }

       const payment = await billingModel.findOne({razorpayOrderId: razorpay_order_id});

       if(!payment){
        return res.status(400).json({
            success: false,
            message: "Payment not found"
        })
       }

       if (payment.userId.toString() !== req.headers["x-user_id"]) {
        return res.status(403).json({
            success: false,
            message: "Payment does not belong to this user"
        })
       }

       
       //generate signature 
      const genSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");

      if(genSign !== razorpay_signature){
       payment.status = "failed";

       await payment.save(); //save in mongodb

       return res.status(400).json({
        success: false,
        message: "Payment verification failed"
       })
      }

      if (!process.env.AUTH_SERVICE_URL || !process.env.INTERNAL_SERVICE_SECRET) {
        throw new Error("Auth service URL or internal service secret is not configured");
      }

      const wasAlreadyPaid = payment.status === "paid";

      // Billing calls auth directly; the frontend never chooses the credit amount.
      const creditResponse = await fetch(
        `${process.env.AUTH_SERVICE_URL}/internal/credit-coins`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-internal-secret": process.env.INTERNAL_SERVICE_SECRET
          },
          body: JSON.stringify({
            userId: payment.userId.toString(),
            coins: payment.interviewCoins,
            orderId: payment.razorpayOrderId,
            sessionId: req.headers["x-session-id"]
          })
        }
      );
      const creditResult = await creditResponse.json();

      if (!creditResponse.ok || !creditResult.success) {
        throw new Error(creditResult.message || "Auth service could not credit coins");
      }

      if (payment.status !== "paid") {
        payment.status = "paid";
        payment.razorpayPaymentId = razorpay_payment_id;
        payment.razorpaySignature = razorpay_signature;
        await payment.save();
      }

      return res.status(200).json({
        success: true,
        message: wasAlreadyPaid ? "Payment already verified" : "Payment successfully",
        interviewCoin: creditResult.interviewCoin
      })
     }catch (error) {
  console.error("Payment verification error:", error);

  return res.status(500).json({
    success: false,
    message: "Unable to verify payment right now",
  });
     } 
}
