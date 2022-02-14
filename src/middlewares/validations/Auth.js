const { body } = require("express-validator");
const { validResult, emailIsUniqueCheck } = require("./commons");

const firstnameRequired = body("firstname")
  .notEmpty()
  .withMessage("Firstname is required");
const firstnameString = body("firstname")
  .isString()
  .withMessage("Firstname must be a string")
  .isLength({ max: 30 })
  .withMessage("Firstname only allow 30 letters")
  .optional();
const lastnameRequired = body("lastname")
  .notEmpty()
  .withMessage("Lastname is required");
const lastnameString = body("firstname")
  .isString()
  .withMessage("Lastname must be a string")
  .isLength({ max: 30 })
  .withMessage("Lastname only allow 30 letters")
  .optional();
const dniNumeric = body("dni")
  .isString()
  .withMessage("DNI must be an string")
  .isLength({ max: 30 })
  .withMessage("DNI max length is 30 chars")
  .optional();
const emailRequired = body("email").notEmpty().withMessage("Email is required");
const emailIsEmail = body("email")
  .isEmail()
  .withMessage("Please provide a valid email")
  .optional();
const emailIsUnique = body("email")
  .custom(emailIsUniqueCheck)
  .withMessage("email is already taken")
  .optional();
const phoneString = body("phone")
  .isString()
  .withMessage("phone must be a string")
  .optional();
const passwordRequired = body("password")
  .notEmpty()
  .withMessage("password is required");
const passwordString = body("password")
  .isString()
  .withMessage("password must be a string")
  .optional();
const imgRequired = body("img").notEmpty().withMessage("img is required");
const imgUrl = body("img").isURL().withMessage("img must be an url").optional();

exports.registerValidations = [
  firstnameRequired,
  firstnameString,
  lastnameRequired,
  lastnameString,
  dniNumeric,
  emailRequired,
  emailIsEmail,
  emailIsUnique,
  phoneString,
  passwordRequired,
  passwordString,
  imgRequired,
  imgUrl,
  validResult,
];

exports.loginValidations = [
  emailRequired,
  emailIsEmail,
  passwordRequired,
  passwordString,
  validResult,
];
