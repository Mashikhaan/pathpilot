
import { useState } from "react";
import { useCallback } from "react";
import { generateRoadmap, getAllRoadmaps, getRoadmapById, } from "../services/roadmap.api";

export const useRoadmap = () => {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
   const [historyLoading, setHistoryLoading] = useState(false);

  // Function to handle roadmap generation
  const handleGenerateRoadmap  = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const result = await generateRoadmap(data);
      console.log(result.data)
      setRoadmap(result.data);
      return result;
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to generate roadmap"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
 // clear roadmap
  const clearRoadmap = () => {
  setRoadmap(null);
  setError(null);
};

// function to get all roadmaps
const handleGetAllRoadmaps = useCallback(async () => {
  try {
    setHistoryLoading(true);
    const result = await getAllRoadmaps();
    setHistory(result.data);
    return result;
  } catch (error) {
    throw error;
  } finally {
    setHistoryLoading(false);
  }
}, []);


//function to get roadmap by id
const handleGetRoadmapById = useCallback(async (id) =>{
    try {
      setLoading(true)
      setError(null)
      const result = await getRoadmapById(id);
      return result;
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      throw error;
    }finally{
      setLoading(false)
    }
})


  return {
    roadmap,
    setRoadmap,
    loading,
    error,
    handleGenerateRoadmap ,
    history,
    historyLoading,
    clearRoadmap,
    handleGetAllRoadmaps,
    handleGetRoadmapById
  };
};
