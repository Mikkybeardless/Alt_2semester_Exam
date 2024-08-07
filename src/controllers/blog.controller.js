import * as blogService from "../services/blog.service.js";
import logger from "../../logger/logger.js";

// create a blog post
export const createBlog = async (req, res) => {
  const blog = req.body;
  const userId = req.user.id;
  const content = req.body.body;

  try {
    const newBlog = await blogService.create(blog, content, userId);
    return res.status(201).render("create", {
      message: "Blog successfully created",
      data: newBlog,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).send(error.message);
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    logger.info("User", req.user);
    let page = Number(req.query.page) || 1;
    page = page < 1 ? 1 : page;
    let limit = Number(req.query.limit) || 20;
    limit = limit < 1 ? 20 : limit;
    const query = req.query.q;
    const { data, meta } = await blogService.getAllBlogs(page, limit, query);

    // data = _.pick(data, ["title", "description","author", "body"])
    //return res.status(200).json({ message: "Get all blogs",  data, meta });

    res.status(200).render("all_blogs", {
      message: "Get all blogs",
      title: "All blogs",
      blogs: data,
      meta,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).send(error.message);
  }
};

//  get all published blogs by all

export const getPublishedBlogs = async (req, res) => {
  try {
    const blogState = "published";
    let page = Number(req.query.page) || 1;
    page = page < 1 ? 1 : page;
    let limit = Number(req.query.limit) || 20;
    limit = limit < 1 ? 20 : limit;
    const query = req.query.q;
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
    });
  } catch (error) {
    logger.error(error);
    res.status(500).send(error.message);
  }
};

// get all draft blogs
export const getDraftBlogs = async (req, res) => {
  try {
    const blogState = "draft";
    let page = Number(req.query.page) || 1;
    page = page < 1 ? 1 : page;
    let limit = Number(req.query.limit) || 20;
    limit = limit < 1 ? 20 : limit;
    const query = req.query.q;
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
    // res.status(500).send(error.message)
  }
};

// get blogs by id
export const getPublishedBlogById = async (req, res) => {
  const blogId = req.params.id;

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
    res.render("detail", { blog, title: "Blog Details" });
  } catch (error) {
    logger.error(error);
    res.status(500).send(error.message);
  }
};

// get blogs owned by a user
export const getBlogsByOwnerId = async (req, res) => {
  const ownerId = req.user.id;
  try {
    let page = Number(req.query.page) || 1;
    page = page < 1 ? 1 : page;
    let limit = Number(req.query.limit) || 20;
    limit = limit < 1 ? 20 : limit;
    const query = req.query.q;
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
    res.status(500).send(error.message);
  }
};

// publish a blog by authorized user
export const publishBlog = async (req, res) => {
  const blogId = req.params.id;
  try {
    const publishedBlog = await blogService.publishBlog(blogId);
    if (!publishedBlog) {
      throw new ErrorWithStatus("No blog with this id to publish", 404);
    }
    return res
      .status(200)
      .json({ message: "Blog successfully published", data: publishedBlog });
  } catch (error) {
    logger.log(error);
    res.status(500).send(error.message);
  }
};

// update a blog
export const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = req.body;
    const updatedBlog = blogService.updateBlog(blogId, blog);
    return res
      .status(200)
      .json({ message: "Blog succesfully updated", data: updatedBlog });
  } catch (error) {
    logger.error(error);
    res.status(500).send(error.message);
  }
};

// delete a blog
export const deleteBlog = async (req, res) => {
  const blogId = req.params.id;
  try {
    await blogService.deleteBlog(blogId);
    return res
      .status(200)
      .json({ message: "Blog successfully deleted", data: "" });
  } catch (error) {
    logger.error(error);
    res.status(500).send(error.message);
  }
};

// pages

export const createBlogPage = (req, res) => {
  res.render("create");
};

// export const profilePage = (req,res)=>{
//   res.render("profile")
// }
