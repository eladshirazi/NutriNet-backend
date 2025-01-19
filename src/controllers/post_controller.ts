import Post, { IPost } from "../models/post_model";
import BaseController from "./base_controller";
import { Response } from "express";
import { AuthRequest } from "./auth_controller";

class PostController extends BaseController<IPost> {
  constructor() {
    super(Post);
  }

  async post(req: AuthRequest, res: Response) {
    // Prepare post data with all necessary fields
    const postData = {
      user: req.user._id, // Set the user as the post owner
      text: req.body.text, // Assuming text is sent in the request body
      image: req.body.image || "", // Set the image as an empty string if not provided
      likes: [], // Initialize likes as an empty array
      comments: [], // Initialize comments as an empty array
    };

    try {
      const newPost = await this.model.create(postData); // Create the post using the base model
      res.status(201).json(newPost); // Return the created post with a 201 status
    } catch (err) {
      res.status(500).send(err.message); // Handle errors
    }
  }
}

export default new PostController();
