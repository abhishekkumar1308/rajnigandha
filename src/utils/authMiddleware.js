const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const JWT_SECRET = process.env.JWT_SECRET_KEY;
  if (!token) return res.status(401).json({ error: "Unauthorized!" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json({ error: err.message });
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
