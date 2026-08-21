import express from "express";
import { getInterviewController, startInterviewController, submitAnswerController } from "../controllers/interview.controller.js";

const interviewRouter = express.Router();

//interview start route
interviewRouter.post("/start", startInterviewController);

//interview answer route
interviewRouter.post("/answer", submitAnswerController);

//interview get route by params id
interviewRouter.get("/:id", getInterviewController);


export default interviewRouter;