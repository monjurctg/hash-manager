const mongoose = require("mongoose");
const {Schema} = mongoose;
const validator = require("validator");
const {ObjectId} = mongoose.Schema.Types;

const userSchema = Schema({
  name: {
    type: String,
    required: [true, "username is required"],

    trim: true,
  },
  imgURL: {
    type: String,
    validate: [validator.isURL, "Please provide a valid url"],
  },
  phone: {
    type: String,
    required: [true, "Please provide a phone"],
    unique: [true, "phone number already exist"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],

    unique: [true, "email already exist"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["CEO", "CTO", "TEAMLEAD", "DEV"],
    default: "DEV",
  },

  todos: [
    {
      type: ObjectId,
      ref: "todos",
    },
  ],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
