import { googleLogin }  from "../service/auth.api.js";
import { setUser } from "../state/auth.slice.js";
import { useDispatch } from "react-redux";




export const useAuth = () =>{
    const dispatch = useDispatch();

     //handle google login
     const handleGoogleLogin = async () => {
       const data = await googleLogin();
       dispatch(setUser(data));
     }

    return {handleGoogleLogin}
}