import { verifyAccessToken } from "../util/token.js";

export default function verifyUser(req, res, next) {
  try {
    const incomingHeader = req.headers.authorization;
    const incomingAccessToken = incomingHeader?.split(" ")[1] || "";
    if (!incomingAccessToken) {
      return res.status(401).json({ msg: "Invalid credentials from user." });
    }
    const decoded = verifyAccessToken(incomingAccessToken);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("ERROR: ", error);
    if ((error.name = "TokenExpiredError")) {
      return res.status(401).json({ msg: "Token expired." });
    }
    return res.status(401).json({ msg: "Invalid token from user." });
  }
}
