import {getAuth} from "firebase-admin/auth";
import {app} from "../configs/firebase.js";
import userModel from "../models/user.model.js";
import crypto from "crypto";
import redis from "../../../shared/redis/redis.js";

//GOOGLE Auth Controller
export const googleAuthController = async (req, res)=>{
    try{
        const {token} = req.body;
        const decoded = await getAuth(app).verifyIdToken(token);

        let user = await userModel.findOne({
            firebaseUid: decoded.uid
        })
        //if user not exist then signup/create-user
        if(!user){
            user = await userModel.create({
                firebaseUid: decoded.uid,
                name: decoded.name,
                email: decoded.email
            })
        }

        //generate a random session id
        const sessionId = crypto.randomUUID();

        //store the session id in redis with the user id as the value
        await redis.set(`session:${sessionId}`,JSON.stringify({
            userId: user._id,
            name: user.name,
            email: user.email,
            interviewCoin: user.interviewCoin
        }), "EX", 7 * 24 * 60 * 60) // 7 days

        //set the session id in the cookie
        res.cookie("session", sessionId,{
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days

        })

        return res.status(200).json({
            success: true,
            user
        })
    }catch(error){
       return res.status(500).json({"Google auth error": error})
    }
}

//LogOut Controller
export const logOutController = async(req,res)=>{
    try{
       const sessionId = req.cookies?.session;

       if(sessionId){
        await redis.del(`session:${sessionId}`)
       }

       res.clearCookie("session", {
        httpOnly: true,
        secure: false,
        sameSite: "strict"
       })
       
       return res.status(200).json({
        success: true,
        message: "LogOut Successfully"
       })
    }catch(error){
       return res.status(500).json({
        success: false,
        message: error.message
       })
    }
}


//Use Coins
export const useCoinsController = async(req,res)=>{
    try{
        //get the session id from the cookie
     const sessionId = req.cookies?.session;

     if(!sessionId){
        return res.status(401).json({
            success: false,
            message: "Unauthorized Access"
        })
     }
 
     //get the session from redis using the session id
     const session = await redis.get(`session:${sessionId}`);
     //parse the session from redis
     const sessionData = JSON.parse(session);

     const {coins, action} = req.body;

     if(!coins){
        return res.status(400).json({
            success: false,
            message: "Coins is required"
        })
     }

     //check the user exist, if exist then update the user coins
    const user = await userModel.findById(sessionData.userId);

    if(!user){
        return res.status(404).json({
            success: false,
            message: "user not found"
        })
    }

    //check if the user has enough coins
    if(user.interviewCoin < coins){
        return res.status(400).json({
            success: false,
            message: "Not enough coins",
            interviewCoin: user.interviewCoin
        })
    }

    //decrease coins according to the action
    user.interviewCoin -= coins;

    //save the user with updated coins
    await user.save();

    //set updated coins in redis for fast access
    await redis.set(`session:${sessionId}`,JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        interviewCoin: user.interviewCoin
    }), "EX", 7 * 24 * 60 * 60) // 7 days

    return res.status(200).json({
        success: true,
        message: "Coins used successfully",
        action,
        interviewCoin: user.interviewCoin
    })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}