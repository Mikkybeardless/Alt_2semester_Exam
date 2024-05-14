import { Router } from "express";
import logger from "../../config/logger.js";
import * as authController from "../controllers/auth.controller.js";
import  {generateMiddleware}  from "../middlewares/route.middleware.js";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";

const authRoute = Router();
authRoute.get("/sign_in", authController.signInPage)
authRoute.get("/sign_up", authController.signUpPage)
authRoute.post("/sign_in", generateMiddleware(loginSchema), authController.login);
authRoute.post("/sign_up",generateMiddleware(registerSchema),authController.register);

authRoute.use((err,req,res,next)=>{
    logger.error(err)
    res.status(err.status || 500).json({message: err.message});
})

export default authRoute;