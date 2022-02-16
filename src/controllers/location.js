const Success = require("../helpers/SuccessResponse");
const ErrorResponse = require("../helpers/ErrorResponse");
const LocationService = require("../services/Location");

exports.getLocation = async (req, res, next) => {
  try {
    const data = await LocationService.search(req.params.location);
    res.status(200).json(new Success(200, "Locations Finded", "data"));
  } catch (error) {
    next(
      new ErrorResponse(
        error.code || 500,
        error.message || "Couldn't find the location",
        error.data || "Something went wrong"
      )
    );
  }
};
