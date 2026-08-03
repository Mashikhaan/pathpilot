import express from "express";
import morgan from "morgan";
import proxy from "express-http-proxy";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import { isAuth } from "./middleware/isAuth.js";
import { getCurrentUser } from "./controllers/user.controller.js";

const PORT = process.env.PORT || 6000;


const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());

//health check
app.get("/", (req, res)=>{
    res.send("Gateway is running");
})

//middlewares
app.use(morgan("dev"));

//proxy routes
app.use("/api/auth", proxy(process.env.AUTH_SERVICE_URL));

//current user
app.get("/api/get-me", isAuth,getCurrentUser);


app.listen(PORT, ()=>{
    console.log(`Gateway is running on port ${PORT}`);
})