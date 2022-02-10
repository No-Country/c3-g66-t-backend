const logger = require("../helpers/logger");
require("colors");

module.exports = (err, req, res, next) => {
  const code = err.code;

  logger.error(`${code} - ${err.message} - ${req.originalUrl} - ${req.ip}`.red);
  logger.error(`${err.stack}`);

  res.status(code).json({
    error: {
      code,
      message: err.message,
      data: err.data,
    },
  });
};
