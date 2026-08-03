import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../../utils/firebase.js"
import axios from "axios";

//create axios instance
const AuthApiInstance = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true
});

//google login
export const googleLogin = async () => {
    try {
        const result = await signInWithPopup(auth,provider);
        console.log("User Data:", result.user);

        const token = await result.user.getIdToken();

        const response = await AuthApiInstance.post(
            "/api/auth/google",
            {
                token
            }
        );

        return response.data;

    } catch(error) {
        console.log("Firebase login error:", error);
        throw error;
    }
};

//current user
export const getCurrentUser = async () => {
    try {
        const response = await AuthApiInstance.get("/api/get-me")
        console.log("Current User:", response.data);
        return response.data
    } catch (error) {
        console.log("Error getting current user:", error);
        throw error;
    }
}