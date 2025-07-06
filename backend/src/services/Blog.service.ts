import { BlogRepository } from "../repositories/Blog.repository";
import { FilterQuery, Types } from "mongoose";
import { AppError } from "../utils/AppError.util";
import { IBlog } from "../interfaces/Blog.interface";
import { PaginationOptions } from "../repositories/Base.repository";
import { CommentRepository } from "../repositories/Comment.repository";
import { upload } from "../middlewares/ImageUpload.middleware";

export class BlogService {
  private blogRepo: BlogRepository = new BlogRepository();
  private commentRepo: CommentRepository = new CommentRepository();

  async createBlog(data: { title: string; body: string; userId: string }) {
    return this.blogRepo.create({
      ...data,
      userId: new Types.ObjectId(data.userId),
    });
  }

  async getAllBlogs(
    filter: FilterQuery<IBlog> = {},
    options: PaginationOptions = {}
  ) {
    return this.blogRepo.findAll(filter, options);
  }

  async getBlogById(blogId: string) {
    const blog = await this.blogRepo.findById(blogId);
    if (!blog) {
      throw new AppError("Blog not found", 404);
    }

    const comments = await this.commentRepo.findAll(
      { blogId: blog._id },
      {
        sort: { createdAt: -1 },
        populate: { path: "userId", select: "name avatar" }, // optional
      }
    );

    return {
      ...blog.toObject(), // ensure plain object
      comments: comments.data, // attach only the actual comment array
    };
  }

  // async getBlogComments(blogId: string) {
  //   const comments = await this.blogRepo.getComments(blogId);
  //   if (!comments) {
  //     throw new AppError("Comments not found for this blog", 404);
  //   }
  //   return comments;
  // }

  async updateBlog(blogId: string, data: Partial<IBlog>) {
    return this.blogRepo.update(blogId, data);
  }

  async deleteBlog(blogId: string) {
    return this.blogRepo.delete(blogId);
  }
}
