import express from "express";
import { addCoinsController, googleAuthController, logOutController, useCoinsController } from "../controllers/auth.controller.js";

const authRouter = express.Router();


//Login route

authRouter.post("/google",googleAuthController)


//LogOut route

authRouter.post("/logout", logOutController)


//user coins route
authRouter.post("/use-coins", useCoinsController)


//add coins route
authRouter.post("/add-coins", addCoinsController)

export default authRouter