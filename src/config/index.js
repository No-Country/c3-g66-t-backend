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
  mapbox: {
    url: process.env.MAPBOX_URL,
    apiKey: process.env.MAPBOX_APIKEY,
  },
  hotels: {
    url:
      process.env.HOTELS_URL ||
      "https://hotels-com-provider.p.rapidapi.com/v1/hotels",
    host: process.env.HOTELS_HOST || "hotels-com-provider.p.rapidapi.com",
    key: process.env.HOTELS_KEY || process.env.API_KEY,
  },
  stripe: {
    secret_key: process.env.STRIPE_SECRET_KEY,
    pusheable_key: process.env.STRIPE_PUSHEABLE_KEY,
  },
};
