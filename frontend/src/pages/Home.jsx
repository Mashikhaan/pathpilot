import React from 'react'
import Navbar from '../components/Navbar'
import { LoginModel } from '../components/LoginModel'
import { useState } from 'react'

const Home = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false)
  return (
    <div className='bg-white/75 text-[#0A0A0A] font-sans min-h-screen overflow-x-hidden'>
        {/* navbar */}
        <Navbar onClose={() => setIsLoginOpen(true)} />

        {/* main content  */}
        <section className= 'relative pt-20 pb-14 overflow-hidden bg-[#F8F9FA]'>

        </section>
         {/* Login Modal placeholder */}
       {isLoginOpen && <LoginModel onClose={() => setIsLoginOpen(false)} />}
    </div>
  )
}

export default Home