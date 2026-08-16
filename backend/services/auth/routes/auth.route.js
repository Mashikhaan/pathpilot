import express from "express";
import { googleAuthController, logOutController, useCoinsController } from "../controllers/auth.controller.js";

const authRouter = express.Router();


//Login route

authRouter.post("/google",googleAuthController)


//LogOut route

authRouter.post("/logout", logOutController)


//user coins route
authRouter.post("/user-coins", useCoinsController)

export default authRouter