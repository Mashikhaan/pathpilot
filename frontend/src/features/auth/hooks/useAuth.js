import { googleLogin, getCurrentUser, logOutUser }  from "../service/auth.api.js";
import { setUser, setError, setLoggingIn, setCheckingAuth } from "../state/auth.slice.js";
import { useDispatch } from "react-redux";




export const useAuth = () =>{
    const dispatch = useDispatch();
   
  
     //handle google login
    const handleGoogleLogin = async () => {
  try {
    dispatch(setLoggingIn(true));

    const data = await googleLogin();

    dispatch(setUser(data?.user || data));
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || error.message)
    );
    throw error;
  } finally {
    dispatch(setLoggingIn(false));
  }
};
     //handle current user
     const handleCurrentUser = async () => {
       try{
        dispatch(setCheckingAuth(true));
        const data = await getCurrentUser();
        dispatch(setUser(data?.user || null))
       }catch(error){
        dispatch(setError(error.message))
        dispatch(setUser(null))
       }finally{
        dispatch(setCheckingAuth(false));
       }
     }

     //handle logout user
     const handleLogout = async() =>{
      try {
        dispatch(setCheckingAuth(true));
        await logOutUser();
        dispatch(setUser(null));
      } catch (error) {
        dispatch(setError(error.message));
        throw error;
      } finally {
        dispatch(setCheckingAuth(false));
      }
     }

    return {handleGoogleLogin, handleCurrentUser, handleLogout}
}