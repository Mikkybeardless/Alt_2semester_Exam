import { Router } from "express";
import * as blogController from "../controllers/blog.controller.js";
import { generateMiddleware } from "../middlewares/route.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { blogPostSchema } from "../validation/blog.validation.js";
import { checkOwnerMiddleware } from "../middlewares/owner.middleware.js";
const blogRoute = Router();
// General routes
blogRoute.get("/", blogController.getAllBlogs);
blogRoute.get("/published", blogController.getPublishedBlogs);
blogRoute.get("/draft", authMiddleware, blogController.getDraftBlogs);
blogRoute.get("/me", blogController.getBlogsByOwnerId);
blogRoute.get("/:id", blogController.getPublishedBlogById);
// create a blog post
//blogRoute.get("me/all",checkOwnerMiddleware, blogController.getAllUserBlogs );
blogRoute.use(authMiddleware);
blogRoute.post("/create", generateMiddleware(blogPostSchema), blogController.createBlog);
// uses owner id from jwt to get blogs of owner
// restricted route to only owner
blogRoute.use(checkOwnerMiddleware);
blogRoute.patch("/:id", blogController.publishBlog);
blogRoute.put("/:id", blogController.updateBlog);
blogRoute.delete("/:id", blogController.deleteBlog);
export default blogRoute;
//# sourceMappingURL=blog.route.js.map