import { ITopic } from "../interfaces/Topic.interface";
import { Topic } from "../models/Topic.model";
import { BaseRepository } from "./Base.repository";

export class TopicRepository extends BaseRepository<ITopic> {
  constructor() {
    super(Topic);
  }
}
