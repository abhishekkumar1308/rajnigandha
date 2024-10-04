const SECRET_KEY = process.env.FEED_SECRET_KEY;

function verifyClientKey(req, res, next) {
  const clientKey = req.headers["x-secret-key"];
  if (!clientKey || clientKey !== SECRET_KEY) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid certificate key" });
  }

  next();
}

module.exports = verifyClientKey;
