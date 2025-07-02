import express from "express";
import cors from "cors";
import morgan from "morgan";

import userRoutes from "./src/routes/User.routes";

// import routes from "./src/routes";
// import { errorHandler } from './middleware/errorHandler';

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/user", userRoutes);
// Error Handler (after routes)
// app.use(errorHandler);

export default app;
