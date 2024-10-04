const express = require("express");
const FeedController = require("../controllers/feedController");
const TokenController = require("../controllers/tokenController");
const authenticateToken = require("../utils/authMiddleware");
const authenticateClientKey = require("../utils/clientKeyMiddleware");

const router = express.Router();

router.post("/update-feed", authenticateToken, FeedController.updateFeed);
router.get("/token", authenticateClientKey, TokenController.generateToken);

module.exports = router;
