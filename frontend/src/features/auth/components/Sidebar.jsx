import React from "react";
import {  FiSidebar } from "react-icons/fi";
import { GiArtificialHive } from "react-icons/gi";
import { motion } from "motion/react";
import { FiFileText } from "react-icons/fi";
import { FiMap } from "react-icons/fi";
import { FiStar } from "react-icons/fi";
import { WiStars } from "react-icons/wi";
import { FiPlus } from "react-icons/fi";
import { FaRightFromBracket } from "react-icons/fa6";

const Sidebar = ({ collapsed, setCollapsed }) => {
  // Nav Items
  const NAV_ITEMS = [
    {
      icon: <FiFileText size={15} />,
      label: "Resume Builder",
      path: "/resume",
    },
    {
      icon: <FiMap size={15} />,
      label: "Roadmap Builder",
      path: "/roadmap",
    },
    {
      icon: <FiStar size={15} />,
      label: "Resume Scorer",
      path: "/scorer",
    },
  ];

  const innerPart = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between  ">
        {/* Header - logo + title  */}
        <div className="flex gap-2.5 px-4 py-2 border-b">
          <div className="w-7 h-7 rounded-full bg-[#0A0A0A] flex items-center justify-center">
            <GiArtificialHive size={15} />
          </div>
          <span className="font-sans font-extrabold text-base tracking-tight text-black">
            PathPilot
          </span>
        </div>
        <div className="text-black px-2  font-bold cursor-pointer">
          <FiSidebar />
        </div>
      </div>

      {/* create button  */}
      <motion.div
        className=" mx-2 mt-4 mb-2"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button className="flex items-center justify-between gap-4 px-4  py-2 bg-black rounded-xl cursor-pointer">
          <span className="font-bold text-white "><FiPlus /></span>
          <span className="text-sm">Create Interview</span>
        </button>
      </motion.div>

      <div className="flex flex-1 flex-col justify-between  ">
        {/* Agents */}
        <div className="bg-gray-100">
          <span className="text-gray-500 text-xs font-mono px-3">AGENTS</span>
          <div className="my-2 px-2">
            {/* Nav-Label  */}
            {NAV_ITEMS.map((item, idx) => (
              <div className="py-2">
                <motion.button className="flex items-center gap-2 px-4 cursor-pointer">
                  <span className="text-[12px] text-black/50">{item.icon}</span>
                  <span className="text-[10px] sm:text-xs text-black/75">
                    {item.label}
                  </span>
                </motion.button>
              </div>
            ))}
          </div>
        </div>

        {/* footer  */}
        <div className=" flex flex-col px-4 gap-2 ">
          {/* Interview coins */}
          <div className="bg-[#0A0A0A] flex  justify-between items-center px-4 py-2 rounded-md gap-4 cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400"><WiStars size={24}/></span>
           <div className="flex flex-col">
             <span className="text-white text-xs">Interview Coins</span>
            <span className="text-white text-xs">3500</span>
           </div>
            <div>
            </div>
            </div>
            <div className="h-4 w-4 bg-gray-600 flex items-center justify-center rounded-full shadow-[0_0_0_2px_#0A0A0A] ">
                <FiPlus className="text-white" size={14} />
            </div>
          </div>
          {/* account */}
          <div className="bg-gray-200 border flex justify-between items-center px-4 py-2 my-2 rounded-md gap-4 cursor-pointer">
            <div className="flex gap-2 items-center ">
             <div className="w-8 h-8 rounded-full bg-[#0A0A0A] flex items-center justify-center border">
  <span className="text-[10px] font-semibold text-white">MM</span>
</div>
             {/* Name  */}
             <div className="cursor-pointer m">
              <span className="text-xs text-black font-sans ">MOHD MASIHULLA</span>
              <p className="text-[10px] text-gray-400">mashikhanwork@gmail.com</p>
             </div>
            </div>
            <div>
              <FaRightFromBracket className="text-black " size={12} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.aside
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 h-screen w-72 bg-white/75 shadow-2xl"
    >
      {innerPart}
    </motion.aside>
  );
};

export default Sidebar;
