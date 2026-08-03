import { googleLogin, getCurrentUser }  from "../service/auth.api.js";
import { setUser, setLoading, setError } from "../state/auth.slice.js";
import { useDispatch } from "react-redux";




export const useAuth = () =>{
    const dispatch = useDispatch();
  
     //handle google login
     const handleGoogleLogin = async () => {
       const data = await googleLogin();
       dispatch(setUser(data));
      
     }

     //handle current user
     const handleCurrentUser = async () => {
       try{
        dispatch(setLoading(true));
        const data = await getCurrentUser();
        dispatch(setUser(data?.user || null))
       }catch(error){
        dispatch(setError(error.message))
        dispatch(setUser(null))
       }finally{
        dispatch(setLoading(false));
       }
     }

    return {handleGoogleLogin, handleCurrentUser}
}