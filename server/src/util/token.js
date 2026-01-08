import crypto from "crypto";
import jwt from "jsonwebtoken";
import RefreshToken from "../model/RefreshToken.js";

export function createJti() {
  return crypto.randomBytes(32).toString("hex");
}

export function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function verifyAccessToken(token) {
  return jwt.verify(token, process.env.ACCESS_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.REFRESH_SECRET);
}

export function generateAccessToken(user) {
  const payload = { userId: user._id.toString(), userName: user.name };
  return jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "1d" });
}

export function generateRefreshToken(user) {
  const payload = { userId: user._id.toString(), userName: user.name };
  return jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: "30d" });
}

export function persistRefreshToken() {}

export async function persistRefreshToken(
  user,
  refreshToken,
  jti,
  ip,
  userAgent
) {
  const expirySeconds = 7 * 60 * 60 * 24;
  const tokenHash = hashToken(refreshToken);
  const expiresAt = new Date(Date.now() + expirySeconds * 1000);
  await RefreshToken.create({
    user: user._id,
    tokenHash: tokenHash,
    jti: jti,
    expiresAt: expiresAt,
    ip: ip,
    userAgent: userAgent,
  });
}

export async function rotateRefreshToken(req, res, oldDoc, user) {
  oldDoc.revokedAt = new Date();
  const newJti = createJti();
  oldDoc.replacedBy = jti;
  await oldDoc.save();
  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  persistRefreshToken(
    user,
    newRefreshToken,
    newJti,
    req.ip,
    req.headers["user-agent"]
  );

  const refreshTokenExpirySeconds = 7 * 60 * 60 * 24;

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: refreshTokenExpirySeconds * 1000,
  });
  return { accessToken: newAccessToken };
}
