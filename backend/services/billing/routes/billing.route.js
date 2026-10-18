import express from "express";
import {createOrderController, verifyPaymentController} from "../controllers/billing.controller.js";

const billingRouter = express.Router();

//create order billing route
billingRouter.post("create-order", createOrderController);

//verify payment billing route
billingRouter.post("verify-payment", verifyPaymentController);

export default billingRouter