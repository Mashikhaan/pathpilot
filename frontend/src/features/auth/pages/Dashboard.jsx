import React from 'react'
import Sidebar from '../components/Sidebar'
import MainContent from '../components/MainContent'
import { useState } from 'react';

const Dashboard = () => {
  
    const [collapsed, setCollapsed] = useState(false);
    const [mobileView, setMobileView] = useState(false);
  return (
    <div className='bg-gray-200 min-h-screen flex'>
     <Sidebar 
     collapsed={collapsed} setCollapsed={setCollapsed} mobileView={mobileView} setMobileView={setMobileView} />
    
    </div>
  )
}

export default Dashboard