const { query } = require("express-validator");

const ErrorResponse = require("../../helpers/ErrorResponse");
const { validResult } = require("./commons");
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
const localeIsValid = query("locale", "locale value its not supported")
  .custom(e => {
    if (!LOCALE_ENUM.includes(e)) {
      throw new Error();
    }
  })
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
      throw new Error();
    }
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
      throw new Error();
    }
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
const sortOrderIsValid = query(
  "sort_order",
  "sort_order value is not supported"
)
  .custom(value => {
    if (!ORDER_ENUM.includes(value)) {
      throw new Error();
    }
  })
  .optional();

// Currency
const currencyIsValid = query("currency", "currency value its not supported")
  .custom(value => {
    if (!CURRENCY_ENUM.includes(value)) {
      throw new Error();
    }
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
        throw new Error();
      }
    });
  })
  .optional();
const priceMax = query("price_max")
  .isFloat({ min: 1, max: 1000000 })
  .optional();
const priceMin = query("price_min")
  .isFloat({ min: 0, max: 1000000 })
  .optional();

const themeIdsAreValid = query(
  "theme_ids",
  "One o more themes_ids are not supported"
)
  .custom(value => {
    value.split(",").forEach(e => {
      if (!THEMES_ENUM.includes(Number(e))) {
        throw new Error();
      }
    });
  })
  .optional();

const accommodationIds = query(
  "accommodation_ids",
  "One o more accommodation_ids are not supported"
)
  .custom(value => {
    value.split(",").forEach(e => {
      if (!ACCOMODATIONS_ENUM.includes(Number(e))) {
        throw new Error();
      }
    });
  })
  .optional();

const childrenAges = query(
  "children_ages",
  "One o more children_ages are invalid"
).custom(value => {
  const ages = value.spit(",").map(e => {
    const age = Number(e);
    if (age > 100 || age < 0 || isNaN(age)) {
      throw new Error();
    }
  });
});

exports.hotelListValidation = [
  localeIsValid,
  checkinDateNotEmpty,
  checkinDateRegex,
  checkoutDateNotEmpty,
  checkoutDateRegex,
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
];
