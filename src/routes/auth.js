const { Router } = require("express");
const { registerValidations } = require("../middlewares/validations/Auth");
const { register } = require("../controllers/auth");

const router = Router();
router.route("/login");
router.route("/register").post(registerValidations, register);

module.exports = router;
