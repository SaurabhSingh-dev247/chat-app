import express from "express";
import http from "http";
import dotenv from "dotenv";
import WebSocket, { WebSocketServer } from "ws";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";
import fetchRoutes from "./routes/fetchRoutes.js";
import { verifyAccessToken } from "./util/token.js";
import {
  saveMessageToDB,
  updateConversation,
  updateUserStatus,
  updateFriendMessage,
  getUserFriends,
} from "./util/dbOperations.js";
import User from "./model/User.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5193;
const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING;
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/fetch", fetchRoutes);

const activeConnections = new Map();

wss.on("connection", (ws) => {
  let currentUserId = null;
  let isUserAuthorized = false;
  let userFriends = [];
  let userConversations = [];
  let userActiveFriends = [];

  ws.on("message", async (raw) => {
    try {
      const message = JSON.parse(raw);
      if (message.type !== "authenticate" && !isUserAuthorized) {
        ws.close(1008, "Authenticate first.");
        return;
      }

      if (message.type === "authenticate") {
        if (isUserAuthorized) {
          ws.send(
            JSON.stringify({ type: "error", message: "Already authenticated" }),
          );
          return;
        }

        try {
          const decoded = verifyAccessToken(message.user.accessToken);
          currentUserId = decoded.userId;
          isUserAuthorized = decoded.userId === message.user.userId;

          if (!isUserAuthorized) {
            ws.close(1008, "User ID mismatch.");
            return;
          }

          const friends = await getUserFriends(decoded.userId);
          await updateUserStatus(decoded.userId, "online", new Date(), true);
          userFriends = [...friends];
          activeConnections.set(currentUserId, ws);

          for (const friend of userFriends) {
            const id = friend.friend.toString();
            const friendSocket = activeConnections.get(id);

            if (friendSocket?.readyState === WebSocket.OPEN) {
              friendSocket.send(
                JSON.stringify({
                  type: "status_changed",
                  status:
                    ws.readyState === WebSocket.OPEN ? "active" : "inactive",
                  id: decoded.userId,
                }),
              );
            }
          }

          ws.send(
            JSON.stringify({
              type: "authenticated",
              userId: currentUserId,
            }),
          );
        } catch (error) {
          console.error("Auth error:", error);
          ws.close(1008, "Invalid token.");
          return;
        }
      }

      // Handle sending messages
      else if (message.type === "send_message") {
        if (!message.receiver) {
          ws.send(
            JSON.stringify({
              type: "error",
              message: "Receiver ID required",
            }),
          );
          return;
        }

        const receiverSocket = activeConnections.get(message.receiver);

        if (receiverSocket?.readyState === WebSocket.OPEN) {
          receiverSocket.send(
            JSON.stringify({
              ...message,
            }),
          );

          if (userConversations.length === 0) {
            userConversations.push({
              conversationId: message.conversationId,
              conversationType: message.conversationType,
              message: message.text,
              messageTimeStamp: message.timestamp,
            });
          } else {
            const isConversationAlreadyPresent = userConversations.some(
              (conversation) =>
                conversation.conversationId.includes(message.conversationId),
            );
            if (!isConversationAlreadyPresent) {
              userConversations.push({
                conversationId: message.conversationId,
                conversationType: message.conversationType,
                message: message.text,
                messageTimeStamp: message.timestamp,
              });
            }
          }

          if (userActiveFriends.length === 0) {
            userActiveFriends.push({
              friendId: message.receiver,
              message: message.text,
              messageTimeStamp: message.timestamp,
            });
          } else {
            const isFriendAlreadyPresent = userActiveFriends.some((friend) =>
              friend.friendId.includes(message.receiver),
            );
            if (!isFriendAlreadyPresent) {
              userActiveFriends.push({
                friendId: message.receiver,
                message: message.text,
                messageTimeStamp: message.timestamp,
              });
            }
          }
        }

        const messageStatus =
          receiverSocket?.readyState === WebSocket.OPEN ? "delivered" : "sent";

        if (ws.readyState === WebSocket.OPEN) {
          ws.send(
            JSON.stringify({
              ...message,
              messageStatus,
              receiverStatus:
                receiverSocket?.readyState === WebSocket.OPEN
                  ? "online"
                  : "offline",
            }),
          );
        }
        await saveMessageToDB(
          message?.conversationId,
          currentUserId,
          message.text,
          message.receiver,
          messageStatus,
        );

        if (ws.readyState === WebSocket.OPEN) {
          ws.send(
            JSON.stringify({
              type: "ack",
              messageStatus: messageStatus,
              receiverStatus:
                receiverSocket?.readyState === WebSocket.OPEN
                  ? "online"
                  : "offline",
            }),
          );
        }
      }
    } catch (error) {
      console.error("Message handling error:", error);
      ws.send(
        JSON.stringify({
          type: "error",
          message: "Invalid message format",
        }),
      );
    }
  });

  ws.on("close", async () => {
    if (currentUserId && isUserAuthorized) {
      console.log(`User ${currentUserId} disconnected`);
      await updateUserStatus(currentUserId, "offline", new Date(), false);

      if (userActiveFriends.length > 0 && userConversations.length > 0) {
        for (const conversation of userConversations) {
          await updateConversation(
            conversation.conversationId,
            conversation.conversationType,
            conversation.message,
            conversation.messageTimeStamp,
          );
        }

        for (const activeFriend of userActiveFriends) {
          if (currentUserId !== activeFriend.friendId) {
            await updateFriendMessage(
              currentUserId,
              activeFriend.friendId,
              activeFriend.message,
              activeFriend.messageTimeStamp,
            );

            await updateFriendMessage(
              activeFriend.friendId,
              currentUserId,
              activeFriend.message,
              activeFriend.messageTimeStamp,
            );
          }
        }
      }

      if (userFriends.length > 0) {

        for (const friend of userFriends) {
          const id = friend.friend.toString();
          const friendSocket = activeConnections.get(id);
        
          if (friendSocket?.readyState === WebSocket.OPEN) {
            friendSocket.send(
              JSON.stringify({
                type: "status_changed",
                status:
                  ws.readyState === WebSocket.OPEN ? "active" : "inactive",
                id: currentUserId,
              }),
            );
          }
        }
      }

      activeConnections.delete(currentUserId);
      currentUserId = null;
      isUserAuthorized = false;
      userFriends = [];
      userConversations = [];
      userActiveFriends = [];
    }
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    server.listen(PORT, () => {
      console.log(`Server running on the port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to the DB.");
    console.log(error);
  });
