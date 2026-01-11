import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema({
  conversationId: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },
  messageType: {
    type: String,
    enums: ["text", "image", "file", "video"],
    default: "text",
    required: true,
  },
  text: String,
  attachments: {
    type: String,
    enums: ["video", "image", "file"],
  },
  sender: Schema.Types.ObjectId,
  readBy: [Schema.Types.ObjectId],
  replyTo: Schema.Types.ObjectId,
  createAt: Date,
  updatedAt: Date,
  isDeleted: Boolean,
});

export default mongoose.model("Message", MessageSchema);
