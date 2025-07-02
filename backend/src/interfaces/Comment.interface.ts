import { Types } from "mongoose";

export interface IComment {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  blogId: Types.ObjectId;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}
