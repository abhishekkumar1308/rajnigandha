const fs = require("fs");
const xml2js = require("xml2js");

const FEEDS_DIR = "./feeds";

function initializeFeedsDir() {
  if (!fs.existsSync(FEEDS_DIR)) {
    fs.mkdirSync(FEEDS_DIR, { recursive: true });
  }
}

function buildXML(xmlData) {
  const builder = new xml2js.Builder({ headless: true });
  return builder.buildObject(xmlData);
}

module.exports = { initializeFeedsDir, buildXML };
