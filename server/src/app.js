import express from "express";
import http from "http";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";
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
    credentials: true
  })
);
app.use(express.json());


app.use("/api/auth", authRouter);

wss.on("connection", (ws) => {
  console.log("USER CONNECTED.");
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    console.log(typeof data.type, data);
    ws.emit("Hello, World!");
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
