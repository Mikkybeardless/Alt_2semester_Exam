import * as userService from "../services/user.service.js";
import logger from "../logger/logger.js";
import { paginationParams } from "../utils/index.js";
export const getAllUsers = async (req, res) => {
    try {
        logger.info("blog", req.user);
        const { page, limit, query } = paginationParams(req, 10);
        const { data, meta } = await userService.getAllUsers(page, limit, query);
        const response = {
            success: true,
            data,
            meta,
        };
        res.json(response);
    }
    catch (error) {
        logger.error(error);
        res.status(500).json({
            message: error.message,
            success: false,
            status: error.status,
        }); // Internal Server Error
    }
};
//# sourceMappingURL=user.controller.js.map