
import {uploadResume, getResume} from "../service/resume.api.js";
import { setResume, setLoading, setError} from "../state/resume.slice.js";
import {useDispatch} from "react-redux";




export const useResume = () => {
    const dispatch = useDispatch();
  

    //handle upload resume function
    const handleUploadResume = async (resume) => {
        try{
            dispatch(setLoading(true));
            const result = await uploadResume(resume);
            dispatch(setResume(result.data));
            return result
        }catch(error){
            dispatch(setError(error.message))
            throw error
        }finally{
            dispatch(setLoading(false));
        }
    }


    //handle get resume function
    const handleGetResume = async () => {
        try{
            dispatch(setLoading(true));
            const result = await getResume();
            dispatch(setResume(result.data))
            return result
        }catch(error){
            dispatch(setError(error.message))
            throw error
        }finally{
            dispatch(setLoading(false));
        }
        }

        
        return {handleUploadResume, handleGetResume};

    }

