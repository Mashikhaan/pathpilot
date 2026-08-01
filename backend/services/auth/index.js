import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./configs/db.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";


const PORT = process.env.PORT || 6001;

const app = express();

app.get("/", (req, res)=>{
    res.send("Auth service is running");
})

//middlewares
app.use(express.json())
app.use(morgan("dev"));
app.use(cookieParser())


//pre route
app.use("/", authRouter)

app.listen(PORT, ()=>{
    console.log(`Auth service is running on port ${PORT}`),
    connectDB();
})