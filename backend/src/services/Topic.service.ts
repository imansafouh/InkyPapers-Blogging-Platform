import { FilterQuery } from "mongoose";
import { TopicRepository } from "../repositories/Topic.repository";
import { ITopic } from "../interfaces/Topic.interface";
import { PaginationOptions } from "../repositories/Base.repository";

export class TopicService {
  private topicRepo: TopicRepository;

  constructor() {
    this.topicRepo = new TopicRepository();
  }

  async createTopic(name: string) {
    console.log(name);

    return this.topicRepo.create({ name });
  }

  async getAllTopics(
    filter: FilterQuery<ITopic> = {},
    options: PaginationOptions = {}
  ) {
    return this.topicRepo.findAll(filter, options);
  }

  async getTopicById(id: string) {
    return this.topicRepo.findById(id);
  }

  async updateTopic(id: string, name: string) {
    return this.topicRepo.update(id, { name });
  }

  async deleteTopic(id: string) {
    return this.topicRepo.delete(id);
  }
}
