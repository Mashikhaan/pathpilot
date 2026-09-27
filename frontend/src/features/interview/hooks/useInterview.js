import { useState } from "react";
import { getAllInterview, getInterview, startInterview, submitAnswer } from "../service/interview.api"




//useInterview custom hook
export const useInterview = () => {
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(null);

    //handle start interview
    const handleStartInterview = async (data) => {
        try{
            setLoading(true);
            setError(null);

           const result = await startInterview(data);
           return result;
        }catch(error){
            setError(error.response?.data?.message || error.message);
            throw error;
        }finally{
            setLoading(false);
        }
    }

    //handle get single interview
    const handleGetInterview = async (id) => {
        try{
            setLoading(true);
            setError(null);

            const result = await getInterview(id);
            return result;
        }catch(error){
            setError(error.response?.data?.message || error.message);
            throw error;
        }finally{
            setLoading(false);
        }
    }


    //handle get all interview
    const handleGetAllInterview = async () => {
        try{
             setLoading(true);
             setError(null);

             const result = await getAllInterview();
             return result;
        }catch(error){
            setError(error.response?.data?.message || error.message);
            throw error;
        }finally{
            setLoading(false);
        }
    }

    //handle submit answer 
    const handleSubmitAnswer = async (data) => {
        try{
            setLoading(true);
            setError(null);

            const result = await submitAnswer(data);
            return result;
        }catch(error){
            setError(error.response?.data?.message || error.message);
            throw error;
        }finally{
            setLoading(false);
        }
    }

    return {loading, error, handleStartInterview, handleGetInterview, handleSubmitAnswer, handleGetAllInterview};
}