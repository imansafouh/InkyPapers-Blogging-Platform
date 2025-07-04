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

  // async getBlogComments(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     const comments = await blogService.getBlogComments(id);

  //     res.status(200).json(comments);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  async updateBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await blogService.updateBlog(id, req.body);

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  async deleteBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await blogService.deleteBlog(id);

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
