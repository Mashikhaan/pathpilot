import React from "react";
import { FiSidebar } from "react-icons/fi";
import { GiArtificialHive } from "react-icons/gi";
import { motion } from "motion/react";
import { FiFileText } from "react-icons/fi";
import { FiMap } from "react-icons/fi";
import { FiStar } from "react-icons/fi";
import { WiStars } from "react-icons/wi";
import { FiPlus } from "react-icons/fi";
import { FaRightFromBracket } from "react-icons/fa6";
import { useNavigate } from "react-router";
import {useSelector} from "react-redux"
import { useAuth } from "../hooks/useAuth";

const Sidebar = ({ collapsed, setCollapsed, mobileView, setMobileView }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const {handleLogout} = useAuth();

  //User Avatar
  const avatar = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  //User Name
    const userName = user?.name
    //User Email
    const userEmail = user?.email

  //Logout user function
  const logOut = () =>{
    handleLogout();
    navigate("/");
  }

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
      <div className="flex items-center justify-between">
        {/* Header - logo + title  */}
        <div className="flex gap-2.5 px-4 py-2 border-b">
          <div className="w-7 h-7 rounded-full bg-[#0A0A0A] flex items-center justify-center">
            <GiArtificialHive size={15} />
          </div>
          {!collapsed && (
            <motion.span
              initial={false}
              animate={{
                opacity: collapsed ? 0 : 1,
                width: collapsed ? 0 : "auto",
              }}
              transition={{ duration: 0.3 }}
              className="font-extrabold text-base tracking-tight text-black whitespace-nowrap"
            >
              PathPilot
            </motion.span>
          )}
        </div>
        <div
          onClick={() => setCollapsed(!collapsed)}
          className="text-black px-2 h-8 w-8 flex items-center bg-white/75 rounded-full hover:bg-gray-200 hover:scale-105 font-bold cursor-pointer"
        >
          <FiSidebar />
        </div>
      </div>

      {/* create button  */}
    <motion.div
  className="mx-2 mt-4 mb-2"
  initial={{ opacity: 0, y: -5 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
  <button
    onClick={() => navigate("/interview")}
    className={`group flex items-center bg-black text-white rounded-xl transition-all duration-300 overflow-hidden cursor-pointer
      ${collapsed ? "justify-center w-12 h-12" : "justify-start gap-3 w-full px-4 py-3"}`}
  >
    <span className="inline-flex transition-transform duration-300 group-hover:rotate-90">
      <FiPlus size={18} />
    </span>

    <span
      className={`whitespace-nowrap transition-all duration-300
      ${collapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-[200px]"}`}
    >
      Create Interview
    </span>
  </button>
</motion.div>

      <div className="flex flex-1 flex-col justify-between">
        {/* Agents */}
        <div className="bg-gray-100">
          <span className="text-gray-500 text-xs font-mono px-3">AGENTS</span>
          <div className="my-2 px-2">
            {/* Nav-Label  */}
            {NAV_ITEMS.map((item, idx) => (
              <div key={idx} className="py-2">
                <motion.button
                  onClick={() => navigate(item.path)}
                  className={`flex items-center py-2 cursor-pointer hover:bg-gray-200 rounded-md ${
                    collapsed
                      ? "justify-center px-3"
                      : "gap-2 px-4 hover:translate-x-2 transition-all duration-200 ease-in-out "
                  }`}
                >
                  <span className="text-[12px] text-black/50 hover:font-bold">
                    {item.icon}
                  </span>

                  <motion.span
                    initial={false}
                    animate={{
                      opacity: collapsed ? 0 : 1,
                      width: collapsed ? 0 : "auto",
                    }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden whitespace-nowrap text-[10px] sm:text-xs text-black/75"
                  >
                    {item.label}
                  </motion.span>
                </motion.button>
              </div>
            ))}
          </div>
        </div>

        {/* footer */}
        <div className="flex flex-col px-2 gap-2">
          {/* Interview Coins */}
          <div  onClick={() => navigate("/pricing")}
            className={`bg-[#0A0A0A] flex items-center rounded-md cursor-pointer group ${
              collapsed ? "justify-center p-3" : "justify-between px-4 py-2"
            }`}
          >
            <div className={`flex items-center ${collapsed ? "" : "gap-2"} group`}>
              <span className="text-yellow-400 animate-spin group-hover:animate-none">
                <WiStars size={24} />
              </span>

              <motion.div
                initial={false}
                animate={{
                  opacity: collapsed ? 0 : 1,
                  width: collapsed ? 0 : "auto",
                }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <div className="flex flex-col">
                  <span className="text-white text-xs">Interview Coins</span>
                  <span className="text-white text-xs">3500</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={false}
              animate={{
                opacity: collapsed ? 0 : 1,
                scale: collapsed ? 0.8 : 1,
                width: collapsed ? 0 : "auto",
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="h-4 w-4 bg-gray-600 flex items-center justify-center rounded-full">
                <FiPlus className="text-white" size={14} />
              </div>
            </motion.div>
          </div>

          {/* Account */}
          <div
            className={`bg-gray-200 border rounded-md flex items-center cursor-pointer  ${
              collapsed ? "justify-center p-2" : "justify-between px-2 py-2"
            }`}
          >
            <div className="flex items-center  gap-2 ">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shadow-[0_0_0_2px_black] hover:bg-black/95 ">
                <span className="text-[10px] font-semibold text-white">{avatar}</span>
              </div>

              <motion.div
                initial={false}
                animate={{
                  opacity: collapsed ? 0 : 1,
                  width: collapsed ? 0 : "auto",
                }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <div>
                  <span className="text-xs text-black">{userName}</span>
                  <p className="text-[11px] text-gray-400">
                    {userEmail}
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={false}
              animate={{
                opacity: collapsed ? 0 : 1,
                scale: collapsed ? 0.8 : 1,
                width: collapsed ? 0 : "auto",
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <FaRightFromBracket onClick={logOut}
               className="text-black hover:text-black/80 hover:scale-105 inline-block hover:scale-105 transition-all duration-200 ease-in-out " size={14} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 250 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="md:block fixed top-0 left-0 h-screen w-72 bg-white/75 shadow-2xl"
      >
        {innerPart}
      </motion.aside>

      {/* Mobile Sidebar */}
      {/* <motion.aside
        initial={false}
        animate={{
          x: mobileView ? 0 : "-100%",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="md:hidden fixed top-0 left-0 h-screen w-[250px] bg-white shadow-2xl z-50"
      >
        {innerPart}
      </motion.aside> */}
    </>
  );
};

export default Sidebar;
