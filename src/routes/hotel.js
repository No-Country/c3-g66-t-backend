const { Router } = require("express");
const {
  list,
  photos,
  reviews,
  localReviews,
  createReview,
  editReview,
  deleteReview,
  details,
  reservPayment,
  paymentConfirmed,
} = require("../controllers/hotel");
const {
  hotelListValidation,
  photosValidations,
  reviewsValidations,
  createReviewValidations,
  editReviewValidations,
  deleteReviewValidations,
  hotelDetailsValidations,
  hotelReservationValidations,
  paymentValidations,
} = require("../middlewares/validations/Hotel");

const router = Router();

router.route("/list").get(hotelListValidation, list);
router.route("/photos").get(photosValidations, photos);
router.route("/reviews").get(reviewsValidations, reviews);
router.route("/details").get(hotelDetailsValidations, details);
router.route("/reserv").post(hotelReservationValidations, reservPayment);
router.route("/paymentConfimed").post(paymentValidations, paymentConfirmed);
router
  .route("/localreviews")
  .get(reviewsValidations, localReviews)
  .post(createReviewValidations, createReview);
router
  .route("/localreviews/:reviewId")
  .put(editReviewValidations, editReview)
  .delete(deleteReviewValidations, deleteReview);
module.exports = router;
