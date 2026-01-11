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

const signInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const validEmail = validator.isEmail(email);

  if (!validEmail || password.trim() === "") {
    return res.status(401).json({ msg: "Invalid credentials from user." });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ msg: "Could not find a user with email." });
  }

  const hashedPassword = user.password;
  const verified = await bcrypt.compare(password, hashedPassword);

  if (!verified) {
    return res.status(401).json({ msg: "Invalid password." });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const jti = createJti();

  await persistRefreshToken(
    user,
    refreshToken,
    jti,
    req.ip,
    req.headers["user-agent"]
  );

  const cookieMaxAge = 30 * 24 * 60 * 60;

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxage: cookieMaxAge,
    })
    .json({
      user: { userId: user._id.toString(), userName: user.name },
      accessToken: accessToken,
    });
});

const signUpUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  // const locale = "en-" + countrycode;
  const validEmail = validator.isEmail(email);
  // const validPhoneNUmber = validator.isMobilePhone(phonenumber, locale, {
  //   strictMode: true,
  // });

  if (name.trim() === "" || !validEmail || password.trim() === "") {
    return res.status(401).json({ msg: "Invalid credentials from user." });
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: hashed,
  });
  const newUser = await user.save();

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  const jti = createJti();

  await persistRefreshToken(
    newUser,
    refreshToken,
    jti,
    req.ip,
    req.headers["user-agent"]
  );

  const cookieMaxAge = 30 * 24 * 60 * 60;

  return res
    .status(201)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxage: cookieMaxAge,
    })
    .json({
      user: { userId: newUser._id.toString(), userName: newUser.name },
      accessToken: accessToken,
    });
});

const signUpUserVerify = asyncHandler(async (req, res) => {
  const { phonenumber, code, countrycode } = req.body;
  const locale = "en-" + countrycode;
  const validPhoneNUmber = validator.isMobilePhone(phonenumber, locale, {
    strictMode: true,
  });
  if (!validPhoneNUmber || code.trim().length !== 6) {
    return res.status(401).json({ msg: "Invalid credentials from user." });
  }

  const verifiedData = await verifyOtp(code);
  if (!verifiedData.data || verifiedData.data.length === 0) {
    return res.status(401).json({
      msg: "Invalid or expired OTP",
    });
  }
  //Save the user credential to the db.
  //Generate new access token and refresh token.
  //Create a new refesh token doc and save it to the db.
  //Send access via response.
  //And refresh token via the cookies.
  return res.status(200).json({ msg: "User successfully registered." });
});

const signInUserVerify = asyncHandler(async (req, res) => {
  const { phonenumber, code, countrycode } = req.body;
  const locale = "en-" + countrycode;
  const validPhoneNUmber = validator.isMobilePhone(phonenumber, locale, {
    strictMode: true,
  });
  if (!validPhoneNUmber || code.trim().length !== 6) {
    return res.status(401).json({ msg: "Invalid credentials from user." });
  }

  const verifiedData = await verifyOtp(code);
  if (!verifiedData.data || verifiedData.data.length === 0) {
    return res.status(401).json({
      msg: "Invalid or expired OTP",
    });
  }
  //Create a new referesh token schema in the db.
  //Send the access token and refresh token to the user.
  return res.status(200).json({ msg: "User signin successfully." });
});

export { signInUser, signInUserVerify, signUpUser, signUpUserVerify };

//try {
//   const data = await sendOtp(phonenumber + "/");
//   return res.status(200).json({ msg: "Otp send successfully." });
// } catch (error) {
//   return res.status(500).json({ msg: error.message });
// }

// const locale = "en-" + countrycode;
// const validPhoneNumber = validator.isMobilePhone(phonenumber, locale, {
//   strictMode: true,
// });
