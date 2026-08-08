//flow:-
//pdf -> pdf storage(temporary) -> extract text -> llm -> agent -> prompt -> data ->save in mongodb -> redis -> pdf delete in storage(temporary) -> resume data(score ,missing,recommendation ,etc.)

import extractText from "../config/pdf.js";
import resumeAgent from "../agents/resume.agent.js";
import resumeModel from "../models/resume.model.js";
import redis from "../../../shared/redis/redis.js";
import fs from "fs";



//Upload Resume Controller
export const uploadResumeController =async(req, res) => {
    try {

        //get file from body
        const file = req.file;

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
        fs.unlink(file.path)

        return res.status(200).json({
            success: true,
            message: "Resume Analyzed Successfully",
            data: resume
        })
     
    } catch (error) {
        console.log(error);
        if(file){
            //delete pdf from storage(temporary) otherwise it will remain in storage
             fs.unlink(file.path)
        }

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}