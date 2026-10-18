import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import billingRouter from "./routes/billing.route.js";

const app = express();

const PORT = process.env.PORT || 6005;


app.use(express.json());

app.use("/", billingRouter);

//health check
app.get("/", (req,res) => {
    res.send("server is running  from billing")
})


app.listen(PORT,() => {
    console.log(`Billing service is running on port number ${PORT}`);
    connectDB();
})