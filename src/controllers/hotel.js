const Success = require("../helpers/SuccessResponse");
const ErrorResponse = require("../helpers/ErrorResponse");
const HotelService = require("../services/Hotel");
const Hotel = require("../services/Hotel");

exports.list = async (req, res, next) => {
  try {
    const data = await HotelService.getList(req.query);

    const resData = data.map(e => {
      return {
        id: e.id,
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
    HotelService._clearQuerys();

    res.status(200).json(new Success(200, "Hotels List Finded", resData));
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(error.code, error.message, error.data));
  }
};

exports.photos = async (req, res, next) => {
  try {
    const data = await HotelService.getPhotoById(req.query);

    const resData = data.map(e => {
      return {
        id: e.imageId,
        image_url: e.mainUrl,
      };
    });

    HotelService._clearQuerys();

    res.status(200).json(new Success(200, "Hotels Photos Finded", resData));
  } catch (error) {
    next(new ErrorResponse(error.code, error.message, error.data));
  }
};

exports.reviews = async (req, res, next) => {
  try {
    const data = await HotelService.getReviewsById(req.query);

    /*const resData = data.map(e => {
      return {
        id: e.imageId,
        image_url: e.mainUrl,
      };
    });*/

    HotelService._clearQuerys();

    res.status(200).json(new Success(200, "Hotels Reviews Finded", data));
  } catch (error) {
    next(new ErrorResponse(error.code, error.message, error.data));
  }
};
