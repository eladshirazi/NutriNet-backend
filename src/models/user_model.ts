import mongoose from "mongoose";

export interface IUser {
  _id: string;
  email: string;
  username: string;
  password: string;
  profilePicture: string; // URL or path to the user's profile picture
  tokens: string[];
}

const UserSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please use a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: {
    type: [String],
    default: [],
  },
  profilePicture: {
    type: String,
    default: "",
  },
});

export default mongoose.model<IUser>("user", UserSchema);
