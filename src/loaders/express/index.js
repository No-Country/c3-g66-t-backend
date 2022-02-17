const express = require("express");
const process = require("process");
const morgan = require("morgan");
const cors = require("cors");
const logger = require("../../helpers/logger");
const Success = require("../../helpers/SuccessResponse");
const { port, api } = require("../../config");

class ExpressServer {
  constructor() {
    this.app = express();
    this.port = port;
    this.prefix = api.prefix;
    this._middlewares();
    this._routes();
    this._errorHandler();
  }

  _middlewares() {
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use(cors());
  }
  _routes() {
    this.app.head("/status", (req, res) => {
      res.status(200).end();
    });
    this.app.use(`${this.prefix}/auth`, require("../../routes/auth"));
    this.app.use(`${this.prefix}/location`, require("../../routes/location"));
    // Esta ruta tiene que estar siempre al ultimo
    this.app.use("*", (req, res) => {
      res
        .status(404)
        .json(new Success(404, "Not Found", "Route not regitered"));
    });
  }

  _errorHandler() {
    this.app.use(require("../../middlewares/errorHandler"));
  }

  async start() {
    this.app.listen(this.port, err => {
      if (err) {
        logger.error(err);
        process.env(1);
        return;
      }
    });
  }
}

module.exports = new ExpressServer();
