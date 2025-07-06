import { NextFunction, Request, Response } from "express";
import { TopicService } from "../services/Topic.service";
import { APIFeatures } from "../utils/ApiFeature.util";

const topicService = new TopicService();
export class TopicController {
  async createTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      console.log("Creating topic with name:", name);

      const topic = await topicService.createTopic(name);
      res.status(201).json(topic);
    } catch (err) {
      next(err);
    }
  }

  async getAllTopics(req: Request, res: Response, next: NextFunction) {
    try {
      const features = new APIFeatures(req.query)
        .paginate()
        .parse()
        .sort()
        .limitFields();

      const { filter, options } = features.build();

      const topics = await topicService.getAllTopics(filter, options);
      res.status(200).json(topics);
    } catch (err) {
      next(err);
    }
  }

  async getTopicById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const topic = await topicService.getTopicById(id);
      if (!topic) {
        res.status(404).json({ message: "Topic not found" });
        return;
      }
      res.status(200).json(topic);
    } catch (err) {
      next(err);
    }
  }

  async updateTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updatedTopic = await topicService.updateTopic(id, name);
      if (!updatedTopic) {
        res.status(404).json({ message: "Topic not found" });
        return;
      }
      res.status(200).json(updatedTopic);
    } catch (err) {
      next(err);
    }
  }

  async deleteTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deletedTopic = await topicService.deleteTopic(id);
      if (!deletedTopic) {
        res.status(404).json({ message: "Topic not found" });
        return;
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
