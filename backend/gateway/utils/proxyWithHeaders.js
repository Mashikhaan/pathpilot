import proxy from "express-http-proxy";



export const proxyWithHeaders = (serviceUrl) =>{
    return proxy (
        serviceUrl,
        {
            proxyReqOptDecorator: (proxyReqOpts,srcReq) =>{
                if(srcReq.user){
                    proxyReqOpts.headers["x-user_id"] = srcReq.user.id
                }
                return proxyReqOpts
            }
        }
    )
}