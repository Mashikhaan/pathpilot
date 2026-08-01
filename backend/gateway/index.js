import express from "express";
import morgan from "morgan";
import proxy from "express-http-proxy";
import dotenv from "dotenv";
dotenv.config();


const PORT = process.env.PORT || 6000;


const app = express();

//health check
app.get("/", (req, res)=>{
    res.send("Gateway is running");
})

//middlewares
app.use(morgan("dev"));

//proxy routes
app.use("/api/auth", proxy(process.env.AUTH_SERVICE_URL));



app.listen(PORT, ()=>{
    console.log(`Gateway is running on port ${PORT}`);
})