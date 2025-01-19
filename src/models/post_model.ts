import mongoose, { Schema, Document } from "mongoose";

export interface IComment {
  user: mongoose.Types.ObjectId; // Reference to User model
  text: string; // Comment content
  createdAt: Date;
}

export interface IPost extends Document {
  user: mongoose.Types.ObjectId; // Reference to User model
  text: string; // Post content
  image: string; // Path to post image
  likes: mongoose.Types.ObjectId[]; // Array of User IDs who liked the post
  comments: IComment[]; // Array of nested comments
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true } // Automatically adds createdAt field
);

const PostSchema: Schema<IPost> = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    image: { type: String, default: "" }, // Path or URL to image
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of User IDs
    comments: [CommentSchema], // Nested comments schema
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.model<IPost>("post", PostSchema);
