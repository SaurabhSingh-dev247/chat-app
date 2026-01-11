import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: String,
  status: { type: String, enum: ["online", "offline", "away"] },
  lastSeen: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", UserSchema);
