const Priority = require("../models/priority-model");

let priorityService = {};

priorityService.createPriority = (priority) => {
  return new Priority(priority).save();
};
priorityService.getPriority = () => {
  return Priority.find({}).select("_id value");
};
priorityService.deletePriority = (id) => {
  return Priority.deleteOne({_id: id});
};
priorityService.updatePriority = (id, data) => {
  return Priority.updateOne({_id: id}, data);
};

module.exports = priorityService;
