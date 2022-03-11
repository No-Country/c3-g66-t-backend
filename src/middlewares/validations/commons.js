const { validationResult } = require("express-validator");
const ErrorResponse = require("../../helpers/ErrorResponse");
const User = require("../../models/User");
const AuthService = require("../../services/Auth");
const { DATE_REGEX } = require("../../config/constants");
//    USER / AUTH
exports.emailIsUniqueCheck = async email => {
  const userFound = await User.findOne({ email });
  if (userFound) {
    throw new ErrorResponse(400, undefined, "Email is already taken");
  }
  return true;
};
exports.validateJWT = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const user = await AuthService.validateToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(
      new ErrorResponse(
        err.code || 400,
        err.message || "Can't validate the token",
        err.data || "Please provide a valid token"
      )
    );
  }
};
exports.DateFormat = value => {
  if (!value.match(DATE_REGEX)) {
    return false;
  }
  return true;
};
exports.validResult = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    throw new ErrorResponse(
      400,
      "Validation Error",
      err.array().map(e => e.msg)
    );
  }
  next();
};
