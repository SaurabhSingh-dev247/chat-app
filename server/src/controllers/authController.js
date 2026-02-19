import asyncHandler from "../util/async-handler.js";
import validator from "validator";
import { sendOtp, verifyOtp } from "../service/otp-service.js";
import User from "../model/User.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  createJti,
  persistRefreshToken,
} from "../util/token.js";
import generateUserName from "../util/generate-username.js";
import fs from "fs/promises";

const signInUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const validEmail = validator.isEmail(email);

  if (!validEmail || password.trim() === "") {
    return res.status(401).json({ msg: "Invalid credentials from user." });
  }

  const user = await User.findOne({ email, username });

  if (!user) {
    return res.status(401).json({ msg: "Could not find a user." });
  }

  const hashedPassword = user.hashed;
  const verified = await bcrypt.compare(password, hashedPassword);

  if (!verified) {
    return res.status(401).json({ msg: "Invalid password." });
  }

  const jti = createJti();
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  // await persistRefreshToken(
  //   user,
  //   refreshToken,
  //   jti,
  //   req.ip,
  //   req.headers["user-agent"],
  // );

  const cookieMaxAge = 30 * 24 * 60 * 60;

  return res.status(200).json({
    user: {
      userId: user._id.toString(),
      userName: user.username,
      userAvatar: user.avatar,
    },
    accessToken: accessToken,
  });
});

const signUpUser = asyncHandler(async (req, res) => {
  const file = req.file;
  if (!file) {
    return res
      .status(401)
      .json({ msg: "No avatar was uploaded upload your avatar." });
  }

  try {
    const { email, name, password } = req.body;
    const validEmail = validator.isEmail(email);

    if (name.trim() === "" || !validEmail || password.trim() === "") {
      return res.status(401).json({ msg: "Invalid credentials from user." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const userName = generateUserName(name);
    const avatarUrl = file.path.replace(/\\/g, "/").replace("public/", "");

    const user = new User({
      name,
      username: userName,
      email,
      hashed: hashed,
      status: "online",
      avatar: avatarUrl,
      lastSeen: Date.now(),
      isActive: true,
    });
    await user.save();

    const jti = createJti();
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user, jti);

    // await persistRefreshToken(
    //   user,
    //   refreshToken,
    //   jti,
    //   req.ip,
    //   req.headers["user-agent"],
    // );

    const cookieMaxAge = 30 * 24 * 60 * 60;

    return res.status(201).json({
      user: {
        userId: user._id,
        userName: user.username,
        userAvatar: user.avatar,
      },
      accessToken: accessToken,
    });
  } catch (error) {
    await fs
      .unlink(file.path)
      .catch((err) => console.log("ERROR DELETING FILE: ", error));

    throw error;
  }
});

// .cookie("refreshToken", refreshToken, {
//   httpOnly: true,
//   sameSite: "lax",
//   maxAge: cookieMaxAge * 1000,
// })
// //secure: false,

export { signInUser, signUpUser };
