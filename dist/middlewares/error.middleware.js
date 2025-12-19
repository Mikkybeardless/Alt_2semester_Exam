import logger from "../logger/logger.js";
export const error = (err, _, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ message: err.message, success: false });
};
//# sourceMappingURL=error.middleware.js.map