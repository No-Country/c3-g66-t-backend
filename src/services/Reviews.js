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
  /**
   * Edit an review and return the new review
   * @param {Object} user The user document.
   * @param {String} id The hotel of the id
   * @param {Object} update The fields you want to update
   * @returns
   */
  async edit(user, id, update) {
    const data = await Review.findById(id)
      .exec()
      .then(review => {
        if (!review) {
          throw new ErrorResponse(204, "No Content", "Review doesn't exist");
        }
        if (user._id.toString() !== review.user.toString()) {
          throw new ErrorResponse(401, undefined, "Unauthorized user");
        }
        Object.keys(update).forEach(key => {
          (update[key] === undefined || update[key] === "") &&
            delete update[key];
          update[key] ? (review[key] = update[key]) : null;
        });
        return review.save();
      })
      .then(review => review.populate("user", "firstname lastname img _id"))
      .catch(err => {
        throw new ErrorResponse(undefined, undefined, err.message);
      });
    return data;
  }

  async delete(user, id) {
    try {
      await Review.findById(id)
        .exec()
        .then(review => {
          if (!review) {
            throw new ErrorResponse(204, "No Content", "Review doesn't exist");
          }
          if (user._id.toString() !== review.user.toString()) {
            throw new ErrorResponse(undefined, undefined, "Unauthorized user");
          }
          return review.remove();
        });
      return `Review ${id} deleted`;
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
