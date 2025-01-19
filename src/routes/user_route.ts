import express from "express";
const router = express.Router();
import UserController from "../controllers/user_controller";
import { authMiddleware } from "../controllers/auth_controller";

router.get("/", authMiddleware, UserController.get.bind(UserController));

//get user by id
router.get("/:id", authMiddleware, UserController.get.bind(UserController));

//create user
router.post("/", authMiddleware, UserController.post.bind(UserController));

//update user
router.put("/", authMiddleware, UserController.put.bind(UserController));

//delete
router.delete("/", authMiddleware, UserController.delete.bind(UserController));

export default router;
