import { Router } from "express";

const homeRoute = Router();

homeRoute.get("/", (req,res)=>{
    res.json({message: "Welcome to Igashi's Blogging API"})
})
export default homeRoute;