const mongoose = require("mongoose");
const {Schema} = mongoose;

const {ObjectId} = mongoose.Schema.Types;

const rolesSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Role name is required"],
      trim: true,
    },
    role_Priority: {
      type: ObjectId,
      required: [true, "Role priority id  is required"],
      ref: "priority",
    },
  },
  {timestamps: true}
);

const Roles = mongoose.model("roles", rolesSchema);

module.exports = Roles;
