import React, { useEffect, useState } from 'react'
import Step3report from '../components/Step3report'
import { useInterview } from "../hooks/useInterview"
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';

const InterviewReport = () => {
  const { handleGetInterview} = useInterview();
   const [report, setReport] = useState(null);
    const navigate = useNavigate();
    const {id} = useParams();
  
     const user = useSelector((state) => state.auth.user);

     useEffect(() => {
        const fetchReport = async () => {
          if (!id || !user?.userId) return;

          try{
            const result = await handleGetInterview(id, user.userId);
            const interview = result?.interview;

            // if(interview?.status !== "completed"){
            //     navigate(`/interview/${id}`, {
            //     replace: true,
            //   });
            //   return;
            // }
            setReport(interview);
           
          }catch(error){
            console.error("Failed to get interview report:", error);
           
          }
        }
        fetchReport();
     },[id, user?.userId]);

    

  if (!report) return null;
  
  return (
    <Step3report report={report}  user={user} />
  )
}

export default InterviewReport