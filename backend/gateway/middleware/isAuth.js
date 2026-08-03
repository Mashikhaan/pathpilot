import redis from "../../shared/redis/redis.js";

export const isAuth = async(req, res, next) =>{
  try {
    //get the session id from the cookie
      const sessionId = req.cookies?.session;

    if(!sessionId){
        return res.status(401).json({
            success: false,
            message: "Unauthorized Access"
        })
    }

    //get the session from redis
    const session = await redis.get(`session:${sessionId}`);

    if(!session){
        return res.status(401).json({
            success: false,
            message: "Session Expired"
        })
    }

    req.user = JSON.parse(session);

    next();

  } catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message
    })
  }

}