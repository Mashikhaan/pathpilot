import axios from 'axios';

//create axios instance
const InterviewApiInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})



//start interview
export const startInterview = async (data) => {
  try {
    const response = await InterviewApiInstance.post(
      "/api/interview/start",
      {
        role: data.role,
        type: data.type,
        useResume: data.useResume,
        resume: data.resume,
      }
    );

    
    return response.data;

  } catch (error) {
    throw error;
  }
};


//get single interview
export const getInterview = async (id, userId) => {
    try {
        const response = await InterviewApiInstance.get(`/api/interview/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

//get all interview
export const getAllInterview = async () => {
  try {
    const response = await InterviewApiInstance.get(`/api/interview/all`);
    
    return response.data;
  } catch (error) {
    throw error;
  }
}


//submit interview
export const submitAnswer = async (data) => {
  try{
    const response = await InterviewApiInstance.post(
      "/api/interview/answer", 
      {
      interviewId: data.interviewId,
      answer: data.answer,
    },
    );
    return response.data;
  }catch(error){
    throw error;
  }
}





export default InterviewApiInstance