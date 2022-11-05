const express = require("express");
const projectControllers = require("../../controllers/project-controllers");

const router = express.Router();

router
  .route("/")
  .post(projectControllers.addProject)
  .get(projectControllers.getProjects);
module.exports = router;
