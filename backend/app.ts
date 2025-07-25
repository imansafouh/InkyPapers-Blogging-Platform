import express from "express";
import cors from "cors";
import morgan from "morgan";

import userRouter from "./src/routes/User.routes";
import blogRouter from "./src/routes/Blog.routes";
import commentRouter from "./src/routes/Comment.routes";
import topicRouter from "./src/routes/Topic.routes";
import { globalErrorHandler } from "./src/middlewares/ErrorHandler.middleware";

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/comment", commentRouter);
app.use("/api/topic", topicRouter);

// Not Found Handler
// app.all("*", (req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

// Global Error Handler
app.use(globalErrorHandler);

export default app;
