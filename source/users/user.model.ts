import mongoose, { Schema, Document } from "mongoose";
import { user } from "./user.interface";

const UserShema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  post: {
    type: Array,
  },
  follows: {
    type: Array,
  },
  photo: {
    type: String,
    default: "images/default.png",
  },
});

export default mongoose.model<user>("User", UserShema);
