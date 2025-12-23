import * as blogService from "../services/blog.service.js";
import logger from "../logger/logger.js";
import mongoose from "mongoose";
import { paginationParams } from "../utils/index.js";
import type { Request, Response } from "express";
import { ErrorWithStatus } from "../exception/errorWithStatus.exception.js";
import type { IdType } from "../types/index.js";

// create a blog post
export const createBlog = async (req: Request, res: Response) => {
  const blog = req.body;
  const userId = req.user?.id;
  const content = req.body.body;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const newBlog = await blogService.create(blog, content, userId);
    return res.status(201).json({
      message: "Blog successfully created",
      data: newBlog,
      success: true,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: (error as ErrorWithStatus).message,
      success: false,
      status: (error as ErrorWithStatus).status,
    }); // Internal Server Error
  }
};

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    logger.info("User", req.user);
    const { page, limit, query } = paginationParams(req);
    const { data, meta } = await blogService.getAllBlogs(page, limit, query);

    // data = _.pick(data, ["title", "description","author", "body"])
    // return res.status(200).json({ message: "Get all blogs", data, meta });

    res.status(200).json({
      message: "all blogs",
      title: "All blogs",
      blogs: data,
      meta,
      success: true,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: (error as ErrorWithStatus).message,
      success: false,
      status: (error as ErrorWithStatus).status,
    }); // Internal Server Error
  }
};

//  get all published blogs by all

export const getPublishedBlogs = async (req: Request, res: Response) => {
  try {
    const blogState = "published";
    const { page, limit, query } = paginationParams(req);
    const { data, meta } = await blogService.getBlogByState(
      page,
      limit,
      query,
      blogState
    );

    //  data = _.pick(data, ["title", "description","author", "body"])
    return res.status(200).json({
      message: "Get all published blogs",
      data,
      meta,
      success: true,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: (error as ErrorWithStatus).message,
      success: false,
      status: (error as ErrorWithStatus).status,
    }); // Internal Server Error
  }
};

// get all draft blogs
export const getDraftBlogs = async (req: Request, res: Response) => {
  try {
    const blogState = "draft";
    const { page, limit, query } = paginationParams(req);
    const { data, meta } = await blogService.getBlogByState(
      page,
      limit,
      query,
      blogState
    );

    //  data = _.pick(data, ["title", "description","author", "body"])
    return res.status(200).json({
      message: " all published blogs",
      data: data,
      meta,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: (error as ErrorWithStatus).message || "Internal Server Error",
      success: false,
      status: (error as ErrorWithStatus).status,
    }); // Internal Server Error
    // res.status(500).send(error.message)
  }
};

// get blogs by id
export const getPublishedBlogById = async (req: Request, res: Response) => {
  const blogId: IdType = req.params.id as unknown as IdType;

  if (!blogId) {
    return res.status(400).json({ message: "Blog id is required" });
  }
  const isValid = mongoose.Types.ObjectId.isValid(blogId);
  if (!isValid) {
    return res.status(400).json({ message: "Invalid id" });
  }

  try {
    const blog = await blogService.getBlogById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Increment the read_count of the blog
    // blog.read_count = blog.read_count ? blog.read_count + 1 : 1;
    // await blog.save();

    const authorName = blog.author;

    //  return res.status(200).json({ message: "  blog by id", author: authorName, blog });
    res.json({
      message: "blog by id",
      author: authorName,
      data: blog,
      success: true,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: (error as ErrorWithStatus).message || "Internal Server Error",
      success: false,
      status: (error as ErrorWithStatus).status,
    }); // Internal Server Error
  }
};

// get blogs owned by a user
export const getBlogsByOwnerId = async (req: Request, res: Response) => {
  const ownerId = req.user?.id as unknown as IdType;
  const isValid = mongoose.Types.ObjectId.isValid(ownerId);
  if (!isValid) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    const { page, limit, query } = paginationParams(req);
    const { data, meta } = await blogService.getOwnerBlogs(
      page,
      limit,
      query,
      ownerId
    );

    //  data = _.pick(data, ["title", "description","author", "body"])
    res.status(200).json({
      message: "Get all owner blogs",
      data: data,
      meta,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: (error as ErrorWithStatus).message || "Internal Server Error",
      success: false,
      status: (error as ErrorWithStatus).status,
    }); // Internal Server Error
  }
};

// publish a blog by authorized user
export const publishBlog = async (req: Request, res: Response) => {
  const blogId = req.params.id as unknown as IdType;
  const isValid = mongoose.Types.ObjectId.isValid(blogId);
  if (!isValid) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    const publishedBlog = await blogService.publishBlog(blogId);
    if (!publishedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({
      message: "Blog successfully published",
      data: publishedBlog,
      success: true,
    });
  } catch (error) {
    logger.error(error);
    res.status((error as ErrorWithStatus).status).json({
      message: (error as ErrorWithStatus).message || "Internal Server Error",
      success: false,
      status: (error as ErrorWithStatus).status,
    }); // Internal Server Error
  }
};

// update a blog
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id as unknown as IdType;
    if (!blogId) {
      return res.status(400).json({ message: "Blog id is required" });
    }
    const isValid = mongoose.Types.ObjectId.isValid(blogId);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid id" });
    }
    const blog = req.body;
    const updatedBlog = blogService.updateBlog(blogId, blog);
    return res.status(200).json({
      message: "Blog succesfully updated",
      data: updatedBlog,
      success: true,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: (error as ErrorWithStatus).message || "Internal Server Error",
      success: false,
      status: (error as ErrorWithStatus).status,
    }); // Internal Server Error
  }
};

// delete a blog
export const deleteBlog = async (req: Request, res: Response) => {
  const blogId = req.params.id as unknown as IdType;
  if (!blogId) {
    return res.status(400).json({ message: "Blog id is required" });
  }
  const isValid = mongoose.Types.ObjectId.isValid(blogId);
  if (!isValid) {
    return res.status(400).json({ message: "Invalid id" });
  }
  try {
    await blogService.deleteBlog(blogId);

    return res
      .status(200)
      .json({ message: "Blog successfully deleted", data: "", success: true });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: (error as ErrorWithStatus).message || "Internal Server Error",
      success: false,
      status: (error as ErrorWithStatus).status,
    }); // Internal Server Error
  }
};

// pages
