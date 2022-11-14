const mongoose = require("mongoose");
const {Schema} = mongoose;

const {ObjectId} = mongoose.Schema.Types;

const taskSchema = Schema(
  {
    task_name: {
      type: String,
      required: [true, "Role name is required"],
      trim: true,
    },
    task_description: {
      type: String,

      trim: true,
    },
    assigned_by: {
      type: ObjectId,
      ref: "users",
      required: [true, "assigned_by id required"],
    },
    images: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      enum: ["in_complete", "in_progress", "complete"],
      default: "in_complete",
    },
    task_piority: {
      type: String,
      enum: ["urgent", "less_urgent", "normal"],
      required: [true, "task_piority is required "],
    },
    user_id: {
      type: ObjectId,
      ref: "users",
      required: [true, "user_id is required"],
    },
    project_name: {
      type: String,
      required: [true, "project name is required"],
      trim: true,
    },
    deadline: {
      type: String,
      required: [true, "deadline  is required"],
      trim: true,
    },
  },
  {timestamps: true}
);

const Tasks = mongoose.model("tasks", taskSchema);

module.exports = Tasks;
