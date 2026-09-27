import React from 'react'
import Sidebar from '../components/Sidebar'
import MainContent from '../components/MainContent'
import { useState, useEffect } from 'react';

const Dashboard = () => {
  
    const [collapsed, setCollapsed] = useState(false);
    const [mobileView, setMobileView] = useState(false);

  return (
    <div className='bg-white min-h-screen flex'>
     <Sidebar 
     collapsed={collapsed} setCollapsed={setCollapsed} mobileView={mobileView} setMobileView={setMobileView} />

      {/* Main — desktop margin matches sidebar width */}
    <main
  className={`flex-1 min-w-0 min-h-screen transition-[margin] duration-500  ease-in-out ${
    collapsed ? "ml-18 pl-6" : "ml-62.5 pl-6"
  }`}
>
  <MainContent />
</main>

    </div>
  )
}

export default Dashboard