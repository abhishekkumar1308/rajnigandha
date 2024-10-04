const express = require("express");
const dotenv = require("dotenv");
const feedRoutes = require("./routes/feedRoutes");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");

const env = process.env.NODE_ENV || "production";
dotenv.config({ path: path.resolve(__dirname, `./config/env/.env.${env}`) });

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

app.use("/api", feedRoutes);

module.exports = { app,express };
