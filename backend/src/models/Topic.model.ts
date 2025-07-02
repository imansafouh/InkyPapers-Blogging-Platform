import mongoose from "mongoose";
import { ITopic } from "../interfaces/Topic.interface";

const topicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: false },
  }
);

export const Topic = mongoose.model<ITopic>("Topic", topicSchema);
