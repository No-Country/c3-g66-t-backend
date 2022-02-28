const { body, param } = require("express-validator");

const { validResult, validateJWT } = require("./commons");

const titleRequired = body("title", "title is required").notEmpty();
const titleString = body("title")
  .isString()
  .withMessage("title must be an string")
  .optional();
const ratingRequired = body("rating", "rating required").notEmpty();
const ratingNumeric = body("rating")
  .isNumeric()
  .withMessage("rating must be a number")
  .optional();
const hotelRequired = body("hotel", "hotel required").notEmpty();
const hotelNumeric = body("hotel").isNumeric().withMessage().optional();
const summaryString = body("summary")
  .isString()
  .withMessage("summary must be an string")
  .optional();

exports.createReviewValidations = [
  validateJWT,
  titleRequired,
  titleString,
  ratingRequired,
  ratingNumeric,
  hotelRequired,
  hotelNumeric,
  summaryString,
  validResult,
];

exports.editReviewValidations = [];
exports.deleteReviewValidations = [];
