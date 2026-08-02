import React from 'react'
import { motion } from "motion/react"
import { GiArtificialHive  } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router';

const Navbar = ({onClose}) => {
  return (
    
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className = 'fixed top-0 left-0 w-full bg-white/75 backdrop-blur-md h-14.5  z-50 flex items-center justify-between px-8 py-2 border-b border-black/10'
      >
        {/* left-side logo */}
       <div  className='flex items-center gap-2 cursor-pointer'>
        <div className='w-7 h-7 rounded-full bg-[#0A0A0A] flex items-center justify-center shadow-[0_0_0_2px_#0A0A0A]'><GiArtificialHive  size={15} color='white'/></div>
        <span className='font-extrabold text-base tracking-tight text-black'>PathPilot</span>
       </div>

        {/* right-side button login*/}
        <motion.button  onClick={onClose}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
         className="bg-[#0A0A0A]/80 flex items-center gap-2 backdrop-blur-2xl text-white font-semibold border border-white/10 rounded-md px-3 py-1.5 text-xs cursor-pointer transition-all hover:border-white/40 shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
            Log in <FaArrowRight />
        </motion.button>
        
    </motion.nav>

  )
}

export default Navbar