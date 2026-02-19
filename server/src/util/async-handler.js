import { MongoStalePrimaryError } from "mongodb";

export default function asyncHandler(fn) {
  return async function (req, res, next) {
    try {
      const result = await fn(req, res, next);
      return result;
    } catch (error) {
      console.log(error)
      return res.status(500).json({ msg: "Internal server error." });
    }
  };
}
