import express from "express";
import { getAllInterviewsController, getInterviewController, startInterviewController, submitAnswerController } from "../controllers/interview.controller.js";

const interviewRouter = express.Router();

//interview start route
interviewRouter.post("/start", startInterviewController);

//interview submit answer route
interviewRouter.post("/answer", submitAnswerController);

//interview get route by params id
interviewRouter.get("/:id", getInterviewController);

//get all interviews
interviewRouter.get("/", getAllInterviewsController);

export default interviewRouter;