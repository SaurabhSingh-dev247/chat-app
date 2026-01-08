import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import ApiError from "../util/Api-Error.js";

const client = axios.create({
  baseURL: process.env.OTP_DEV_BASE_URI,
  headers: {
    "X-OTP-Key": process.env.OTP_DEV_API_KEY,
    "Content-Type": "application/json",
  },
});

export async function sendOtp(phone) {
  try {
    const response = await client.post("/verifications", {
      data: {
        channel: "sms",
        phone,
        sender: process.env.OTP_DEV_SENDER_ID,
        template: process.env.OTP_DEV_TEMPLATE_ID + "///",
        code_length: 6,
      },
    });

    return response.data;
  } catch (error) {
    const otpError = error.response?.data?.errors?.[0];

    throw new ApiError(
      otpError?.message || "OTP service failed",
      otpError?.status || 502
    );
  }
}

export async function verifyOtp(code) {
  try {
    const response = await client.get(`/verifications?code=${code}`);
    return response.data;
  } catch (error) {
    const otpError = error.response?.data?.errors?.[0];

    throw new ApiError(
      otpError?.message || "OTP verification failed",
      otpError?.status || 502
    );
  }
}
