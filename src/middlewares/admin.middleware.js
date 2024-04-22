export const adminMiddleware = (req,res,next) => {
    console.log("Admin Middleware")
   
    if(req?.user?.role != "ADMIN"){
       return res.status(403).json({message: "Forbidden"});
    }
   
    next()
   }