import { ErrorWithStatus } from "../exception/errorWithStatus.exception.js";
import * as blogService from "../services/blog.service.js";
import _ from "lodash"
import { Blog } from "../database/schema/blog.schema.js";


// get all blogs from api(only admin can do this not really necesaay for this project)
export const getAllBlogs = async (req, res) => {
  try {
    console.log("User", req.user);
    let page = Number(req.query.page) || 1;
    page = page < 1 ? 1 : page;
    let limit = Number(req.query.limit) || 20;
    limit = limit < 1 ? 20 : limit;
    const query = req.query.q;
    const { data, meta } = await blogService.getAllBlogs(page, limit, query);

    // data = _.pick(data, ["title", "description","author", "body"])
    res.status(200).json({ message: "Get all blogs", data, meta });
  } catch (error) {
    throw new ErrorWithStatus(error.message, 500)
  }
};

// get blogs owned by a user
export const getAllUserBlogs = async(req,res) =>{
  try {
    const userId = req.user.id; // user id from jwt
console.log(userId)
    let page = Number(req.query.page) || 1;
    page = page < 1 ? 1 : page;
    let limit = Number(req.query.limit) || 20;
    limit = limit < 1 ? 20 : limit;
    const query = req.query.q;
    const { data, meta } = await blogService.getAllUserBlogs(page, limit, query, userId);

    // data = _.pick(data, ["title", "description","author", "body"])
    res.status(200).json({ message: "Get all user blogs", data, meta });
  } catch (error) {
    throw new ErrorWithStatus(error.message, 500)
  }
}

//  get all published blogs by all
export const getPublishedBlogs = async (req,res)=>{
  try {
    const blogState = "published";
    let page = Number(req.query.page) || 1;
    page = page < 1 ? 1 : page;
    let limit = Number(req.query.limit) || 20;
    limit = limit < 1 ? 20 : limit;
    const query = req.query.q;
   const {data, meta} = await blogService.getPublishedBlogs(page, limit, query, blogState);

  //  data = _.pick(data, ["title", "description","author", "body"])
  res.status(200).json({
   message:"Get all published blogs",
   data: data, meta
  })
  } catch (error) {
   
  }
}

// get all blogs by state
export const getBlogsByState = async (req,res)=>{
try {
  let state = req.query.state
const blogs = await Blog.find({state: state})
// blogs = _.pick(blogs, ["title", "description","author", "body"])
res.status(200).json({
message:"Get blogs by state blogs",
data: blogs
})
} catch (error) {
  console.log(error);
  throw new ErrorWithStatus(error.message, 500)
}
}



export const getBlogById = async (req, res) => {
  const blogState = "published";
  try {
    const blog = await Blog.findOne({state: blogState });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
  
    // Increment the read_count of the blog
    blog.read_count = blog.read_count ? blog.read_count + 1 : 1;
    await blog.save();
  
    const authorName = blog.author;
  
    res.status(200).json({ message: "Get a blog by id", author: authorName, blog });
  } catch (error) {
    throw new ErrorWithStatus(error.message, 500)
  }
  
}

export const getBlogsByOwnerId = async (req,res) =>{
  const ownerId = req.user.id
  try {
    
    let page = Number(req.query.page) || 1;
    page = page < 1 ? 1 : page;
    let limit = Number(req.query.limit) || 20;
    limit = limit < 1 ? 20 : limit;
    const query = req.query.q;
   const {data, meta} = await blogService.getOwnerBlogs(page, limit, query, ownerId);

  //  data = _.pick(data, ["title", "description","author", "body"])
  res.status(200).json({
   message:"Get all owner blogs",
   data: data, meta
  })
  } catch (error) {
    console.log(error);
        throw new ErrorWithStatus(error.message, 500)
  }
}

// create a blog post
export const createBlog = async (req, res) => {
       const blog = req.body
       const userId = req.user.id
         blog.owner = userId
       try {
        const newBlog = await Blog.create(blog);
        res.status(201).json({message: "Blog successfully created", data: newBlog})
       } catch (error) {
        console.log(error);
        throw new ErrorWithStatus(error.message, 500);
       } 
}  

 
// publish a blog by authorized user
export const publishBlog = async (req, res) => {
  const blogId = req.params.id
  try {
   const publishedBlog = await Blog.findByIdAndUpdate(blogId, {state: "published"}, {new: true});
   if (!publishedBlog) {
    throw new ErrorWithStatus("No blog with this Id", 500)
   }
   res.status(200).json({message: "Blog successfully published", data: publishedBlog})
  } catch (error) {
   console.log(error);
   throw new ErrorWithStatus(error.message, 500);
  } 
} 


export const updateBlog = async (req,res) => {
  try {
    const blogId = req.params.id
    const blog = req.body
    const updatedBlog = Blog.findOneAndUpdate(blogId, blog, {new: true})
     res.status(200).json({message: "Blog succesfully updated", data: updatedBlog})
  } catch (error) {
    
  }
}


// delete a blog
export const deleteBlog = async (req, res) => {
  const id = req.params.id
try {
await Blog.findByIdAndDelete(id);
res.status(200).json({message: "Blog successfully deleted", data:""})
} catch (error) {
console.log(error);
throw new ErrorWithStatus(error.message, 500);
} 
}