const mongoose = require("mongoose");
const {Schema} = mongoose;

const {ObjectId} = mongoose.Schema.Types;

const prioritySchema = Schema(
  {
    name: {
      type: String,
      required: [true, "priority name is required"],
      trim: true,
    },
    value: {
      type: Number,
      required: [true, "priority value is required"],
    },
  },
  {timestamps: true}
);

const Priority = mongoose.model("priority", prioritySchema);

module.exports = Priority;
