import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectToDb from "./config/db.js";
import roadmapRouter from "./routes/roadmap.route.js";

const app = express();

const PORT = process.env.PORT || 6004;

app.use(express.json());

app.use("/",roadmapRouter)


app.listen(PORT,  () => {
  console.log(`SERVER LISTENING ON ${PORT}`);
  connectToDb();
});
