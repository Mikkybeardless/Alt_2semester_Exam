import { Blog } from "../database/schema/blog.schema.js";
import logger from "../../logger/logger.js";
import { ErrorWithStatus } from "../exception/errorWithStatus.exception.js";

export const create = async (blog, content, userId) => {
  try {
    const words = content.split(" ").length;
    // Assuming average reading speed of 100 words per minute
    const readingTime = Math.ceil(words / 200);
    blog.owner = userId;
    blog.reading_time = readingTime;

    const newBlog = await Blog.create(blog);
    return newBlog;
  } catch (error) {
    logger.error(error);
    throw new ErrorWithStatus(error.message, 500);
  }
};

export const getAllBlogs = async (page, limit, query) => {
  try {
    const skip = (page - 1) * limit;
    const filter = query
      ? {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { author: { $regex: query, $options: "i" } },
            { tag: { $regex: query, $options: "i" } },
          ],
        }
      : {};
    const blogs = await Blog.find(
      {
        $and: [
          { state: { $ne: "draft" } }, // Filter out draft
          filter, // Applying the filter conditionally
        ],
      },
      {
        password: 0,
      }
    )
      .skip(skip)
      .limit(limit);
    const total = await Blog.countDocuments(filter);

    return { data: blogs, meta: { page, limit, total } };
  } catch (error) {
    logger.error(error);
    throw new ErrorWithStatus(error.message, 500);
  }
};

export const getBlogByState = async (
  page = 1,
  limit = 20,
  query = null,
  blogState
) => {
  try {
    const skip = (page - 1) * limit;
    const filter = query
      ? {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { tag: { $regex: query, $options: "i" } },
          ],
        }
      : {};

    const blogs = await Blog.find({
      $and: [
        { state: blogState }, // Filter by state
        filter, // Applying the filter conditionally
      ],
    })
      .skip(skip)
      .limit(limit);
    const total = await Blog.countDocuments(filter);
    return { data: blogs, meta: { page, limit, total } };
  } catch (error) {
    logger.error(error);
    throw new ErrorWithStatus(error.message, 500);
  }
};

export const getBlogById = async (blogId) => {
  try {
    const blog = await Blog.findById(blogId);
    await blog.read();
    return blog;
  } catch (error) {
    logger.error(error);
    throw new ErrorWithStatus(error.message, 500);
  }
};

export const getOwnerBlogs = async (
  page = 1,
  limit = 20,
  query = null,
  ownerId
) => {
  try {
    const skip = (page - 1) * limit;
    const filter = query
      ? {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { tag: { $regex: query, $options: "i" } },
          ],
        }
      : {};

    const blogs = await Blog.find({
      $and: [
        { owner: ownerId }, // Filter by state
        filter, // Applying the filter conditionally
      ],
    })
      .skip(skip)
      .limit(limit);
    const total = await Blog.countDocuments(filter);
    return { data: blogs, meta: { page, limit, total } };
  } catch (error) {
    logger.error(error);
    throw new ErrorWithStatus(error.message, 500);
  }
};

export const publishBlog = async (blogId) => {
  try {
    const publishedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { state: "published" },
      { new: true }
    );
    return publishedBlog;
  } catch (error) {
    logger.error(error);
    throw new ErrorWithStatus(error.message, 500);
  }
};

export const updateBlog = async (blogId, blog) => {
  try {
    const updatedBlog = await Blog.findOneAndUpdate(blogId, blog, {
      new: true,
    });
    return updatedBlog;
  } catch (error) {
    logger.error(error);
    throw new ErrorWithStatus(error.message, 500);
  }
};

export const deleteBlog = async (blogId) => {
  try {
    const deleteBlog = await Blog.findByIdAndDelete(blogId);
    return deleteBlog;
  } catch (error) {
    logger.error(error);
    throw new ErrorWithStatus(error.message, 500);
  }
};
