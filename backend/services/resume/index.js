import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from "./config/db.js";
import resumeRouter from "./routes/resume.route.js";



const app = express();

const PORT = process.env.PORT || 6002

app.use(express.json());
app.use("/", resumeRouter);


app.get("/", (req, res)=>{
    res.send("hello from resume service");
})

app.listen(PORT, () =>{
    console.log(`Resume service is running on port ${PORT}`);
    connectDB();
})