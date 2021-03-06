const Success = require("../helpers/SuccessResponse");
const ErrorResponse = require("../helpers/ErrorResponse");
const HotelService = require("../services/Hotel");
const Reviews = require("../services/Reviews");
const Reservations = require("../services/Reservations");

exports.list = async (req, res, next) => {
  try {
    const data = await new HotelService(req.query).getList();

    const resData = data.map(e => {
      return {
        hotel_id: e.id,
        name: e.name,
        starRating: e.starRating,
        address: e.address,
        guestReviews: e.guestReviews,
        ratePlan: e.ratePlan,
        neighbourhood: e.neighbourhood,
        coordinate: e.coordinate,
        thumbnailUrl: e.optimizedThumbUrls,
      };
    });

    res.status(200).json(new Success(200, "Hotels List Finded", resData));
  } catch (error) {
    next(new ErrorResponse(error.code, error.message, error.data));
  }
};

exports.details = async (req, res, next) => {
  try {
    const data = await new HotelService(req.query).getById();
    res.status(200).json(new Success(200, "Hotel Details", data));
  } catch (error) {
    next(
      new ErrorResponse(
        error.code,
        error.message || "Couldn't get hotel details",
        error.data || "Something went wrong"
      )
    );
  }
};

exports.photos = async (req, res, next) => {
  try {
    const data = await new HotelService(req.query).getPhotoById();

    const resData = data.map(e => {
      return {
        id: e.imageId,
        image_url: e.mainUrl,
      };
    });

    res.status(200).json(new Success(200, "Hotels Photos Finded", resData));
  } catch (error) {
    next(new ErrorResponse(error.code, error.message, error.data));
  }
};

exports.reviews = async (req, res, next) => {
  try {
    const data = await new HotelService(req.query).getReviewsById();

    res.status(200).json(new Success(200, "Hotels Reviews Finded", data));
  } catch (error) {
    next(new ErrorResponse(error.code, error.message, error.data));
  }
};

exports.localReviews = async (req, res, next) => {
  try {
    const data = await Reviews.find(req.query.hotel_id);
    res.status(200).json(new Success(200, "Local reviews", data));
  } catch (error) {
    next(new ErrorResponse());
  }
};
exports.createReview = async (req, res, next) => {
  try {
    const { title, rating, summary } = req.body;
    const data = await Reviews.create(req.user, req.query.hotel_id, {
      title,
      rating,
      summary,
    });
    res.status(201).json(new Success(201, "Review created", data));
  } catch (error) {
    next(
      new ErrorResponse(
        error.code,
        error.message || "Couldn't create review",
        error.data || "Something went wrong"
      )
    );
  }
};
exports.editReview = async (req, res, next) => {
  try {
    const { title, summary, rating } = req.body;
    const body = { title, summary, rating };
    const data = await Reviews.edit(req.user, req.params.reviewId, body);
    res.status(200).json(new Success(200, "Review edited", data));
  } catch (error) {
    next(
      new ErrorResponse(
        error.code,
        error.message || "Couldn't edit review",
        error.data || "Something went wrong"
      )
    );
  }
};
exports.deleteReview = async (req, res, next) => {
  try {
    const data = await Reviews.delete(req.user, req.params.reviewId);
    res.status(202).json(new Success(202, "Review Deleted", data));
  } catch (error) {
    next(
      new ErrorResponse(
        error.code || 500,
        error.message || "Couldn't delete review",
        error.data || "Something went wrong"
      )
    );
  }
};

exports.reservPayment = async (req, res, next) => {
  try {
    const { hotel_id, amount, currency, checkin_date, checkout_date } =
      req.body;
    const data = await Reservations.createPayment(req.user, {
      hotel_id,
      amount,
      currency,
      checkin_date,
      checkout_date,
    });
    res.status(202).json(new Success(202, "Reservation success", data));
  } catch (error) {
    next(
      new ErrorResponse(
        error.code || 500,
        error.message || "Couldn't reserve",
        error.data || "Something went wrong"
      )
    );
  }
};
exports.paymentConfirmed = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    const { hotel_id, checkin_date, checkout_date, payment_id } = req.body;

    const data = await Reservations.addUserReservation(userId, {
      hotel_id,
      checkin_date,
      checkout_date,
      payment_id,
    });
    res.status(200).json(new Success(200, "Reservation saved", data));
  } catch (error) {
    next(
      new ErrorResponse(
        error.code || 500,
        error.message || "Couldn't reserve",
        error.data || "Something went wrong"
      )
    );
  }
};
