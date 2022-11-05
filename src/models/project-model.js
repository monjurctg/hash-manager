const mongoose = require("mongoose");
const {Schema} = mongoose;
const validator = require("validator");
const {ObjectId} = mongoose.Schema.Types;

const projectSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "project name is required"],
      trim: true,
    },
    docs: [
      {
        type: String,
        validate: [validator.isURL, "Please provide doc a valid url"],
        default: [],
      },
    ],
    deadLine: {
      type: String,
      required: true,
    },

    contributers: [
      {
        type: ObjectId,
        ref: "users",
      },
    ],

    client: {
      required: true,
      type: ObjectId,
      ref: "clients",
    },

    completed: Boolean,
  },
  {timestamps: true}
);

const Projects = mongoose.model("projects", projectSchema);

module.exports = Projects;
