const FeedService = require("../services/feedService");

class FeedController {
  static async updateFeed(req, res) {
    try {
      const products = req.body;
      const requiredKeys = [
        "id",
        "title",
        "description",
        "link",
        "condition",
        "price",
        "sale_price",
        "availability",
        "image_link",
        "gtin",
        "brand",
        "google_product_category",
      ];
      if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: "Invalid JSON payload" });
      }
      // Check that each product has the required keys
      const isValid = products.every((product) =>
        requiredKeys.every((key) => product.hasOwnProperty(key))
      );

      if (!isValid) {
        return res
          .status(400)
          .json({ error: "Invalid JSON payload, missing required inputs" });
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
