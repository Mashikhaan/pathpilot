import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pathpilot-f5a27.firebaseapp.com",
  projectId: "pathpilot-f5a27",
  storageBucket: "pathpilot-f5a27.firebasestorage.app",
  messagingSenderId: "940474954845",
  appId: "1:940474954845:web:076fb584f594f13135c9b4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth instance
const auth = getAuth(app);

//Google Auth Provider
const provider = new GoogleAuthProvider();

export { auth, provider };