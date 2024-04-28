import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRoute = Router();


userRoute.use(authMiddleware)
userRoute.get("/", adminMiddleware, userController.getAllUsers);


export default userRoute;