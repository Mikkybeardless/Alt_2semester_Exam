import { Blog } from "../database/schema/blog.schema.js";
import { ErrorWithStatus } from "../exception/errorWithStatus.exception.js";

// const User = require("../database/schema/user.schema.js")

// get all blogs from api(only admin can do this)
export const getAllBlogs = async () => {
  try {
    const skip = (page - 1) * limit;
    const filter = query
      ? {
          or$: [
            { title: { $regex: query, $options: "i" } },
            { author: { $regex: query, $options: "i" } },
            { tag: { $regex: query, $options: "i" } },
          ],
        }
      : {};
    const blogs = await Blog.find(filter, {
      password: 0,
    })
      .skip(skip)
      .limit(limit);
    const total = await Blog.countDocuments(filter);
    return { data: blogs, meta: { page, limit, total } };
  } catch (error) {
    console.log(error);
    throw new ErrorWithStatus(error.message, 500);
  }
};

// get blogs owned by a user
export const getAllUserBlogs = async (page = 1, limit = 20, query = null, userId) => {
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
        { id: userId }, // Filter by user ID
        filter, // Apply the filter conditionally
      ],
    })
      .skip(skip)
      .limit(limit);
    const total = await Blog.countDocuments(filter);
    return { data: blogs, meta: { page, limit, total } };
  } catch (error) {
    console.log(error);
    throw new ErrorWithStatus(error.message, 500);
  }
};


export const getPublishedBlogs = async (page = 1, limit = 20, query = null, blogState)=>{
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
    console.log(error);
    throw new ErrorWithStatus(error.message, 500);
  }
}



export const getOwnerBlogs = async (page = 1, limit = 20, query = null, ownerId)=>{
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
    console.log(error);
    throw new ErrorWithStatus(error.message, 500);
  }
}
