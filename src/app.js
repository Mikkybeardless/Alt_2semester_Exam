import dotenv from "dotenv";
import express from "express";

// routes
import authRoute from "./routes/auth.route.js";
import blogRoute from "./routes/blog.route.js";
import userRoute from "./routes/user.route.js";
import homeRoute from "./routes/home.route.js";

// middlewares
import morgan from "morgan";
import helmet from "helmet";
import { error } from "./middlewares/error.middleware.js";
import { limiter } from "../limiter/rateLimiter.js";

dotenv.config();

const app = express();
app.use(express.json());

// register view engine
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// middlewares
app.use(morgan("dev"));
app.use(limiter);
// security
app.use(helmet());

// Routes
app.use("/", homeRoute);
app.use("/auth", authRoute);
app.use("/blogs", blogRoute);
app.use("/users", userRoute);

// general error handler
app.use(error);

// catch all route
app.all("*", (req, res) => {
  res.status(404);
  res.render("404");
});

export default app;
