import {Blog } from "../database/schema/blog.schema.js"

export const checkOwnerMiddleware = async (req, res, next) => {
    const blogId = req.query.id;
    const authorId = req.user.id; // Assuming req.user.id contains the logged-in user's ID
    try {
      const blog = await Blog.findById(blogId);
      if (!blog || !blog.owner.equals(authorId) ) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.blog = blog;
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };