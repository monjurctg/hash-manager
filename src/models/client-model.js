const mongoose = require("mongoose");
const {Schema} = mongoose;
const validator = require("validator");
const {ObjectId} = mongoose.Schema.Types;

const clientsSchema = Schema(
  {
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
    projects: [
      {
        type: ObjectId,
        ref: "projects",
      },
    ],
  },
  {timestamps: true}
);

const Clients = mongoose.model("clients", clientsSchema);

module.exports = Clients;
