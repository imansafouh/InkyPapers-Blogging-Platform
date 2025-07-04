import { IBlog } from "../interfaces/Blog.interface";
import { Blog } from "../models/Blog.model";
import { BaseRepository } from "./Base.repository";

export class BlogRepository extends BaseRepository<IBlog> {
  constructor() {
    super(Blog);
  }

  async getComments(blogId: string) {
    return this.model
      .findById(blogId)
      .populate("comments.user", "name avatar")
      .select("comments")
      .exec();
  }
}
