import express from "express";
import { generateRoadmapController, getAllRoadmapsController, getRoadmapByIdController } from "../controllers/roadmap.controller.js";

const roadmapRouter = express.Router();

//generate roadmap route
roadmapRouter.post("/generate", generateRoadmapController);

//get all roadmap route
roadmapRouter.get("/all",getAllRoadmapsController);

//get specific roadmap by id route
roadmapRouter.get("/:id",getRoadmapByIdController);



export default roadmapRouter;