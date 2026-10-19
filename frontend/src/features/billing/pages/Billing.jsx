import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { FiMenu, FiX } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import PricingCard from "../components/PricingCard";
import { useBilling } from "../hooks/useBilling";
import { updateInterviewCoin } from "../../auth/state/auth.slice";

const Billing = () => {

  const [showMenu, setShowMenu] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {loading,error,handleCreateOrder,handleVerifyPayment} = useBilling();

  //Plans
  const plans = [
    {   id: "free",
        title: "Free",
        price: "Free",
        coins: 150,
        button: "Claimed Coins",
        popular: false,
        disabled: true,
        features: [
            "150 Interview Coins",
            "Resume Builder",
            "Resume Scorer",
            "Roadmap Generator",
        ],
    },
    {   id: "starter",
        title: "Starter",
        price: "199",
        coins: 300,
        button: "Buy Now",
        popular: true,
        disabled: false,
        features: [
            "300 Interview Coins",
            "Unlimited Resume Score",
            "Unlimited Roadmaps",
            "Priority AI Response",
        ],
    },
];



//handle payment function
const handlePayment = async (plan) => {
  try {
    if (!window.Razorpay) {
      throw new Error("Razorpay checkout script not load");
    }
    
    const result = await handleCreateOrder(plan.id);
    const order = result.order;

    const checkout = new window.Razorpay({
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "PathPilot",
      description: `${plan.title} plan`,
      order_id: order.id,

      handler: async (paymentDetails) => {
        try {
          const result = await handleVerifyPayment(paymentDetails);
          dispatch(updateInterviewCoin(result.interviewCoin));
          
          window.alert("Payment verified successfully");
        } catch (err) {
          console.error("Payment verification failed:", err);
        }
      },
    });

    checkout.on("payment.failed", (response) => {
      window.alert(
        response.error?.description || "Payment failed"
      );
    });

    checkout.open();
  } catch (err) {
    console.error("Could not start payment:", err);
  }
};


  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="sticky top-0 left-0 w-full bg-white/75 backdrop-blur-md h-14.5  z-50 flex items-center justify-between px-8 py-2 border-b border-black/10"
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <span
            onClick={() => navigate("/dashboard")}
            className="font-extrabold text-base tracking-tight text-black"
          >
            PathPilot
          </span>
          <span className="hidden rounded bg-black/5 px-1.5 py-0.5 text-[10px] text-black/50 sm:block">
            Interview Coins
          </span>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/15 text-black/60 transition hover:border-black/35 hover:text-[#0A0A0A] cursor-pointer"
          >
            {showMenu ? <FiX size={16} /> : <FiMenu size={16} />}
          </button>

          {showMenu && (
            <>
              {/* Mobile Backdrop */}
              <div
                onClick={() => setShowMenu(false)}
                className="fixed inset-0 z-30 bg-black/20 lg:hidden"
              />

              {/* Popup — black glass */}
              <div className="absolute right-0 top-10 z-40 w-60 max-w-[calc(100vw-24px)] rounded-xl overflow-hidden bg-[#000000]/90 backdrop-blur-2xl border border-white/10 p-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
                {/* glass sheen */}
                <div className="absolute inset-0 bg-linear-to-br from-white/8via-transparent to-transparent pointer-events-none" />

                {/* Coins */}
                <div className="relative flex items-center gap-2 border-b border-white/10 pb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-500/15 border border-yellow-400/20">
                    <BsStars className="text-yellow-400 text-sm" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40">Available Coins</p>
                    <h2 className="text-lg font-bold text-white">
                      {user?.interviewCoin}
                    </h2>
                  </div>
                </div>

                {/* Coin Usage */}
                <div className="relative mt-3.5 space-y-1.5">
                  {[
                    { title: "Resume Builder", coin: "-10" },
                    { title: "Resume Scorer", coin: "-10" },
                    { title: "Roadmap Generator", coin: "-20" },
                    { title: "AI Interview", coin: "-50" },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between rounded-lg bg-white/5 border border-white/8 px-2.5 py-1.5"
                    >
                      <span className="text-xs text-white/70">
                        {item.title}
                      </span>
                      <span className="text-xs font-bold text-red-400">
                        {item.coin}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Info */}
                <div className="relative mt-3.5 rounded-lg border border-violet-400/20 bg-violet-500/10 p-2.5">
                  <p className="text-[10px] leading-4 text-violet-300">
                    Every AI feature uses Interview Coins. Buy more coins
                    anytime to continue using Resume Builder, Resume Scorer, AI
                    Interview and Roadmap Generator.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.nav>

      <div className="mx-auto max-w-4xl px-4 py-6">
        <div className="text-center">
                    <h1 className="text-3xl font-bold text-[#0A0A0A]">
                        Interview Coins
                    </h1>
                    <p className="mt-2 text-sm text-black/45">
                        Use coins for Resume Scoring, Resume Builder, AI Interviews, and Roadmap Generation.
                    </p>
                </div>

                <div className="mt-8 grid place-items-center gap-3 md:grid-cols-2">
                  {error && <p role="alert">{error}</p>}
                    {plans.map((plan) => (
                        <PricingCard
                            key={plan.title}
                            {...plan}
                            disabled={plan.disabled || loading}
                            onBuy={() => handlePayment(plan)}
                        />
                    ))}
                </div>

      </div>


    </div>
  );
};

export default Billing;
