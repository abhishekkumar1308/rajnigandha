const express = require("express");
const dotenv = require("dotenv");
const feedRoutes = require("./routes/feedRoutes");

dotenv.config();

const app = express();
const path = require("path");

// Load environment variables
const env = process.env.NODE_ENV || "prod";
dotenv.config({ path: path.resolve(__dirname, `./config/env/.env.${env}`) });

app.use(express.json());
app.use("/api", feedRoutes);
module.exports = { app, path, express };
