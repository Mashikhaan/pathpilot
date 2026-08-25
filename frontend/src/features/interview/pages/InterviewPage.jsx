import  { useEffect, useState } from 'react'
import Step2interview from '../components/Step2interview'
import { useInterview } from '../hooks/useInterview'
import { useNavigate, useParams } from "react-router";
import { useSelector } from 'react-redux';

const InterviewPage = () => {
  const {loading,handleGetInterview} = useInterview();
  const [interview, setInterview] = useState(null);
  const navigate = useNavigate();
  const {id} = useParams();

   const user = useSelector((state) => state.auth.user);

 useEffect(() => {
    const fetchInterview = async () => {
      if (!id || !user?.userId) return;

      try {
        const result = await handleGetInterview(id, user.userId);

        if(result.interview.status === "completed"){
            navigate(`/interview/${id}/report`, {
            replace: true,
          });
          return;
        }

        console.log("GET INTERVIEW RESPONSE:", result);

        setInterview(result.interview);
      } catch (error) {
        console.error("Failed to get interview:", error);
      }
    };

    fetchInterview();
  }, [id, user?.userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07000F] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white animate-spin" />
      </div>
    );
  }

  if (!interview) return null;

  return (
    <Step2interview
    interviewData = {{
      interviewId: interview._id,
      currentQuestion: interview.currentQuestion,
      totalQuestions: interview.questions.length,
      question: interview.questions[interview.currentQuestion]
    }}
    user ={user}
    />
  )
}

export default InterviewPage