import axios from "axios";

//create axios instance
const RoadmapApiInstance = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true
})


export const generateRoadmap = async (data) => {
    try{
        const response = await RoadmapApiInstance.post("/api/roadmap/generate",
        {
         role: data.role,
         targetPackage: data.targetPackage,
         useResume: data.useResume,
         resume: data.resume
        })

        return response.data;
    }catch(error){
        console.log("Error generating roadmap:", error);
        throw error;
    }
}