import { Router } from "express";
import { generateMiddleware } from "../middlewares/route.middleware.js";
import { asyncMiddleware } from "../middlewares/async.middleware.js";
import { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema, } from "../validation/auth.validation.js";
import { login, register, resetPassword, forgotPassword, } from "../controllers/auth.controller.js";
const authRoute = Router();
authRoute.post("/sign_in", generateMiddleware(loginSchema), asyncMiddleware(login));
authRoute.post("/sign_up", generateMiddleware(registerSchema), asyncMiddleware(register));
authRoute.post("/forgot_password", generateMiddleware(forgotPasswordSchema), asyncMiddleware(forgotPassword));
authRoute.post("/reset_password", generateMiddleware(resetPasswordSchema), asyncMiddleware(resetPassword));
export default authRoute;
//# sourceMappingURL=auth.route.js.map