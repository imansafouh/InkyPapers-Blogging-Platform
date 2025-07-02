import { Document, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isDeleted: boolean;
  isSuspended: boolean;
  createdAt: Date;
  avatar?: string;
  bio?: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
}
