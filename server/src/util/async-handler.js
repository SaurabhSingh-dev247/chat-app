export default function asyncHandler(fn) {
  return async function (req, res) {
    try {
      const result = await fn(req, res);
      return result;
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Internal server error." });
    }
  };
}
