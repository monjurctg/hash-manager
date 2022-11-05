const Priority = require("../models/priority-model");

let priorityService = {};

priorityService.createPriority = (priority) => {
  return new Priority(priority).save();
};
priorityService.getPriority = (filters, queries) => {
  return Priority.find({}).select("name value ");
};

module.exports = priorityService;
