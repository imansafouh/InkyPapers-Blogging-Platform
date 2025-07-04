import { FilterQuery, Types } from "mongoose";
import { CommentRepository } from "../repositories/Comment.repository";
import { IComment } from "../interfaces/Comment.interface";
import { PaginationOptions } from "../repositories/Base.repository";
import { AppError } from "../utils/AppError.util";

export class CommentService {
  private commentRepo: CommentRepository = new CommentRepository();

  async createComment(data: {
    blogId: string;
    userId: string;
    comment: string;
  }) {
    return this.commentRepo.create({
      ...data,
      blogId: new Types.ObjectId(data.blogId),
      userId: new Types.ObjectId(data.userId),
    });
  }

  async getComments(
    filter: FilterQuery<IComment> = {},
    options: PaginationOptions = {}
  ) {
    return this.commentRepo.findAll(filter, options);
  }

  async getCommentById(commentId: string) {
    return await this.commentRepo.findById(commentId);
  }

  async updateComment(commentId: string, data: Partial<IComment>) {
    const updatedComment = await this.commentRepo.update(commentId, data);
    if (!updatedComment) {
      throw new AppError("Comment not found", 404);
    }
    return updatedComment;
  }

  async deleteComment(commentId: string) {
    const deletedComment = await this.commentRepo.delete(commentId);
    if (!deletedComment) {
      throw new AppError("Comment not found", 404);
    }
    return deletedComment;
  }
}
