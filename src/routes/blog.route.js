import { Router } from "express";
import * as blogController from "../controllers/blog.controller.js";
import { generateMiddleware } from "../middlewares/route.middleware.js";
import { authMiddleware} from "../middlewares/auth.middleware.js"
import { blogPostSchema } from "../validation/auth.validation.js";
import {checkOwnerMiddleware} from "../middlewares/owner.middleware.js"

const blogRoute = Router();

// General routes
blogRoute.get("/",blogController.getAllBlogs);
blogRoute.get("/published", blogController.getPublishedBlogs);
blogRoute.get("/read", blogController.getBlogById);

// protected routes
blogRoute.use(authMiddleware);
// blogRoute.get("me/all",checkOwnerMiddleware, blogController.getAllUserBlogs );
blogRoute.get("/state", blogController.getBlogsByState);

// create a blog post
blogRoute.post("/create", generateMiddleware(blogPostSchema), blogController.createBlog);

// restricted route to only owner
blogRoute.get("/me", blogController.getBlogsByOwnerId)
blogRoute.patch("/:id/publish", checkOwnerMiddleware, blogController.publishBlog);
blogRoute.put("/:id/update", checkOwnerMiddleware, blogController.updateBlog)
blogRoute.delete("/:id/delete",checkOwnerMiddleware, blogController.deleteBlog);



export default blogRoute;