import asyncHandler from "../util/async-handler.js";
import UserFriends from "../model/UserFriends.js";
import Conversation from "../model/Conversation.js";
import Message from "../model/Message.js";
import User from "../model/User.js";

const fetchUserFriends = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  if (!userId) {
    return res.status(401).json({ msg: "Invalid credentials from user." });
  }

  const friends = await UserFriends.find({ user: userId })
    .populate({
      path: "friend",
      select: "name avatar status lastSeen",
    })
    .select("lastMessage lastMessageAt")
    .sort({ lastMessageAt: -1 });

  if (!friends) {
    return res.status(401).json({ msg: "Failed to find user friends." });
  }

  if (friends.length === 0) {
    return res.status(200).json({
      msg: "User does not have any friends",
      friends: [],
    });
  }

  return res.status(200).json({
    msg: "Success",
    friends,
  });
});

const fetchMessages = asyncHandler(async function (req, res) {
  const friendId = req.body.friendId;
  const userId = req.user.userId;
  const { limit, page } = req?.query;

  const contentLimit = parseInt(limit);
  const skipped = parseInt(limit) * parseInt(page);

  if (!friendId || !userId) {
    return res.status(401).json({ msg: "Request failed." });
  }

  const conversationDoc = await Conversation.findOne({
    conversationType: "direct",
    participants: { $all: [userId, friendId] },
  }).exec();


  if (!conversationDoc) {
    return res.status(401).json({ msg: "Conversation not found." });
  }

  const messages = await Message.find({ conversationId: conversationDoc._id })
    .populate({
      path: "readBy",
      select: "name avatar -_id",
    })
    .select("text status updatedAt createdAt sender")
    .sort({ createdAt: -1 })
    .limit(contentLimit)
    .skip(skipped)
    .exec();


  if (!messages || messages.length === 0) {
    return res.status(200).json({
      msg: "Empty messages",
      messages: [],
      conversationId: conversationDoc?._id,
    });
  }

  return res.status(200).json({
    msg: "Success",
    messages: messages,
    conversationId: conversationDoc?._id,
  });
});

const findAndFetchUserFriends = asyncHandler(async function (req, res) {
  const friendName = req.body.friendName;
  if (!friendName) {
    return res
      .status(401)
      .json({ msg: "No frined username was provided in request body." });
  }
  const friend = await User.findOne({ username: friendName })
    .select("-hashed -password -email -createdAt -updatedAt -__v")
    .exec();

  if (!friend) {
    return res
      .status(200)
      .json({ msg: "Could not find a friend with associated username." });
  }

  return res.status(200).json({ msg: "Success", friend: friend });
});

const addFriend = asyncHandler(async function (req, res) {
  const friendId = req.body.friend._id;
  const userId = req.user.userId;

  if (!friendId) {
    return res.status(401).json({ msg: "Invalid friend id." });
  }

  if (!userId) {
    return res.status(401).json({ msg: "Invalid friend id." });
  }

  const friendDoc = await UserFriends.findOne({
    user: userId,
    friend: friendId,
  })
    .populate({
      path: "friend",
      select: "name avatar status lastSeen",
    })
    .exec();

  console.log("FRIEND DOC : ", friendDoc);
  const convParticipants = [userId, friendId].sort();

  const newFriend = new UserFriends({
    user: userId,
    friend: friendId,
  });
  let conversationDoc = await Conversation.findOne({
    conversationType: "direct",
    participants: convParticipants,
  });

  if (!friendDoc) {
    if (!conversationDoc) {
      conversationDoc = await Conversation.create({
        conversationType: "direct",
        participants: convParticipants,
      });
    }
    await newFriend.save();

    const populatedFriend = await UserFriends.findById(newFriend._id)
      .populate({
        path: "friend",
        select: "name avatar status lastSeen",
      })
      .select("lastMessage");

    console.log("POPULATED FRIEND : ", populatedFriend);
    console.log("CONVERSATION  DOC : ", conversationDoc);
    return res.status(201).json({
      msg: "Success",
      friend: populatedFriend,
      conversationId: conversationDoc._id,
    });
  }

  console.log("CONVERSATION  DOC : ", conversationDoc);
  return res.status(204).json({
    msg: "User already exist",
    friend: friendDoc,
    conversationId: conversationDoc._id,
  });
});

export { fetchUserFriends, fetchMessages, findAndFetchUserFriends, addFriend };
