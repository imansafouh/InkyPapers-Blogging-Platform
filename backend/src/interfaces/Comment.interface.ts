import { Types, Document } from "mongoose";

export interface IComment extends Document {
  userId: Types.ObjectId;
  blogId: Types.ObjectId;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}
