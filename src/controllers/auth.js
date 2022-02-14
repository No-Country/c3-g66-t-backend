const Success = require("../helpers/SuccessResponse");
const ErrorResponse = require("../helpers/ErrorResponse");
const AuthService = require("../services/Auth");

exports.login = async (req, res, next) => {
  try {
    const data = await AuthService.login(req.body.email, req.body.password);
    res.status(200).json(new Success(200, "Login Success", data));
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

exports.register = async (req, res, next) => {
  try {
    const { firstname, lastname, dni, email, phone, password, img } = req.body;
    const data = await AuthService.register({
      firstname,
      lastname,
      dni,
      email,
      phone,
      password,
      img,
    });
    res.status(201).json(new Success(201, "Register Success", data));
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
