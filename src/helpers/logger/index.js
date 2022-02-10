const winston = require("winston");
const { logger } = require("../../config");

const transports = [new winston.transports.Console()];

module.exports = winston.createLogger({
  level: logger.level,
  format: winston.format.simple(),
  transports,
});
