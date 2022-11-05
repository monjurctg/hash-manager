const projectService = require("../services/project-services");

const projectControllers = {};

projectControllers.addProject = async (req, res, next) => {
  const newProject = {
    ...req.body,
  };

  projectService
    .createProject(newProject)
    .then(() => {
      res.status(200).json({
        status: "sucess",
        message: "project add successfully",
      });
    })
    .catch((err) => next(new Error(err)));
};

projectControllers.getProjects = async (req, res) => {
  projectService
    .getProjects()
    .then((result) => res.json({result}))
    .catch((err) => res.json({status: "error", error: err.message}));
};

module.exports = projectControllers;
