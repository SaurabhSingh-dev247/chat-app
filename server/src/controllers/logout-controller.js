import asyncHandler from "../util/async-handler.js";
import { hashToken } from "../util/token.js";
import RefreshToken from "../model/RefreshToken.js";

const logoutUser = asyncHandler(async (req, res) => {
  const incomingToken = req.cookies?.refreshToken || "";
  if (!incomingToken) {
    return res.status(401).json({ message: "Invalid token." });
  }
  const tokenHash = hashToken(incomingToken);
  const tokenDoc = await RefreshToken.findOne({ tokenHash: tokenHash });
  if (tokenDoc && !tokenDoc.revokedAt) {
    tokenDoc.revokedAt = new Date();
    await tokenDoc.save();
  }
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
  return res.json({ msg: "User logged out successfully." });
});

export default logoutUser;