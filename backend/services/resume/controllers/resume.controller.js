//flow:-
//pdf -> pdf storage(temporary) -> extract text -> llm -> agent -> prompt -> data ->save in mongodb -> redis -> pdf delete in storage(temporary) -> resume data(score ,missing,recommendation ,etc.)

import extractText from "../config/pdf.js";
import resumeAgent from "../agents/resume.agent.js";
import resumeModel from "../models/resume.model.js";
import redis from "../../../shared/redis/redis.js";
import fs from "fs";



//Upload Resume Controller
export const uploadResumeController =async(req, res) => {

    let file
    try {

        //get file from body
         file = req.file;

        //check file exist
        if(!file){
            return res.status(400).json({
                success:false,
                message: "Resume PDF is required"
            })
        }

        //get user id from custom header
        const userId = req.headers["x-user_id"];
        //check user id exist
        if(!userId){
            return res.status(400).json({
                success:false,
                message: "User Id is required"
            })
        }

        //Resume text
        const resumeText = await extractText(file.path);

        //Ai Response by using llm agent
        const aiResponse = await resumeAgent(resumeText);

        //Resume Data from ai response
        const resumeData = JSON.parse(aiResponse);

        //if user resume already exist then update it
        let resume = await resumeModel.findOne({userId}); //use let because we want to update it

        if(resume){
            Object.assign(resume,{
                ...resumeData,
                extractedText:resumeText
            })
              //save in mongodb
            await resume.save();
        }else{
            resume = await resumeModel.create({
                userId,
                extractedText:resumeText,
                ...resumeData
            })
        }

        //save in redis for fast access
        await redis.set(`resume:${userId}`,JSON.stringify(resume));

        //delete pdf from storage(temporary)
        fs.unlinkSync(file.path)

        return res.status(200).json({
            success: true,
            message: "Resume Analyzed Successfully",
            data: resume
        })
     
    } catch (error) {
    console.log("UPLOAD RESUME ERROR:", error);

    if (file?.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
    }

    return res.status(500).json({
        success: false,
        message: error.message
    });
}
}


//Get Resume Controller
export const getResumeController = async(req, res) => {
    try{
        //get user id from custom header
        const userId = req.headers["x-user_id"];

        //get resume from redis
        const cache = await redis.get(`resume:${userId}`);

        if(cache){
            return res.status(200).json({
                success: true,
                source: "redis",
                data: JSON.parse(cache)
            })
        }

        //if not exist then get from mongodb
        const resume = await resumeModel.findOne({userId});
         
        if(!resume){
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            })
        }

        //save in redis for fast access
        await redis.set(`resume:${userId}`,JSON.stringify(resume));

        return res.status(200).json({
            success: true,
            source: "mongodb",
            data: resume
        })

    }catch(error){

        console.log(error)

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}