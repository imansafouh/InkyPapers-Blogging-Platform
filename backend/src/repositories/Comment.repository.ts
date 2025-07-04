import { IComment } from "../interfaces/Comment.interface";
import { Comment } from "../models/Comment.model";
import { BaseRepository } from "./Base.repository";

export class CommentRepository extends BaseRepository<IComment> {
  constructor() {
    super(Comment);
  }
}
