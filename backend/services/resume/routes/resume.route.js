import express from "express";
import upload from "../middleware/multer.js";
import { getResumeController, uploadResumeController } from "../controllers/resume.controller.js";


const resumeRouter = express.Router();


//upload resume route
resumeRouter.post("/upload",upload.single("resume"), uploadResumeController);

//get resume route
resumeRouter.get("/get-resume", getResumeController );


export default resumeRouter;