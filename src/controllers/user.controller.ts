import * as userService from "../services/user.service.js";
import logger from "../logger/logger.js";
import { paginationParams } from "../utils/index.js";
import type { Request, Response } from "express";
import type { ErrorWithStatus } from "../exception/errorWithStatus.exception.js";

export const getAllUsers = async (req: Request, res: Response) => {
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
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: (error as ErrorWithStatus).message,
      success: false,
      status: (error as ErrorWithStatus).status,
    }); // Internal Server Error
  }
};
