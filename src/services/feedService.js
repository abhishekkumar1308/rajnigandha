const fs = require("fs");
const xml2js = require("xml2js");
const FeedModel = require("../models/feedModel");
const { buildXML, initializeFeedsDir } = require("../utils/xmlHelper");

const GOOGLE_FEED_FILE = "./feeds/google_product_feed.xml";
const META_FEED_FILE = "./feeds/meta_product_feed.xml";

class FeedService {
  static async updateFeed(products) {
    initializeFeedsDir();
    const googleFeedPromise = this.updateOrCreateFeed(
      products,
      GOOGLE_FEED_FILE,
      this.initializeGoogleXML,
      "google"
    );
    const metaFeedPromise = this.updateOrCreateFeed(
      products,
      META_FEED_FILE,
      this.initializeMetaXML,
      "meta"
    );

    return Promise.all([googleFeedPromise, metaFeedPromise]);
  }

  static async updateOrCreateFeed(
    products,
    filePath,
    initializeXMLFn,
    feedType
  ) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        let xmlData;

        if (err && err.code === "ENOENT") {
          xmlData = initializeXMLFn();
        } else if (err) {
          return reject(new Error("Failed to read the XML file"));
        } else {
          xml2js.parseString(data, (parseErr, result) => {
            if (parseErr)
              return reject(new Error("Failed to parse the XML file"));
            xmlData = result;
          });
        }

        products.forEach((productData) => {
          const product = new FeedModel(productData);
          xmlData = this.updateOrAddProduct(xmlData, product, feedType);
        });

        const newXml = buildXML(xmlData);
        fs.writeFile(filePath, newXml, (writeErr) => {
          if (writeErr) return reject(new Error("Failed to save the XML file"));
          resolve("Feed updated successfully");
        });
      });
    });
  }

  static initializeGoogleXML() {
    return {
      rss: {
        $: {
          "xmlns:g": "http://base.google.com/ns/1.0",
          version: "2.0",
        },
        channel: [
          {
            title: "DS Group",
            link: "https://www.dsgroup.com/",
            description: "Product feed",
            item: [],
          },
        ],
      },
    };
  }

  static initializeMetaXML() {
    return {
      rss: {
        $: {
          "xmlns:g": "http://base.google.com/ns/1.0",
          version: "2.0",
        },
        channel: [
          {
            title: "DS Group",
            link: "https://www.dsgroup.com/",
            description: "Product feed",
            item: [],
          },
        ],
      },
    };
  }

  static updateOrAddProduct(xmlData, product, feedType) {
    if (
      !product.id ||
      product.id.trim() === "" ||
      !product.title ||
      product.title.trim() === ""
    ) {
      console.warn(
        "Skipping product due to missing or empty id or title:",
        product
      );
      return xmlData;
    }

    // Ensure product.availability is a lowercase string
    if (product.availability) {
      product.availability = product.availability.toLowerCase();
    }
    let imageLink = "";
    if (feedType === "meta") {
      imageLink = `${
        process.env.BASE_URL || "https://feeds.rajnigandhas.com"
      }/ds-m/${product.id.toLowerCase()}.png`;
    } else if (feedType === "google") {
      imageLink = `${
        process.env.BASE_URL || "https://feeds.rajnigandhas.com"
      }/ds-g/${product.id.toLowerCase()}.png`;
    } else {
      imageLink = product.image_link;
    }
    product.image_link = imageLink;
    const items = xmlData.rss.channel[0].item || [];
    const existingProductIndex = items.findIndex(
      (item) => item["g:id"][0] === product.id
    );

    if (existingProductIndex > -1) {
      items[existingProductIndex] = product.toXML();
    } else {
      items.push(product.toXML());
    }

    xmlData.rss.channel[0].item = items;
    return xmlData;
  }
}

module.exports = FeedService;
