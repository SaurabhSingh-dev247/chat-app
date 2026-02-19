import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    messageType: {
      type: String,
      enum: ["text", "image", "video", "file"],
      default: "text",
    },
    text: {
      type: String,
      trim: true,
      maxlength: 5000,
    },
    attachments: [
      {
        url: String,
        type: {
          type: String,
          enum: ["image", "video", "file"],
        },
      },
    ],
    readBy: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    replyTo: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    status: {
      type: String,
      enum: ["sent", "delivered"],
      default: "sent",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);


export default mongoose.model("Message", MessageSchema);
