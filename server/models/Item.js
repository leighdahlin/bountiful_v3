const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
    title: {
    type: String,
    required: true,
  },
  item_name: {
    type: String,
    required: true,
  },
  item_description: {
    type: String,
    required: true,
  },
  item_quantity: {
    type: Number,
    required: true,
  },
  item_unit: {
    type: String,
    required: true,
  },
  item_price: {
    type: Number,
    required: true,
  },
  category_name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    },
    
  // categories: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Category',
  //   },
  // ],
});


const Item = model('Item', itemSchema);

module.exports = Item;