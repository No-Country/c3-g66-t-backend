const Success = require("../helpers/SuccessResponse");
const ErrorResponse = require("../helpers/ErrorResponse");

exports.login = (req, res, next) => {
  try {
    res.status(200).json(new Success(200, "Login Success", "data"));
  } catch (error) {
    next(
      new ErrorResponse(
        error.code || 500,
        error.message || "Login Failed",
        error.data || "Something went wrong"
      )
    );
  }
};

exports.register = (req, res, next) => {
  try {
    res.status(200).json(new Success(200, "Register Success", "data"));
  } catch (error) {
    next(
      new ErrorResponse(
        error.code || 500,
        error.message || "Register Failed",
        error.data || "Something went wrong"
      )
    );
  }
};
