import { BlogRepository } from "../repositories/Blog.repository";
import { FilterQuery, Types } from "mongoose";
import { AppError } from "../utils/AppError.util";
import { IBlog } from "../interfaces/Blog.interface";
import { PaginationOptions } from "../repositories/Base.repository";
import { IComment } from "../interfaces/Comment.interface";

export class BlogService {
  private blogRepo: BlogRepository = new BlogRepository();

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
    return blog;
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
