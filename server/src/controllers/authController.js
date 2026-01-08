import asyncHandler from "../util/async-handler.js";
import validator from "validator";
import { sendOtp, verifyOtp } from "../service/otp-service.js";
import User from "../model/User.js";
import RefreshToken from "../model/RefreshToken.js";

const user = {
  name: "",
  email: "",
  phonenumber: "",
  avatar: "",
};

const signInUser = asyncHandler(async (req, res) => {
  const { phonenumber, countrycode } = req.body;
  const locale = "en-" + countrycode;
  const validPhoneNumber = validator.isMobilePhone(phonenumber, locale, {
    strictMode: true,
  });

  if (!validPhoneNumber) {
    return res.status(401).json({ msg: "Invalid phone number from user." });
  }

  try {
    const data = await sendOtp(phonenumber + "/");
    return res.status(200).json({ msg: "Otp send successfully." });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

const signUpUser = asyncHandler(async (req, res) => {
  const { name, email, phonenumber, countrycode } = req.body;
  user.name = name;
  user.email = email;
  user.phonenumber = phonenumber;

  const locale = "en-" + countrycode;
  const validEmail = validator.isEmail(email);
  const validPhoneNUmber = validator.isMobilePhone(phonenumber, locale, {
    strictMode: true,
  });
  if (
    name.trim() === "" ||
    email.trim() === "" ||
    phonenumber.trim() === "" ||
    !validEmail ||
    !validPhoneNUmber
  ) {
    return res.status(401).json({ msg: "Invalid credentials from user." });
  }

  try {
    const data = await sendOtp(phonenumber + "/");
    return res.status(200).json({ msg: "Otp send successfully." });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
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
