import { Router } from "express";
import { BlogController } from "../controllers/Blog.controller";
import { authenticate } from "../middlewares/Auth.middleware";

const router = Router();
const controller = new BlogController();

router.get("/", controller.getAllBlogs);
router.route("/:id").get(controller.getBlogById);

router.use(authenticate);
router.post("/", controller.createBlog);

export default router;
