import React from "react";
import Navbar from "../components/Navbar";
import { LoginModel } from "../components/LoginModel";
import { useState } from "react";
import { motion } from "motion/react";
import { FaArrowRightLong } from "react-icons/fa6";
import HeroImage from "../assets/Dashboard.png";
import { FiFileText } from "react-icons/fi";
import { FiMic } from "react-icons/fi";
import { FiBarChart2 } from "react-icons/fi";
import { FiMap } from "react-icons/fi";

const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <div className="bg-white/75 text-[#0A0A0A] font-sans min-h-screen overflow-x-hidden">
      {/* navbar */}
      <Navbar onClose={() => setIsLoginOpen(true)} />

      {/* main content  */}
      <section className="relative overflow-hidden py-20  bg-white">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08),transparent_60%)]" />
        <div className="absolute left-1/2 top-32 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[120px]" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
          <div className="max-w-4xl text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4 mb-3 inline-flex items-center rounded-full border border-gray-200 bg-white/15 px-5 py-2 text-sm font-medium text-gray-600 shadow-sm backdrop-blur-md"
            >
              AI Career Companion
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl font-sans leading-tight tracking-tight text-gray-900 md:text-7xl"
            >
              Land Your{" "}
              <span className="bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                Dream Role
              </span>
              <br />
              <span className="text-gray-400">
                With Smarter Interview Practice
              </span>
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 md:text-xl"
            >
              Prepare with realistic AI interview simulations, receive instant
              feedback, improve your confidence, and walk into every interview
              ready to stand out.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="mt-4 mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            > 
              <motion.button
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsLoginOpen(true)}
                className="group flex items-center gap-2 rounded-xl bg-gray-900 px-8 py-4 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-black cursor-pointer "
              >
                Start Practicing
                <FaArrowRightLong
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.button>

              <button className="group relative overflow-hidden rounded-xl border border-indigo-500 px-8 py-4 font-medium text-indigo-600 transition-all duration-300 cursor-pointer">
                {/* Fill Animation */}
                <span className="absolute inset-y-0 left-0 w-0 bg-indigo-900 transition-all duration-500 ease-out group-hover:w-full"></span>

                {/* Text */}
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  Watch Demo
                </span>
              </button>
            </motion.div>

            {/* Hero Image  */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-16 mb-8 py-4 rounded-lg overflow-hidden  shadow-[0_0_60px_rgba(0,0,0,0.06)] max-w-5xl mx-auto bg-gray-100"
            >
              <img
                src={HeroImage}
                alt=""
                className="w-full h-auto object-cover block "
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Agents section  */}
      <section className="pt-10 pb-20 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-black/10 bg-black/5 text-black/70 text-xs font-semibold tracking-wide uppercase mb-5">
              AI Multi Agent
            </div>

            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#0A0A0A] leading-tight">
              AI Agents Designed For
              <span className="block text-black/40">
                Every Step of Your Career Journey
              </span>
            </h2>

            <p className="mt-5 max-w-3xl mx-auto text-[15px] md:text-base leading-8 text-black/55">
              From building an ATS-optimized resume to mastering technical
              interviews, Fresher.AI combines specialized AI agents that help
              you prepare smarter, improve faster, and increase your chances of
              securing top opportunities.
            </p>
          </div>

          {/* Cards */}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <FiFileText />,
                title: "Resume Builder",
                desc: "Generate ATS-friendly resumes tailored to your skills, experience, and target job roles.",
              },
              {
                icon: <FiMic />,
                title: "Interview Coach",
                desc: "Practice HR, technical, and coding interviews with realistic AI-driven interview simulations.",
              },
              {
                icon: <FiBarChart2 />,
                title: "Performance Insights",
                desc: "Receive detailed evaluations, communication analysis, scoring, and personalized improvement suggestions.",
              },
              {
                icon: <FiMap />,
                title: "Career Roadmap",
                desc: "Get structured learning plans and skill recommendations aligned with your career goals.",
              },
            ].map((agent, i) => (
              <motion.div
                key={agent.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl bg-gray-300 p-6 shadow-sm hover:shadow-2xl transition-all duration-300"
              >
                {/* glass sheen */}
                <div className="absolute inset-0 bg-linear-to-br from-white/8 via-transparent to-transparent pointer-events-none" />
                {/* hover glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-[#0A0A0A] text-white flex items-center justify-center text-xl shadow-lg mb-5">
                    {agent.icon}
                  </div>

                  <h3 className="text-lg font-bold text-[#0A0A0A] mb-3">
                    {agent.title}
                  </h3>

                  <p className="text-sm text-black/60">{agent.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer  */}
      <footer className="border-t border-black/10 bg-gray-50 py-2">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-center md:flex-row md:text-left">
          <div>
            <h3 className="text-lg font-bold text-[#0A0A0A]">PathPilot</h3>
            <p className="mt-1 text-sm text-black/60">
              AI-powered interview preparation & career guidance.
            </p>
          </div>

          <div className="text-sm text-black/50">
            © {new Date().getFullYear()} PathPilot. All rights reserved.
          </div>

          <div className="text-sm font-medium text-black/70">
            Built with <span className="text-red-500">♥</span> by{" "}
            <span className="text-[#0A0A0A]">MOHD MASIHULLA</span>
          </div>
        </div>
      </footer>

      {/* Login Modal placeholder */}
      {isLoginOpen && <LoginModel onClose={() => setIsLoginOpen(false)} />}
    </div>
  );
};

export default Home;
