const { Router } = require("express");
const {
  list,
  photos,
  reviews,
  localReviews,
  createReview,
} = require("../controllers/hotel");
const {
  hotelListValidation,
  photosValidations,
  reviewsValidations,
  createReviewValidations,
} = require("../middlewares/validations/Hotel");

const router = Router();

router.route("/list").get(hotelListValidation, list);
router.route("/photos").get(photosValidations, photos);
router.route("/reviews").get(reviewsValidations, reviews);
router
  .route("/localreviews")
  .get(reviewsValidations, localReviews)
  .post(createReviewValidations, createReview);

module.exports = router;
