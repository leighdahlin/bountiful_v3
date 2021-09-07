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
    //default: Date.now,
    //get: (timestamp) => dateFormat(timestamp),
  },
  users: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
],
});

const Review = model('Review', reviewSchema);

module.exports = Review;