import {cert, initializeApp} from "firebase-admin/app";
import {serviceAccount} from "../serviceAccountKey.json";

// Initialize Firebase Admin SDK
export const app = initializeApp({
    credential: cert(serviceAccount)
})