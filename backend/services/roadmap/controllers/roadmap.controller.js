
import graph from "../graph/roadmap.graph.js";
import roadmapModel from "../models/roadmap.model.js";
import redis from "../../../shared/redis/redis.js";

//generate roadmap controller create
export const generateRoadmapController = async (req, res) => {

    try{
        const { role, targetPackage, useResume = false, resume} = req.body;

        //get user from header
        const userId = req.headers["x-user-id"];

        //validation for role and targetPackage
        if(!role || !targetPackage){
            return res.status(400).json({error: "Role and targetPackage are required"});
        }
       
        //validation for resume and useResume
        if(useResume && !resume){
            return res.status(400).json({error: "Resume is required when useResume is true"});
        }

        //graph invoke
        const result = await graph.invoke({
            role,
            targetPackage,
            useResume,
            resume,
        })

        //save in database
        const roadmap = await roadmapModel.create({
            userId,
            ...result.roadmap,
        })

        //set cache for 1 hour of the newly generated roadmap
        await redis.set(`roadmap:${roadmap._id}`, JSON.stringify(roadmap),"EX", 60 * 60);

         // Delete history cache because new roadmap is generated, so old history is not needed anymore
        await redis.del(`userRoadmaps:${userId}`);

        return res.status(200).json({
            success: true,
            message: "Roadmap generated successfully",
            data: roadmap,
        })
    }
    catch(error){
        console.error("Error generating roadmap:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
} 





//get all roadmaps controller create
export const getAllRoadmapsController = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        
        //cache 
        const cache = await redis.get(`userRoadmaps:${userId}`);

        if(cache){
            return res.status(200).json({
                success: true,
                data: JSON.parse(cache),
            })
        }

        //find all roadmaps for the user and sort by createdAt 
        const roadmaps = await roadmapModel.find({ userId }).sort({ createdAt: -1 });

        //set cache for 1 hour
        await redis.set(`userRoadmaps:${userId}`, JSON.stringify(roadmaps),"EX", 60 * 60);

        return res.status(200).json({
            success: true,
            message: "All Roadmaps fetched successfully",
            data: roadmaps,
        });

    } catch (error) {
        console.error("Error fetching roadmaps:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
}



//get roadmap by id controller create
export const getRoadmapByIdController = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.headers["x-user-id"];

      //get roadmap from cache
      const cache = await redis.get(`roadmap:${id}`);

      if(cache){
        return res.status(200).json({
            success: true,
            fromCache: true,
            data: JSON.parse(cache),
        })
      }
       
      //get roadmap from database
      const roadmap = await roadmapModel.findOne({
        _id: id,
        userId
      })

      if(!roadmap){
        return res.status(404).json({
            success: false,
            message: "Roadmap not found",
        });
      }

      //set cache for 1 hour
      await redis.set(`roadmap:${id}`, JSON.stringify(roadmap),"EX", 60 * 60);

      return res.status(200).json({
        success: true,
        fromCache: false,
        message: "roadmap fetched successfully",
        data: roadmap
      })
    }catch(error){
        console.error("Error fetching roadmap by id:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
}