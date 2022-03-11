const { query, body, param } = require("express-validator");

const { validResult, validateJWT } = require("./commons");
const {
  LOCALE_ENUM,
  DATE_REGEX,
  ORDER_ENUM,
  CURRENCY_ENUM,
  AMENITIES_ENUM,
  THEMES_ENUM,
  ACCOMODATIONS_ENUM,
} = require("../../config/constants");

// LOCALE
const localeIsValid = query("locale")
  .custom(e => {
    if (!LOCALE_ENUM.includes(e)) {
      return false;
    }
    return true;
  })
  .withMessage("locale value its not supported")
  .optional();

// CHECKIN
const checkinDateNotEmpty = query(
  "checkin_date",
  "checkin_date query is required"
).notEmpty();
const checkinDateRegex = query("checkin_date")
  .isString()
  .withMessage("checkin_date query must be a string")
  .custom(value => {
    if (!value.match(DATE_REGEX)) {
      return false;
    }
    return true;
  })
  .withMessage("checkin_date format must be YYYY-MM-DD")
  .optional();

// CHECKOUT
const checkoutDateNotEmpty = query(
  "checkout_date",
  "checkout_date query is required"
).notEmpty();
const checkoutDateRegex = query("checkout_date")
  .isString()
  .withMessage("checkout_date query must be a string")
  .custom(value => {
    if (!value.match(DATE_REGEX)) {
      return false;
    }
    return true;
  })
  .withMessage("checkout_date format must be YYYY-MM-DD")
  .optional();

// LATITUDE
const latitudeNotEmpty = query(
  "latitude",
  "latitude query is required"
).notEmpty();
const latitudeNumeric = query("latitude", "latitude must be a number")
  .isFloat()
  .optional();

// LONGITUDE
const longitudeNotEmpty = query(
  "longitude",
  "longitude query is required"
).notEmpty();
const longitudeNumeric = query("longitude", "longitude must be a number")
  .isFloat()
  .optional();

// SORT
const sortOrderIsValid = query("sort_order")
  .custom(value => {
    if (!ORDER_ENUM.includes(value)) {
      return false;
    }
    return true;
  })
  .withMessage("sort_order value is not supported")
  .optional();

// Currency
const currencyIsValid = query("currency", "currency value its not supported")
  .custom(value => {
    if (!CURRENCY_ENUM.includes(value)) {
      return false;
    }
    return true;
  })
  .optional();

// Amenity
const amenityIdsAreValid = query(
  "amenity_ids",
  "One o more amenity_ids are not supported"
)
  .custom(value => {
    value.split(",").map(e => {
      if (!AMENITIES_ENUM.includes(Number(e))) {
        return false;
      }
    });
    return true;
  })
  .optional();
// Price
const priceMax = query("price_max")
  .isFloat({ min: 1, max: 1000000 })
  .optional();
const priceMin = query("price_min")
  .isFloat({ min: 0, max: 1000000 })
  .optional();
// Theme
const themeIdsAreValid = query(
  "theme_ids",
  "One o more themes_ids are not supported"
)
  .custom(value => {
    value.split(",").forEach(e => {
      if (!THEMES_ENUM.includes(Number(e))) {
        return false;
      }
    });
    return true;
  })
  .optional();
// Accomodation
const accommodationIds = query(
  "accommodation_ids",
  "One o more accommodation_ids are not supported"
)
  .custom(value => {
    value.split(",").forEach(e => {
      if (!ACCOMODATIONS_ENUM.includes(Number(e))) {
        return false;
      }
    });
    return true;
  })
  .optional();
// Childrens
const childrenAges = query(
  "children_ages",
  "One o more children_ages are invalid"
)
  .custom(value => {
    const ages = value?.split(",").map(e => {
      const age = Number(e);
      if (age > 100 || age < 0 || isNaN(age)) {
        return false;
      }
    });
    return true;
  })
  .optional();
// Hotel Id
const hotelIdRequired = query(
  "hotel_id",
  "hotel_id query is not defined"
).notEmpty();
const hotelIdNumeric = query("hotel_id", "hotel_id its not a number")
  .isNumeric()
  .optional();
const adultsNumeric = query(
  "adults_number",
  "adults_number must be a number between 1 and 7"
)
  .isFloat({ min: 1, max: 7 })
  .optional();

exports.hotelListValidation = [
  localeIsValid,
  checkinDateNotEmpty,
  checkinDateRegex,
  checkoutDateNotEmpty,
  checkoutDateRegex,
  adultsNumeric,
  latitudeNotEmpty,
  latitudeNumeric,
  longitudeNotEmpty,
  longitudeNumeric,
  sortOrderIsValid,
  currencyIsValid,
  amenityIdsAreValid,
  priceMax,
  priceMin,
  themeIdsAreValid,
  accommodationIds,
  childrenAges,
  validResult,
];
exports.hotelDetailsValidations = [
  localeIsValid,
  checkinDateNotEmpty,
  checkinDateRegex,
  adultsNumeric,
  checkoutDateNotEmpty,
  checkoutDateRegex,
  currencyIsValid,
  childrenAges,
  validResult,
];
exports.reviewsValidations = [hotelIdRequired, hotelIdNumeric, validResult];
exports.photosValidations = [hotelIdRequired, hotelIdNumeric, validResult];

const titleRequired = body("title", "title is required").notEmpty();
const titleString = body("title", "title must be an string")
  .isString()
  .optional();
const summaryString = body("summary", "summary must be an string")
  .isString()
  .optional();
const ratingRequired = body("rating", "rating is required").notEmpty();
const ratingNumeric = body("rating", "rating must be a number between 1 & 10")
  .isFloat({ min: 1, max: 10 })
  .optional();
const reviewIdParamRequired = param("reviewId")
  .notEmpty()
  .withMessage("param hotel id is required");

exports.createReviewValidations = [
  validateJWT,
  hotelIdRequired,
  hotelIdNumeric,
  titleRequired,
  titleString,
  summaryString,
  ratingRequired,
  ratingNumeric,
  validResult,
];
exports.editReviewValidations = [
  validateJWT,
  reviewIdParamRequired,
  titleString,
  summaryString,
  ratingNumeric,
  validResult,
];
exports.deleteReviewValidations = [
  validateJWT,
  reviewIdParamRequired,
  validResult,
];
exports.hotelReservationValidations = [
  validateJWT,
  hotelIdRequired,
  hotelIdNumeric,
  validResult,
];
