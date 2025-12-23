import logger from "../logger/logger.js";
export const adminMiddleware = (req, res, next) => {
    logger.info("Admin Middleware");
    if (req?.user?.role != "ADMIN") {
        return res.status(403).json({ message: "Forbidden", success: false });
    }
    next();
};
//# sourceMappingURL=admin.middleware.js.map