import "express";
import type { Blog } from "../database/schema/blog.schema.js";

export {};
declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      email: string;
      role: "USER" | "ADMIN";
    };
    blog?: Blog;
  }
}
