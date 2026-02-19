import asyncHandler from "../util/async-handler.js";
import { hashToken, verifyRefreshToken } from "../util/token.js";
import RefreshToken from "../model/RefreshToken.js";
import User from "../model/User.js";

const logoutUser = asyncHandler(async (req, res) => {
  const incomingToken = req.cookies?.refreshToken || "";
  if (!incomingToken) {
    return res.status(401).json({ message: "Invalid token." });
  }
  let decoded;
  try {
    decoded = verifyRefreshToken(incomingToken);
  } catch (error) {
    return res.status(401).json({ msg: error.message });
  }

  const tokenHash = hashToken(incomingToken);
  const tokenDoc = await RefreshToken.findOne({
    tokenHash: tokenHash,
    user: decoded.userId,
    jti: decoded.jti,
  }).exec();

  if (tokenDoc && !tokenDoc.revokedAt) {
    tokenDoc.revokedAt = new Date();
    await tokenDoc.save();
  }

  await User.findByIdAndUpdate(
    decoded.userId,
    {
      $set: {
        status: "away",
        lastSeen: new Date(),
        isActive: false,
      },
    },
    {
      runValidators: true,
    },
  );

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  return res.json({ msg: "User logged out successfully." });
});

export default logoutUser;
