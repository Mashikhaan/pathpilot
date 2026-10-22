import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../../utils/firebase.js"
import axios from "axios";

//create axios instance
const AuthApiInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
});

//google login
export const googleLogin = async () => {
    try {
        const result = await signInWithPopup(auth,provider);
        
        const token = await result.user.getIdToken();

        const response = await AuthApiInstance.post(
            "/api/auth/google",
            {
                token
            }
        );

        return response.data;

    } catch(error) {
        throw error;
    }
};

//current user
export const getCurrentUser = async () => {
    try {
        const response = await AuthApiInstance.get("/api/get-me")

        return response.data
    } catch (error) {
        throw error;
    }
}

//logout user
export const logOutUser = async () => {
  try {
    await AuthApiInstance.post("/api/auth/logout");
  } catch (error) {
    throw error;
  }
};


//use coin
export const useCoin = async (coins, action) => {
    try{
        const response = await AuthApiInstance.post("/api/auth/use-coins",{coins, action});
        return response.data
    }catch(error){
        throw error
    }
}