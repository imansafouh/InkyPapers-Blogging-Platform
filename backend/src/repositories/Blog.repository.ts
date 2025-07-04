import { IBlog } from "../interfaces/Blog.interface";
import { Blog } from "../models/Blog.model";
import { BaseRepository } from "./Base.repository";

export class BlogRepository extends BaseRepository<IBlog> {
  constructor() {
    super(Blog);
  }

  async findByAuthor(authorId: string, page = 1, limit = 10) {
    return this.findAll(
      {
        userId: authorId,
      },
      { page, limit }
    );
  }

  async getComments(blogId: string) {
    return this.model
      .findById(blogId)
      .populate("comments.user", "name avatar")
      .select("comments")
      .exec();
  }
}
