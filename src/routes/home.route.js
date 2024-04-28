import { Router } from "express";
import {getAllBlogs} from "../services/blog.service.js";

const homeRoute = Router();

homeRoute.get("/", async (req,res)=>{
    const {data, meta} =  await getAllBlogs()
    res.render("home", {blogs:data})
})

homeRoute.get("/about", (req,res)=>{
  
    res.render("about")
})
export default homeRoute;