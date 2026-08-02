import { RxCross2 } from "react-icons/rx";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

export function LoginModel({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-md px-8">
      <div className="relative w-full max-w-sm bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.25)] ">
        {/* glassMorphic seen  */}
        <div className="absolute inset-0 bg-linear-to-br from-white/8 via-transparent to-transparent pointer-events-none" />

        {/* Header   */}
        <div className="relative p-7">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/60 cursor-pointer hover:text-white transition-all"
          >
            <RxCross2 size={20} />
          </button>
          <h2
            className="text-lg font-bold text-center mb-2 text-white "
          >
            Sign in to{" "}
            <span className="font-extrabold text-lg tracking-tight text-white">
              PathPilot
            </span>
          </h2>

          <p
            className="
            text-white/45
            text-center
            text-xs
          "
          >
            Continue your AI interview journey
          </p>

          {/* google login button */}
          <div className="mt-7">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center  
                rounded-xl gap-3
                border border-white/15
                bg-white/10 backdrop-blur-md
                hover:border-white/25
                hover:bg-white/[0.14]
                shadow-inner
                transition-all py-2"
            >
              <FcGoogle size={20} />
              <span className="text-white font-bold text-sm">
                Continue with Google
              </span>
            </motion.button>
          </div>
        </div>
        {/* Bottom */}
        <div
          className="
          relative
          border-t border-white/10
          bg-black/30
          p-4
          text-center
        "
        >
          <p className="text-white/30 text-xs">
            Secure authentication powered by Firebase.
          </p>
        </div>
      </div>
    </div>
  );
}
