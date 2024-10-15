// utils/authFeedsMiddleware.js
const auth = require("basic-auth");
// Credentials for authentication
const USERNAME = process.env.FEED_USERNAME || "your-username";
const PASSWORD = process.env.FEED_PASSWORD || "your-password";

// Middleware function for basic authentication
function authorizeFeedsAccess(req, res, next) {
  const user = auth(req);
  // Check if username and password are correct
  if (!(user && user.name === USERNAME && user.pass === PASSWORD)) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid access token" });
  }
  next(); // Proceed to the next middleware or route handler if authentication succeeds
}

module.exports = authorizeFeedsAccess;
