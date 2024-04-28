import dotenv from "dotenv";
import express from "express";
import authRoute from "./routes/auth.route.js";
import blogRoute from "./routes/blog.route.js";
import userRoute from "./routes/user.route.js"
import homeRoute from "./routes/home.route.js";
import morgan  from "morgan"
dotenv.config();

const app = express();
app.use(express.json());

// register view engine
app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))


// Routes
app.use("/", homeRoute)
app.use("/auth", authRoute);
app.use("/blogs", blogRoute);
app.use("/users", userRoute)

// catch all route
app.all("*", (req, res) => {
  res.status(404);
  res.render("404")
});


export default app;