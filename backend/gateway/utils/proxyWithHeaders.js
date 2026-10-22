import proxy from "express-http-proxy";



export const proxyWithHeaders = (serviceUrl, {forwardSession = false} = {}) =>{
    return proxy (
        serviceUrl,
        {
            proxyReqOptDecorator: (proxyReqOpts,srcReq) =>{

                if(srcReq.user){
                    proxyReqOpts.headers["x-user_id"] = srcReq.user.userId
                    if (forwardSession) {
                        proxyReqOpts.headers["x-session-id"] = srcReq.cookies?.session
                    }
                }
                return proxyReqOpts
            }
        }
    )
}