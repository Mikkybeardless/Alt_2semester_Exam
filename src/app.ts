import dotenv from "dotenv";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cookieParser from "cookie-parser";
import apiRoutes from "./routes/index.js";

// middlewares
import morgan from "morgan";
import helmet from "helmet";
import { error } from "./middlewares/error.middleware.js";
import { limiter } from "./limiter/rateLimiter.js";

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(cookieParser());

// register view engine
// app.set("view engine", "ejs");
// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: true }));

// middlewares
app.use(morgan("dev"));
app.use(limiter);
// security
app.use(helmet());

// Routes
app.get("/", (_: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Welcome to the blogStar API", success: true });
});
app.use(`/api/v1`, apiRoutes);

// general error handler
app.use(error);

//catch all route
app.all("*", (_: Request, res: Response) => {
  res.status(404);
  res.json({ message: "404 route found", success: false });
});

export default app;
