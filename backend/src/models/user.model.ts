import mongoose from "mongoose";
import { IUser } from "../interfaces/User.interface";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    isDeleted: { type: Boolean, default: false },
    isSuspended: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    avatar: { type: String, default: "" },
    bio: { type: String, maxLength: 500 },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: false },
  }
);

export const User = mongoose.model<IUser>("User", userSchema);
