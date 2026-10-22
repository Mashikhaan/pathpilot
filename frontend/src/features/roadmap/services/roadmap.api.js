import axios from "axios";

//create axios instance
const RoadmapApiInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})

//generate roadmap api
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
        throw error;
    }
}

//get all roadmaps api
export const getAllRoadmaps = async () => {
    try{
        const response = await RoadmapApiInstance.get("/api/roadmap/all")
        return response.data;
    }catch(error){
        throw error;
    }
}

//get roadmap by id api
export const getRoadmapById = async (id) => {
    try {
        const response = await RoadmapApiInstance.get(`/api/roadmap/${id}`)
        return response.data;
    } catch (error) {
        throw error;
    }
}