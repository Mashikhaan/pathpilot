import express from "express";
import { googleAuthController, logOutController } from "../controllers/auth.conroller";

const authRouter = express.Router();


//Login route

authRouter.post("/login",googleAuthController)


//LogOut route

authRouter.post("/logout", logOutController)


export default authRouter