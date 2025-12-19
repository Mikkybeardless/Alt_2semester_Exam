import jwt from "jsonwebtoken";
import logger from "../logger/logger.js";
import type { NextFunction, Request, Response } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get token header
  logger.info("authentication Middleware");
  const token = req.cookies["authToken"]; // req.headers.token;

  if (!token) {
    return res.redirect("/auth/sign_in");
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  jwt.verify(token, process.env.JWT_SECRET || "", (err: any, decoded: any) => {
    if (err) {
      //return res.status(401).json({ message: "Unauthorized" });
      return res.redirect("/auth/sign_in");
    }

    //logger.info("Decoded", decoded);
    req.user = decoded as { id: string; email: string; role: "USER" | "ADMIN" };
    next();
  });
};
