import mongoose from "mongoose";
const {Schema} = mongoose;
import shortId from "../types/short-id.js";

const userSchema = new Schema({
  shortId,
  role: {
    type: String,
    default: "USER",
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: null,
  },
  age: {
    type: Number,
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
});

const User = mongoose.model("User", userSchema);
export {User};
