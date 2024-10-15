const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const logger = require("./utils/logger");
const errorHandler = require("./utils/errorHandler");
const feedRoutes = require("./routes/feedRoutes");
const logRequestsAndResponses = require("./utils/logRequestsAndResponses");
const env = process.env.NODE_ENV || "production";
dotenv.config({ path: path.resolve(__dirname, `./config/env/.env.${env}`) });

const app = express();

morgan.token("host", (req) => req.hostname);

const morganFormat =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms';
app.use(
  morgan(morganFormat, {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

app.use(express.json());
app.use(logRequestsAndResponses);
app.use(helmet());
app.use(cors());
app.use("/api", feedRoutes);
app.use(errorHandler);

module.exports = { app, express, path };
