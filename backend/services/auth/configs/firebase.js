import {cert, initializeApp} from "firebase-admin/app";
import serviceAccountKey from "../serviceAccountKey.json" with { type: "json" };

// Initialize Firebase Admin SDK
export const app = initializeApp({
    credential: cert(serviceAccountKey)
})