import { Router } from "express";

const homeRoute = Router();

homeRoute.get("/", (req,res)=>{
  
    res.render("home")
})

homeRoute.get("/about", (req,res)=>{
  
    res.render("about")
})
export default homeRoute;