import Post, { IPost } from "../models/post_model";
import BaseController from "./base_controller";
import { Response } from "express";
import { AuthRequest } from "./auth_controller";

class PostController extends BaseController<IPost> {
  constructor() {
    super(Post);
  }

  async post(req: AuthRequest, res: Response) {
    const postData = {
      user: req.user._id,
      text: req.body.text,
      image: req.body.image || "",
      likes: [],
      comments: [],
    };

    try {
      const newPost = await this.model.create(postData);
      res.status(201).json(newPost);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

export default new PostController();
