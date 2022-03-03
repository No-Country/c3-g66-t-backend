const Success = require("../helpers/SuccessResponse");
const ErrorResponse = require("../helpers/ErrorResponse");
const HotelService = require("../services/Hotel");

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
    console.log(error);
    next(new ErrorResponse(error.code, error.message, error.data));
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
