import { Router } from "express";
import { TopicController } from "../controllers/Topic.controller";
import { authenticate } from "../middlewares/Auth.middleware";

const router = Router();
const topicController = new TopicController();

router.route("/").get(topicController.getAllTopics);

router.use(authenticate);
router
  .route("/:id")
  .get(topicController.getTopicById)
  .patch(topicController.updateTopic)
  .delete(topicController.deleteTopic);

router.route("/").post(topicController.createTopic);

export default router;
