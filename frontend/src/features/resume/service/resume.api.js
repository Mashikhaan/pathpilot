import axios from "axios";


//create axios instance
const ResumeApiInstance = axios.create({
    baseURL: "http://localhost:8000",
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
        console.log("Error uploading resume:",error);
        throw error;
    }
}


//get resume function
export const getResume = async() => {
    try{
        const response = await ResumeApiInstance.get("/api/resume/get-resume");
        return response.data;
    }catch(error){
        console.log("Error getting resume:",error);
        throw error;
    }
}