import RefreshToken from "../model/RefreshToken.js";
import asyncHandler from "../util/async-handler.js";
import {
  hashToken,
  verifyRefreshToken,
  rotateRefreshToken,
} from "../util/token.js";

const refreshSessionToken = asyncHandler(async function (req, res) {
  const incominSessionToken = req.cookies?.refreshToken || "";
  if (!incominSessionToken) {
    return res.status(401).json({ msg: "Invalid credentials from user." });
  }
  let decoded;
  try {
    decoded = verifyRefreshToken(incominSessionToken);
  } catch (error) {
    return res.status(401).jsos({ msg: error.message });
  }

  const tokenHash = hashToken(incominSessionToken);

  const tokenDoc = await RefreshToken.find({
    tokenHash,
    user: decoded.userId,
  })
    .populate("user")
    .exec();

  if (!tokenDoc || tokenDoc.length === 0) {
    return res
      .status(401)
      .json({ msg: "Could not find any document in the db." });
  }

  if (tokenDoc[0].revokedAt) {
    return res.status(401).json({ message: "Token has been already used." });
  }

  if (tokenDoc[0].expiresAt < new Date()) {
    res.status(401).json({ message: "Token has expired." });
  }

  const result = await rotateRefreshToken(
    req,
    res,
    tokenDoc[0],
    tokenDoc[0].user
  );
  return res.json({
    accessToken: result.accessToken,
    user: {
      userId: tokenDoc[0].user._id.toString(),
      userName: tokenDoc[0].user.name.toString(),
    },
  });
});

export default refreshSessionToken;
