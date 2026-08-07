import { googleLogin, getCurrentUser, logOutUser }  from "../service/auth.api.js";
import { setUser, setLoading, setError } from "../state/auth.slice.js";
import { useDispatch } from "react-redux";
    



export const useAuth = () =>{
    const dispatch = useDispatch();
  
     //handle google login
    const handleGoogleLogin = async () => {
  try {
    dispatch(setLoading(true));

    const data = await googleLogin();

    dispatch(setUser(data?.user || data));
    navigate("/dashboard");
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || error.message)
    );
  } finally {
    dispatch(setLoading(false));
  }
};
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

     //handle logout user
     const handleLogout = async() =>{
      try {
        dispatch(setLoading(true));
        await logOutUser();
        dispatch(setUser(null));
        navigate("/");
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
     }

    return {handleGoogleLogin, handleCurrentUser, handleLogout}
}