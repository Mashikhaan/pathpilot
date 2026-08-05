import React from "react";
import {  FiSidebar } from "react-icons/fi";
import { GiArtificialHive } from "react-icons/gi";
import { motion, transform } from "motion/react";
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
          {!collapsed && (
            <span className="font-extrabold text-base tracking-tight text-black">
              PathPilot
            </span>
          )}
        </div>
        <div  onClick={() => setCollapsed(!collapsed)}
        className="text-black px-2 h-8 w-8 flex items-center bg-white/75 rounded-full hover:bg-gray-200 hover:scale-105 font-bold cursor-pointer">
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
          {!collapsed  && <span className="text-sm">Create Interview</span>}
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
                <motion.button className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-200">
                  <span className="text-[12px] text-black/50 hover:font-bold">{item.icon}</span>
                  {!collapsed && <span className="text-[10px] sm:text-xs text-black/75 hover:text-black/75">
                    {item.label}
                  </span>}
                </motion.button>
              </div>
            ))}
          </div>
        </div>

        {/* footer  */}
      <div className="flex flex-col px-2 gap-2">

  {/* Interview Coins */}
  <div 
    className={`bg-[#0A0A0A] flex items-center rounded-md cursor-pointer group
    ${collapsed ? "justify-center p-3" : "justify-between px-4 py-2"}`}
  >

    <div className={`flex items-center ${collapsed ? "" : "gap-2"}`}>
      <span className="text-yellow-400">
        <WiStars size={24}/>
      </span>

      {!collapsed && (
        <div className="flex flex-col">
          <span className="text-white text-xs">
            Interview Coins
          </span>
          <span className="text-white text-xs">
            3500
          </span>
        </div>
      )}
    </div>


    {!collapsed && (
      <div className="h-4 w-4 bg-gray-600 flex items-center justify-center rounded-full">
        <FiPlus className="text-white" size={14}/>
      </div>
    )}

  </div>


  {/* Account */}
  <div 
    className={`bg-gray-200 border rounded-md cursor-pointer flex items-center
    ${collapsed ? "justify-center p-2" : "justify-between px-4 py-2"}`}
  >

    <div className="flex items-center gap-2">

      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
        <span className="text-[10px] font-semibold text-white">
          MM
        </span>
      </div>


      {!collapsed && (
        <div>
          <span className="text-xs text-black">
            MOHD MASIHULLA
          </span>

          <p className="text-[10px] text-gray-400">
            mashikhanwork@gmail.com
          </p>
        </div>
      )}

    </div>


    {!collapsed && (
      <FaRightFromBracket size={12}/>
    )}

  </div>

</div>
      </div>
    </div>
  );

  return (
    <motion.aside
      animate = {{ width: collapsed ? 72 : 250 }}
      transition={{ duration: 0.5 ,ease: "easeInOut" }}
      className="fixed top-0 left-0 h-screen w-72 bg-white/75 shadow-2xl"
    >
      {innerPart}
    </motion.aside>
  );
};

export default Sidebar;
