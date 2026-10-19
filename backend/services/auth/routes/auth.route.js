import express from "express";
import {
    creditCoinsFromPaymentController,
    googleAuthController,
    logOutController,
    useCoinsController
} from "../controllers/auth.controller.js";

const authRouter = express.Router();


//Login route

authRouter.post("/google",googleAuthController)


//LogOut route

authRouter.post("/logout", logOutController)


//user coins route
authRouter.post("/use-coins", useCoinsController)


//Internal route called by the billing service after payment verification.
authRouter.post("/internal/credit-coins", creditCoinsFromPaymentController)

export default authRouter