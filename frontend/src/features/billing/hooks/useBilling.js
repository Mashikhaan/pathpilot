import { useState } from "react";
import { createOrder, verifyPayment } from "../service/billing.api";



export const useBilling = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //handle create order function
    const handleCreateOrder = async (planId) => {
        try{
            setLoading(true);
            setError(null);

            return await createOrder(planId);
        }catch(error){
         setError(
            error.response?.data?.message || error.message || "Could not create payment order"
         )
         throw error;
        }finally{
         setLoading(false);
        }
    }
    

    //handle verify payment
    const handleVerifyPayment = async (paymentDetails) => {
          try {
      setLoading(true);
      setError(null);

      return await verifyPayment(paymentDetails);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Could not verify payment"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  
    return { loading, error, handleCreateOrder, handleVerifyPayment };
  };