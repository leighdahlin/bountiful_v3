const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;