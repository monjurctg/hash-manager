const Projects = require("../models/project-model");

let projectService = {};

projectService.createProject = (project) => {
  return new Projects(project).save();
};
projectService.getProjects = (filters, queries) => {
  return Projects.find({});
};

module.exports = projectService;
