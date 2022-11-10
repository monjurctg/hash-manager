const express = require("express");
const priorityControllers = require("../../controllers/priority-controllers");

const userControllers = require("../../controllers/user-controllers");
const checkAuth = require("../../middlewares/checkAuth");
const checkPermission = require("../../middlewares/checkPermission");
const useQueries = require("../../middlewares/useQueries");

const router = express.Router();

router.post("/login", userControllers.login);

// all route of user
router.post("/users/signup", userControllers.addUser);
router.post("/users/signup/:id", checkPermission, userControllers.addUser);

router
  .route("/users")

  .get(checkAuth, useQueries, userControllers.getUsers);

//   single useer
router
  .route("users/:id")
  .patch((req, res) => {})
  .delete((req, res) => {})
  .get((req, res) => {});

// priority

router
  .route("/priority")
  .post(priorityControllers.addPriority)
  .get(priorityControllers.getPriority);

router.route("/priority/:id").get().delete().patch();

// export router
module.exports = router;
