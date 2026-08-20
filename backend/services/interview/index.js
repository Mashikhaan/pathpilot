import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();
import interviewRouter from "./routes/interview.route.js";


const PORT = process.env.PORT || 6003;

const app = express();

//middleware
app.use(express.json());

//pre route
app.use("/", interviewRouter);

app.get("/", (req, res) => {
    res.send("Interview service is running");
})


app.listen(PORT, () => {
    console.log(`Interview service is running on port ${PORT}`)
    connectDB();
})