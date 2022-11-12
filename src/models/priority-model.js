const mongoose = require("mongoose");
const {Schema} = mongoose;

const {ObjectId} = mongoose.Schema.Types;

const prioritySchema = Schema(
  {
    value: {
      type: Number,
      unique: true,
      required: [true, "priority value is required"],
    },
  },
  {timestamps: true}
);

const Priority = mongoose.model("priority", prioritySchema);

module.exports = Priority;
