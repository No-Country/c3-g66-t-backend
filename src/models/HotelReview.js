const { Schema, model } = require("mongoose");

const hotelReview = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
    title: { type: String, required: true },
    rating: { type: Number, required: true },
    summary: { type: String },
    hotel: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = model("reviews", hotelReview);
