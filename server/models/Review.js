const { Schema, model } = require('mongoose');
//const dateFormat = require('../utils/dateFormat');

const reviewSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  
  body: {
        type: String,
        required: true,
    },
  createdAt: {
    type: String,
    default: Date.now,
  },
  reviewee: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
});

const Review = model('Review', reviewSchema);

module.exports = Review;