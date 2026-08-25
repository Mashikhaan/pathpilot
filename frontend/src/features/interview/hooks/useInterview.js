import { useState } from "react";
import { getInterview, startInterview, submitAnswer } from "../service/interview.api"




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
    const handleGetInterview = async (id,userId) => {
        try{
            setLoading(true);
            setError(null);

            const result = await getInterview(id,userId);
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

    return {loading, error, handleStartInterview, handleGetInterview, handleSubmitAnswer};
}