import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectToDb from "./config/db.js";

const app = express();

const PORT = process.env.PORT || 6004;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("roadmap service is successfully running.");
});



app.listen(PORT,  () => {
  console.log(`SERVER LISTENING ON ${PORT}`);
  connectToDb();
});
