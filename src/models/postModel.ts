import mongoose, { Schema, Document } from "mongoose";

export interface IComment {
  user: mongoose.Types.ObjectId; // Reference to the user who commented
  text: string; // Comment content
  createdAt: Date;
}

export interface IPost extends Document {
  user: mongoose.Types.ObjectId; // Reference to the user who uploaded the post
  text: string; // Content text
  image: string; // Path to the image
  likes: mongoose.Types.ObjectId[]; // List of users who liked the post
  comments: IComment[]; // Array of comments
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const PostSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    image: { type: String, default: "" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [CommentSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IPost>("Post", PostSchema);
