const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    category_name: {
    type: String,
    enum: ['fruits', 'vegetables', 'herbs', 'dairy', 'flowers'],
    required: true,
  },
});


const Category = model('Category', categorySchema);

module.exports = Category;