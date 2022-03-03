const Review = require("../models/HotelReview");
const ErrorResponse = require("../helpers/ErrorResponse");

class Reviews {
  async find(hotelId) {
    const reviews = await Review.find({ hotel: hotelId }).populate(
      "user",
      "firstname lastname img _id"
    );
    return reviews;
  }

  async create(user, hotel, body) {
    try {
      const { title, rating, summary } = body;

      const newReview = await Review.create({
        hotel,
        title,
        rating,
        summary,
        user: user._id,
      });

      return {
        _id: newReview._id,
        hotel: newReview.hotel,
        title: newReview.title,
        rating: newReview.rating,
        summary: newReview.summary,
        postedOn: newReview.createdAt,
        user: {
          _id: user._id,
          name: `${user.firstname} ${user.lastname}`,
          img: user.img,
        },
      };
    } catch (error) {
      throw new ErrorResponse(
        error.code || undefined,
        error.message || undefined,
        error.data
      );
    }
  }
  async edit(user, id, update) {
    try {
      const query = await Review.findById(id).exec(async (err, review) => {
        if (err) {
          throw new ErrorResponse(undefined, undefined, err.message);
        }
        if (user._id !== review.user) {
          throw new ErrorResponse(undefined, undefined, "Unauthorized user");
        }
        console.log(review);
        // await review.save();
      });
      console.log(query);
    } catch (error) {
      throw new ErrorResponse(
        undefined,
        undefined,
        error.data || error.message
      );
    }
  }
  async delete(user, id) {
    try {
      await Review.findById(id);
    } catch (error) {
      throw new ErrorResponse(
        error.code || 500,
        error.message || "Something went wrong",
        error.data
      );
    }
  }
}

module.exports = new Reviews();
