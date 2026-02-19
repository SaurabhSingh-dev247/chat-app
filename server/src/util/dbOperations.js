import Message from "../model/Message.js";
import Conversation from "../model/Conversation.js";
import User from "../model/User.js";
import UserFriends from "../model/UserFriends.js";

export async function saveMessageToDB(
  conversationId,
  sender,
  messageText,
  receiver,
  messageStatus,
) {
  try {
    await Message.create({
      conversationId: conversationId,
      sender: sender,
      messageType: "text",
      text: messageText,
      readBy: [receiver],
      status: messageStatus,
    });
  } catch (error) {
    console.log("ERROR SAVING MESSAGE TO THE DB: ", error);
    return;
  }
}

export async function updateFriendMessage(
  userId,
  friendId,
  message,
  messageTimeStamp,
) {
  try {
    if (userId === friendId) {
      console.log("Cannot add self as friend");
      return;
    }
    
    await UserFriends.findOneAndUpdate(
      { user: userId, friend: friendId },
      {
        $set: {
          lastMessage: message,
          lastMessageAt: messageTimeStamp,
        },
      },
      { upsert: true, runValidators: true },
    );
    return;
  } catch (error) {
    console.log("FAILED TO UPDATE USER FRIEND MESSAGE: ", error);
    return;
  }
}
export async function updateConversation(
  conversationId,
  conversationType,
  lastMessage,
  lastMessageTimeStamp,
) {
  try {
    await Conversation.findByIdAndUpdate(
      conversationId,
      {
        $set: {
          conversationType: conversationType,
          lastMessage: lastMessage,
          lastMessageAt: lastMessageTimeStamp,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      },
    );
    return;
  } catch (error) {
    console.log("FAILED TO UPDATE CONVERSATION: ", error);
    return;
  }
}

export async function updateUserStatus(userId, userStatus, lastSeen, isActive) {
  try {
    await User.findByIdAndUpdate(
      userId,
      {
        $set: { status: userStatus, lastSeen, isActive },
      },
      {
        runValidators: true,
      },
    );
  } catch (error) {
    console.log("FAILED TO UPDATE USER STATUS: ", error);
    return;
  }
}

export async function getUserFriends(userId) {
  try {
    const friends = await UserFriends.find({ user: userId })
      .select("friend -_id")
      .exec();
    return friends;
  } catch (error) {
    console.log("ERROR FINDING USER FRIENDS : ", error);
    return;
  }
}
