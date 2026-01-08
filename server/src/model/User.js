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
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: String,
  status: { type: String, enum: ["online", "offline", "awat"] },
  lastSeen: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

export default mongoose.model("User", UserSchema);
