import mongoose from "mongoose";
import { IBlog } from "../interfaces/Blog.interface";

const blogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    body: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    topic: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // comments: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Comment",
    //   },
    // ],
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: false },
  }
);

export const Blog = mongoose.model<IBlog>("Blog", blogSchema);
