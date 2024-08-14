const request = require("supertest");
const path = require("path");
const dotenv = require("dotenv");
const { app } = require("../src/server");

// Check if the environment is production
if (process.env.NODE_ENV === "production") {
  console.error("ERROR: Tests should not be run in a production environment!");
  process.exit(1); // Exit the process with a non-zero exit code to stop the tests
}

// Load environment variables for testing
dotenv.config({ path: path.resolve(__dirname, "../src/config/env/.env.test") });

global.request = request(app);
