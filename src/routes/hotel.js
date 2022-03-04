const { Router } = require("express");
const {
  list,
  photos,
  reviews,
  localReviews,
  createReview,
  editReview,
} = require("../controllers/hotel");
const {
  hotelListValidation,
  photosValidations,
  reviewsValidations,
  createReviewValidations,
  editReviewValidations,
} = require("../middlewares/validations/Hotel");

const router = Router();

router.route("/list").get(hotelListValidation, list);
router.route("/photos").get(photosValidations, photos);
router.route("/reviews").get(reviewsValidations, reviews);
router
  .route("/localreviews")
  .get(reviewsValidations, localReviews)
  .post(createReviewValidations, createReview);
router.route("/localreviews/:reviewId").put(editReviewValidations, editReview);
module.exports = router;
