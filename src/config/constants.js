module.exports = {
  LOCALE_ENUM: ["en_US", "es_ES"],
  DATE_REGEX:
    /^((?:19|20)[0-9][0-9])-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/,
  ORDER_ENUM: [
    "STAR_RATING_HIGHEST_FIRST",
    "STAR_RATING_LOWEST_FIRST",
    "BEST_SELLER",
    "DISTANCE_FROM_LANDMARK",
    "GUEST_RATING",
    "PRICE_HIGHEST_FIRST",
    "PRICE",
  ],
  CURRENCY_ENUM: ["USD", "EUR", "ARS"],
  AMENITIES_ENUM: [527, 537, 539, 131072, 524288],
  THEMES_ENUM: [18, 6, 4, 14, 8, 25, 26, 2, 22, 15, 1, 28, 27, 19],
  ACCOMODATIONS_ENUM: [20, 15, 5, 43, 11, 24, 30, 4, 12, 1, 8, 3],
};
