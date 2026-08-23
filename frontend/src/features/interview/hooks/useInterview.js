import { useState } from "react";
import { startInterview } from "../service/interview.api"




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

    return {loading, error, handleStartInterview};
}