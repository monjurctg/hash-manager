const Priority = require("../models/priority-model");

let priorityService = {};

priorityService.createPriority = (priority) => {
  return new Priority(priority).save();
};
priorityService.getPriority = (filters, queries) => {
  return Priority.find({}).select("name value ");
};
priorityService.deletePriority = (id) => {
  return Priority.deleteOne({_id: id});
};
priorityService.updatePriority = (id, data) => {
  return Priority.upda({_id: id}, data);
};

module.exports = priorityService;
