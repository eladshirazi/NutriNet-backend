import express from "express";
const router = express.Router();
import PostController from "../controllers/post_controller";
import { authMiddleware } from "../controllers/auth_controller";

//get all posts
router.get("/", PostController.get.bind(PostController));

//get post by id
router.get("/:id", PostController.get.bind(PostController));

//create post
router.post("/", authMiddleware, PostController.post.bind(PostController));

//put
router.put("/", PostController.put.bind(PostController));

//delete
router.delete("/", PostController.delete.bind(PostController));

export default router;
