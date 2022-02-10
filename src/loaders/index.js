const server = require("./express");
const config = require("../config");
const logger = require("../helpers/logger");
require("colors");
const connectDatabase = require("./database");

module.exports = async () => {
  await server.start();
  logger.info(
    `#####################################\n	Server is listening on PORT: ${config.port}\n      #####################################`
      .cyan
  );
  await connectDatabase();
};
