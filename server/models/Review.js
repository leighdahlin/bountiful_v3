const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  reviewTitle: {
    type: String,
    required: true,
  },
  reviewContent: {
    type: String,
    required: false,
  },
  starRating: {
    type: Number,
    required: true,
  },
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviewee: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Review = model("Review", reviewSchema);

module.exports = Review;
