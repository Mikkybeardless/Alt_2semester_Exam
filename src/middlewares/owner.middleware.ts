import { Blog } from "../database/schema/blog.schema.js";
import logger from "../logger/logger.js";
import type { NextFunction, Request, Response } from "express";

export const checkOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info("Owner Middleware");
  const blogId = req.params.id;
  const ownerId = req.user?.id; // Assuming req.user.id contains the logged-in user's ID
  try {
    const blog = await Blog.findById(blogId);
    if (!blog || !blog.owner.equals(ownerId)) {
      return res.status(403).json({ message: "Forbidden", success: false });
    }
    req.blog = blog;
    next();
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: (err as Error).message, success: false });
  }
};
