// authFeedsMiddleware.js

function authorizeFeedsAccess(req, res, next) {
  // Extract the referer and user-agent headers
  const referer = req.get("referer") || "";
  const userAgent = req.get("user-agent") || "";

  // Define allowed sources: referer domains and user agents
  const allowedReferers = ["google.com", "facebook.com", "fb.com"];
  const allowedUserAgents = ["Googlebot", "facebookexternalhit"];

  // Check if the referer header is from an allowed domain
  let isAllowed = allowedReferers.some((domain) => referer.includes(domain));

  // Check if the user-agent header matches an allowed bot/crawler
  if (!isAllowed) {
    isAllowed = allowedUserAgents.some((agent) => userAgent.includes(agent));
  }

  // If the request matches one of the allowed sources, allow access
  if (isAllowed) {
    next();
  } else {
    // Otherwise, deny access
    res
      .status(403)
      .send("Forbidden: You are not authorized to access this resource.");
  }
}

module.exports = authorizeFeedsAccess;
