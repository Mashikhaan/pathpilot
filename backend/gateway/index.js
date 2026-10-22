import express from "express";
import morgan from "morgan";
import proxy from "express-http-proxy";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import { isAuth } from "./middleware/isAuth.js";
import { getCurrentUser } from "./controllers/user.controller.js";
import { proxyWithHeaders } from "./utils/proxyWithHeaders.js";
import axios from "axios";

const PORT = process.env.PORT || 6000;


const app = express();
app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL, "https://pathpilot-jet.vercel.app"],
    credentials: true
}));

app.use(cookieParser());

// Health check with wake-up ping for microservices
app.get("/", async (req, res) => {
    // Background me sari microservices ko non-blocking tareeqe se ping karein
    const serviceUrls = [
        process.env.AUTH_SERVICE_URL,
        process.env.RESUME_SERVICE_URL,
        process.env.INTERVIEW_SERVICE_URL,
        process.env.ROADMAP_SERVICE_URL,
        process.env.BILLING_SERVICE_URL
    ].filter(Boolean); // Null/undefined remove karne ke liye

    // Promise.allSettled ka use karein taaki agar ek service slow/down ho toh baki fail na ho
    Promise.allSettled(
        serviceUrls.map(url => axios.get(url).catch(() => null))
    );

    res.send("Gateway and microservices wake-up triggered successfully");
});

//middlewares
app.use(morgan("dev"));

//proxy routes
app.use("/api/auth", proxy(process.env.AUTH_SERVICE_URL));
       //proxy with headers
app.use("/api/resume",isAuth, proxyWithHeaders(process.env.RESUME_SERVICE_URL));
app.use("/api/interview" , isAuth, proxyWithHeaders(process.env.INTERVIEW_SERVICE_URL));
app.use("/api/roadmap", isAuth, proxyWithHeaders(process.env.ROADMAP_SERVICE_URL));
app.use("/api/billing",isAuth, proxyWithHeaders(process.env.BILLING_SERVICE_URL, {forwardSession: true}));

//current user
app.get("/api/get-me", isAuth,getCurrentUser);


app.listen(PORT, ()=>{
    console.log(`Gateway is running on port ${PORT}`);
})