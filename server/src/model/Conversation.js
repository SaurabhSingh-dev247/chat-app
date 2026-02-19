import mongoose, { Schema } from "mongoose";

const ConversationSchema = new Schema(
  {
    conversationType: {
      type: String,
      enum: ["direct", "group"],
      required: true,
      index: true,
    },
    name: {
      type: String,
      trim: true,
    },
    participants: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: true,
      index: true,
    },
    admins: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    lastMessage: {
      type: String,
      default: null,
    },
    lastMessageAt: {
      type: Date,
      index: true,
    },
  },
  { timestamps: true },
);


export default mongoose.model("Conversation", ConversationSchema);
