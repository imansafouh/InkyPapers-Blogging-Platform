import { Document, Types } from "mongoose";

export interface IBlog extends Document {
  userId: Types.ObjectId;
  title: string;
  body: string;
  createdAt: Date;
  topic: Types.ObjectId[];
  likes: Types.ObjectId[];
}
