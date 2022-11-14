const Tasks = require("../models/task-model");

let taskServices = {};

taskServices.createTask = (task) => {
  return new Tasks(task).save();
};
taskServices.getTasks = (filters, queries) => {
  return Tasks.find({}).populate("assigned_by", "name phone email role");
};
taskServices.inProgress = (id) => {
  return Tasks.findByIdAndUpdate({_id: id}, {status: "in_progress"});
};
taskServices.taskComplete = (id) => {
  return Tasks.findByIdAndUpdate({_id: id}, {status: "complete"});
};

module.exports = taskServices;
