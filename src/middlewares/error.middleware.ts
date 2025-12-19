import type { NextFunction, Request, Response } from "express";
import logger from "../logger/logger.js";

export const error = (
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.stack);
  res.status(500).json({ message: err.message, success: false });
};
