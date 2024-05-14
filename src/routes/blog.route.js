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
blogRoute.get("/:id", blogController.getPublishedBlogById);



// protected routes
blogRoute.use(authMiddleware);

// create a blog post
blogRoute.get("/create",blogController.createBlogPage);
// blogRoute.get("me/all",checkOwnerMiddleware, blogController.getAllUserBlogs );
blogRoute.get("/draft", blogController.getDraftBlogs);


blogRoute.post("/create", generateMiddleware(blogPostSchema), blogController.createBlog);

// uses owner id from jwt to get blogs of owner

blogRoute.get("/me", blogController.getBlogsByOwnerId)
// restricted route to only owner

blogRoute.use(checkOwnerMiddleware)
blogRoute.patch("/:id",  blogController.publishBlog);
blogRoute.put("/:id",  blogController.updateBlog)
blogRoute.delete("/:id", blogController.deleteBlog);



export default blogRoute;