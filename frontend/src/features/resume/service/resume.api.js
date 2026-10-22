import axios from "axios";


//create axios instance
const ResumeApiInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
});


//upload function
export const uploadResume = async(resume) =>{
    try{
          const formData = new FormData();
          formData.append("resume", resume);

        const response = await ResumeApiInstance.post("/api/resume/upload",formData);
        return response.data;
    }catch(error){
        throw error;
    }
}


//get resume function
export const getResume = async() => {
    try{
        const response = await ResumeApiInstance.get("/api/resume/get-resume");
        return response.data;
    }catch(error){
        throw error;
    }
}