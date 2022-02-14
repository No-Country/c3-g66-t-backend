const process = require("process");
require("dotenv").config();

const dbEnv = {
  production: process.env.MONGODB_URI_PROD,
  development: process.env.MONGODB_URI_DEV,
  test: process.env.MONGODB_URI_TEST,
};

module.exports = {
  port: process.env.PORT || 3000,
  api: {
    prefix: "/api/v1",
  },
  logger: {
    level: process.env.LOG_LEVEL || "info",
  },
  db: { url: dbEnv[process.env.NODE_ENV] },
  jwt: {
    secret: process.env.JWT_SECRET_KEY || "s3cr3t",
    expires: process.env.JWT_EXPIRE || "5m",
  },
};
