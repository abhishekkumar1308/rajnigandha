require("./setupTests"); // Ensure this is correctly pointing to the setup file
const fs = require("fs");
const jwt = require("jsonwebtoken");

describe("Product Feed API (Google and Meta)", () => {
  let token;

  const testProducts = [
    {
      id: "DS522",
      title: "Rajnigandha Pearls ₹ 60.00 - Pack of 5",
      description: "Test Description 1",
      link: "https://rajnigandha.com/buy/product_details.php?pid=DS522",
      condition: "New",
      price: "300 INR",
      availability: "In stock",
      image_link:
        "https://rajnigandha.com/dsg/product_image/Rajnigandha%20Pearls%20Dispenser.png",
      brand: "Rajnigandha",
      google_product_category: 4748,
    },
    {
      id: "DS527",
      title: "Rajnigandha Meetha ₹ 10.00 - Pack of 34",
      description: "Test Description 2",
      link: "https://rajnigandha.com/buy/product_details.php?pid=DS527",
      condition: "New",
      price: "340 INR",
      availability: "In stock",
      image_link:
        "https://rajnigandha.com/dsg/product_image/Meetha%20Pack%202.5g.jpg",
      brand: "Rajnigandha",
      google_product_category: 4748,
    },
  ];

  beforeAll(() => {
    // Clean up the feeds directory before running tests
    const googleFeedPath = "./feeds/google_product_feed.xml";
    const metaFeedPath = "./feeds/meta_product_feed.xml";
    if (process.env.NODE_ENV !== "prod" && process.env.NODE_ENV !== "dev") {
      if (fs.existsSync(googleFeedPath)) {
        fs.unlinkSync(googleFeedPath);
      }

      if (fs.existsSync(metaFeedPath)) {
        fs.unlinkSync(metaFeedPath);
      }
    }

    // Generate a valid JWT token for the tests
    token = jwt.sign({ username: "testuser" }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
  });

  test("should create new XML feeds with the provided products for both Google and Meta", async () => {
    const response = await global.request
      .post("/api/update-feed")
      .set("Authorization", `Bearer ${token}`)
      .send(testProducts);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty(
      "message",
      "Feed updated successfully for both Google and Meta feeds"
    );

    const googleFeedPath = "./feeds/google_product_feed.xml";
    const metaFeedPath = "./feeds/meta_product_feed.xml";

    expect(fs.existsSync(googleFeedPath)).toBe(true);
    expect(fs.existsSync(metaFeedPath)).toBe(true);
  });

  test("should update an existing product in both Google and Meta XML feeds", async () => {
    const updatedProduct = {
      id: "DS522",
      title: "Updated Title for Rajnigandha Pearls",
      description: "Updated Description",
      link: "https://rajnigandha.com/buy/product_details.php?pid=DS522",
      condition: "New",
      price: "350 INR",
      availability: "In stock",
      image_link:
        "https://rajnigandha.com/dsg/product_image/Rajnigandha%20Pearls%20Dispenser.png",
      brand: "Rajnigandha",
      google_product_category: 4748,
    };

    const response = await global.request
      .post("/api/update-feed")
      .set("Authorization", `Bearer ${token}`)
      .send([updatedProduct]);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty(
      "message",
      "Feed updated successfully for both Google and Meta feeds"
    );

    const googleFeedContent = fs.readFileSync(
      "./feeds/google_product_feed.xml",
      "utf8"
    );
    const metaFeedContent = fs.readFileSync(
      "./feeds/meta_product_feed.xml",
      "utf8"
    );

    expect(googleFeedContent).toContain("Updated Title for Rajnigandha Pearls");
    expect(metaFeedContent).toContain("Updated Title for Rajnigandha Pearls");
  });
});
