import jwt from "jsonwebtoken";
import logger from "../logger/logger.js";
export const authMiddleware = (req, res, next) => {
    // get token header
    logger.info("authentication Middleware");
    const token = req.cookies["authToken"]; // req.headers.token;
    if (!token) {
        return res.redirect("/auth/sign_in");
    }
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    jwt.verify(token, process.env.JWT_SECRET || "", (err, decoded) => {
        if (err) {
            //return res.status(401).json({ message: "Unauthorized" });
            return res.redirect("/auth/sign_in");
        }
        //logger.info("Decoded", decoded);
        req.user = decoded;
        next();
    });
};
//# sourceMappingURL=auth.middleware.js.map