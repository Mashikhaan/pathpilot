import proxy from "express-http-proxy";



export const proxyWithHeaders = (serviceUrl) =>{
    return proxy (
        serviceUrl,
        {
            proxyReqOptDecorator: (proxyReqOpts,srcReq) =>{
                console.log("USER FROM SESSION:", srcReq.user);

                if(srcReq.user){
                    console.log("USER ID:", srcReq.user.userId);

                    proxyReqOpts.headers["x-user_id"] = srcReq.user.userId
                }
                return proxyReqOpts
            }
        }
    )
}