import { NextFunction, Request, Response } from "express";
import { CommentService } from "../services/Comment.service";
import { APIFeatures } from "../utils/ApiFeature.util";

const commentService = new CommentService();
export class CommentController {
  async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { blogId } = req.params;
      const userId = req.user!.id;
      const comment = await commentService.createComment({
        ...req.body,
        blogId,
        userId,
      });
      res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  }

  async getAllComments(req: Request, res: Response, next: NextFunction) {
    try {
      const features = new APIFeatures(req.query)
        .parse()
        .sort()
        .limitFields()
        .paginate();
      const { filter, options } = features.build();
      const comments = await commentService.getComments(filter, options);
      res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  }

  async getCommentById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const comment = await commentService.getCommentById(id);
      if (!comment) {
        res.status(404).json({ message: "Comment not found" });
        return;
      }
      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  }

  async updateComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updatedComment = await commentService.updateComment(id, req.body);
      res.status(200).json(updatedComment);
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await commentService.deleteComment(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
