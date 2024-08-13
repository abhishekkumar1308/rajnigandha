const FeedService = require("../services/feedService");

class FeedController {
  static async updateFeed(req, res) {
    try {
      const products = req.body;
      if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: "Invalid JSON payload" });
      }

      const result = await FeedService.updateFeed(products);
      // res.json({ message: result });
      res.json({
        message: "Feed updated successfully for both Google and Meta feeds",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = FeedController;
