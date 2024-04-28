import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import  {generateMiddleware}  from "../middlewares/route.middleware.js";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";

const authRoute = Router();
authRoute.get("/sign_in", authController.signInPage)
authRoute.get("/sign_up", authController.signUpPage)
authRoute.post("/sign_in", generateMiddleware(loginSchema), authController.login);
authRoute.post("/sign_up",generateMiddleware(registerSchema),authController.register);

export default authRoute;