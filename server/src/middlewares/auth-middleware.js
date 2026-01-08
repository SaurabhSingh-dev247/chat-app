import { TokenExpiredError } from "jsonwebtoken";
import { verifyAccessToken } from "../util/token.js";

export default function verifyUser(req, res, next) {
  try {
    const incomingAccessToken = req.headers.autthorization.split(" ")[1] || "";

    if (!incomingAccessToken) {
      res.status(401).json({ msg: "Invalid credentials" });
      return;
    }
    const decoded = verifyAccessToken(incomingAccessToken);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === TokenExpiredError) {
      res.status(401).json({ msg: "Token expired." });
      return;
    }

    res.status(401).json({ msg: "Ivalid token from client." });
    return;
  }
}
