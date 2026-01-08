import mongoose, { Schema } from "mongoose";

const RefreshTokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", index: true },
  tokenHash: { type: String, required: true, unique: true },
  jti: { type: String, required: true, index: true, unique: true },
  expiresAt: { type: Date, required: true, index: true },
  revokedAt: { type: Date, default: null },
  replacedBy: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  ip: String,
  userAgent: String,
});

export default mongoose.model("RefreshToken", RefreshTokenSchema);
