import dotenv from "dotenv";
import express from "express";
import authRoute from "./routes/auth.route.js";
import blogRoute from "./routes/blog.route.js";
import userRoute from "./routes/user.route.js"
import homeRoute from "./routes/home.route.js";

dotenv.config();

const app = express();
app.use(express.json());
// register view engine
app.set("view engine", "ejs")



// Routes
app.use("/", homeRoute)
app.use("/auth", authRoute);
app.use("/blogs", blogRoute);
app.use("/users", userRoute)

// catch all route
app.all("*", (req, res) => {
  res.status(404);
  res.json({
    message: "Not found",
  });
});


export default app;