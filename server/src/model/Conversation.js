import mongoose, { Schema } from "mongoose";

const ConversationSchema = new Schema({
  consversationType: { type: String, enums: ["direct", "group"] },
  name: String,
  participants: [Schema.Types.ObjectId],
  admins: [Schema.Types.ObjectId],
  lastmessage: String,
  lastmessageAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
});

export default mongoose.model("Conversation", ConversationSchema);
