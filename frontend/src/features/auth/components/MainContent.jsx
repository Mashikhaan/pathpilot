import React from 'react'
import {motion} from "motion/react"
import { FiSidebar } from "react-icons/fi";
import { useSelector } from 'react-redux';
import StatBox from '../../interview/components/StatBox';
import { useInterview } from '../../interview/hooks/useInterview';
import { useState,useEffect } from 'react';
import InterviewGraph from '../../interview/components/InterviewGraph';


const MainContent = () => {
  const user = useSelector((state) => state.auth.user);
  const firstName = user?.name?.split(' ')[0] || "John"; 

      const { handleGetAllInterview } = useInterview();
     
    const [stats, setStats] = useState({
  
      totalInterviews: 0,
  
      totalQuestions: 0,
  
      completed: 0,
  
      averageScore: 0,
  
    });
  
    const [technicalData, setTechnicalData] = useState([]);
  
    const [behaviouralData, setBehaviouralData] = useState([]);
  
    const [technicalCount, setTechnicalCount] = useState(0);
  
    const [hrCount, setHrCount] = useState(0);
  
  useEffect(() =>{
    const fetchInterviews = async () => {
      try {
        const response = await handleGetAllInterview();
  
        setStats(response.stats);
        setTechnicalData(response.technicalAverage || []);
        setBehaviouralData(response.hrAverage || []);
        setTechnicalCount(response.technicalCount);
        setHrCount(response.hrCount);
      } catch (error) {
        console.error("Failed to fetch interviews:", error);
      }
    };
  
    fetchInterviews();
  },[])
  
  return (
   <div className="w-full min-h-screen bg-white px-6 pt-6">

      {/* Top Bar */}

        <div className="flex items-center justify-between mb-5 md:mb-6">

          <div className="flex items-center gap-2.5">


            <motion.div

              initial={{ opacity: 0, y: -12 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ duration: 0.4 }}

            >

              <p className="text-black/40 text-[11px] md:text-xs font-medium mb-0.5">

                Overview

              </p>

              <h1 className="text-lg md:text-xl font-bold text-[#0A0A0A]">

                Hello, {firstName} 👋

              </h1>

            </motion.div>

          </div>



        </div>



        {/* Divider */}

        <div className="h-px bg-black/8 mb-5 md:mb-6" />

        
        {/* Stat Boxes */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5 md:gap-3">

          <StatBox

            label="Total Interviews"

            value={stats?.totalInterviews}

            subHighlight="All Time"

            sub="Interviews Created"

            index={0}

          />



          <StatBox

            label="Questions Solved"

            value={stats?.totalQuestions}

            subHighlight="Answered"

            sub="Across All Interviews"

            index={1}

          />



          <StatBox

            label="Completed"

            value={stats?.completedInterviews || 0}

            subHighlight={`${stats?.totalInterviews || 0} Total`}

            sub="Interviews Finished"

            index={2}

          />



          <StatBox

            label="Average Score"

            value={`${Math.round(stats?.averageScore || 0)}/100`}

            subHighlight="Completed Only"

            sub="Average Performance"

            index={3}

          />

        </div>


        {/* Interview Graph */}

        <motion.div

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          transition={{ duration: 0.4, delay: 0.3 }}

          className="mb-3 md:mb-4"

        >

          <p className="text-black/40 text-[10px] font-semibold uppercase tracking-widest mt-2.5 mb-1">

            Performance

          </p>

          <h2 className="text-[#0A0A0A] font-bold text-sm md:text-base mb-3 md:mb-4">

            Interview History

          </h2>

        </motion.div>


         <div className="w-full overflow-x-auto">

          <InterviewGraph technicalData={technicalData} behaviouralData={behaviouralData} technicalCount={technicalCount} hrCount={hrCount} />

         </div>


    </div>
  )
}

export default MainContent