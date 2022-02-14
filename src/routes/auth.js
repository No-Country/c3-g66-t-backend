const { Router } = require("express");
const {
  registerValidations,
  loginValidations,
} = require("../middlewares/validations/Auth");
const { register, login } = require("../controllers/auth");

const router = Router();
router.route("/login").post(loginValidations, login);
router.route("/register").post(registerValidations, register);

module.exports = router;
