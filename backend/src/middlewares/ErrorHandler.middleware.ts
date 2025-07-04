import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../utils/AppError.util";

export const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error caught:", err);

  // Handle MongoDB duplicate key error
  if (err.code === 11000) {
    res.status(400).json({
      status: "fail",
      message: "Duplicate key error",
      details: err.keyValue,
    });
    return;
  }

  if (err.name === "CastError") {
    const message = `Invalid ${err.path}: ${err.value}`;
    res.status(400).json({
      status: "fail",
      message,
    });
    return;
  }

  // Handle validation errors (e.g., Zod or Joi — optional)
  if (err.name === "ValidationError") {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
    return;
  }

  if (err.name === "JsonWebTokenError") {
    res.status(401).json({
      status: "fail",
      message: "Invalid token",
    });
    return;
  }

  if (err.name === "TokenExpiredError") {
    res.status(401).json({
      status: "fail",
      message: "Token expired",
    });
    return;
  }

  // Custom AppError
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
    return;
  }

  // Unexpected errors
  res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};
