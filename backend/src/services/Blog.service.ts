import { BlogRepository } from "../repositories/Blog.repository";
import { FilterQuery, Types } from "mongoose";
import { AppError } from "../utils/AppError.util";
import { IBlog } from "../interfaces/Blog.interface";
import { PaginationOptions } from "../repositories/Base.repository";

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
    console.log(blogId);

    const blog = await this.blogRepo.findById(blogId);
    if (!blog) {
      throw new AppError("Blog not found", 404);
    }
    return blog;
  }

  //   async getBlogsByAuthor(authorId, page = 1, limit = 10) {
  //     return this.blogRepo.findByAuthor(authorId, page, limit);
  //   }

  //   async getBlogComments(blogId) {
  //     return this.blogRepo.getCpmments(blogId);
  //   }

  //   async updateBlog(blogId, data) {
  //     return this.blogRepo.update(blogId, data);
  //   }

  //   async deleteBlog(blogId) {
  //     return this.blogRepo.delete(blogId);
  //   }
}
