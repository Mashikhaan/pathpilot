import axios from 'axios';

//create axios instance
const InterviewApiInstance = axios.create({
    baseURL: "http://localhost:8000",
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
      },
      {
        headers: {
          "x-user-id": data.userId,
        },
      }
    );

    console.log(response.data);
    return response.data;

  } catch (error) {
    console.log("Error starting interview:", error);
    throw error;
  }
};









export default InterviewApiInstance