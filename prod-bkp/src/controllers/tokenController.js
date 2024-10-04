const jwt = require("jsonwebtoken");
class TokenController {
  static async generateToken(req, res) {
    try {
      const token = jwt.sign(
        { username: process.env.AUTH_USER },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      res.json({
        message: "Token generated successfully",
        token: token,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = TokenController;
