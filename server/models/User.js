const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const Order = require('./Order');
//const dateFormat = require('../utils/dateFormat');

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must have valid email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  signedRequest: {
    type: String,
  },
  picURL: {
    type: String,
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  orders: [Order.schema]
});

// middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
