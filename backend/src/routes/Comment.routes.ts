import { Router } from "express";
import { CommentController } from "../controllers/Comment.Controller";
import { authenticate } from "../middlewares/Auth.middleware";

const router = Router();
const controller = new CommentController();

router.get("/", controller.getAllComments);
router.route("/:id").get(controller.getCommentById);

router.use(authenticate);
router.post("/:blogId", controller.createComment);
router
  .route("/:id")
  .patch(controller.updateComment)
  .delete(controller.deleteComment);

export default router;
