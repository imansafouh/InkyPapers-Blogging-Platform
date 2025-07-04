import { Request, Response, NextFunction } from "express";
import { BlogService } from "../services/Blog.service";
import { APIFeatures } from "../utils/ApiFeature.util";

const blogService = new BlogService();
export class BlogController {
  async createBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const result = await blogService.createBlog({
        ...req.body,
        userId,
      });

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  async getAllBlogs(req: Request, res: Response, next: NextFunction) {
    try {
      const features = new APIFeatures(req.query)
        .parse()
        .sort()
        .limitFields()
        .paginate();

      const { filter, options } = features.build();
      const result = await blogService.getAllBlogs(filter, options);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async getBlogById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const blog = await blogService.getBlogById(id);

      res.status(200).json(blog);
    } catch (err) {
      next(err);
    }
  }

  // async getBlogsByAuthor(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { authorId } = req.params;
  //     const { page, limit } = req.query;
  //     const blogs = await this.blogService.getBlogsByAuthor(
  //       authorId,
  //       page,
  //       limit
  //     );
  //     res.status(200).json(blogs);
  //   } catch (err) {
  //     next(err);
  //   }
  // }
}
