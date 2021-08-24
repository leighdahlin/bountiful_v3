const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    category_name: {
    type: String,
    required: true,
  },
});

// type: DataTypes.ENUM('fruits', 'vegetables', 'herbs', 'dairy', 'flowers'),
//Add these in for type!!!

const Category = model('Category', categorySchema);

module.exports = Category;