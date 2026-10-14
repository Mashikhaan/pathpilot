
import { useState } from "react";
import { generateRoadmap } from "../services/roadmap.api";

export const useGenerateRoadmap = () => {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateRoadmap  = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const result = await generateRoadmap(data);
      console.log(result.data)
      setRoadmap(result);
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
  return {
    roadmap,
    loading,
    error,
    handleGenerateRoadmap ,
    clearRoadmap
  };
};
