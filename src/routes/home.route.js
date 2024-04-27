import { Router } from "express";

const homeRoute = Router();

homeRoute.get("/", (req,res)=>{
    res.json({message: `
    Welcome to Igashi's Blogging API.

    Use add these extentions to the baseurl to navigate to free routes:
    - /blogs: to get all blogs(only published blogs will be displayed).
    - blogs/published: returns similarly blogs in the published state.
    - blogs/:id/read : need a blog id to read and read_count gets updated. For this, here is an id of a blog in published state (6626762ebafe9593f955266e) 
    
    `})
})
export default homeRoute;