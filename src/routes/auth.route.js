import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { generateMiddleware } from "../middlewares/route.middleware.js";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";
import { asyncMiddleware } from "../middlewares/async.middleware.js";

const authRoute = Router();
authRoute.get("/sign_in", asyncMiddleware(authController.signInPage));
authRoute.get("/sign_up", asyncMiddleware(authController.signUpPage));
authRoute.post(
  "/sign_in",
  generateMiddleware(loginSchema),
  asyncMiddleware(authController.login)
);
authRoute.post(
  "/sign_up",
  generateMiddleware(registerSchema),
  asyncMiddleware(authController.register)
);

export default authRoute;
