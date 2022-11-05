const express = require("express");

const userControllers = require("../../controllers/user-controllers");
const checkAuth = require("../../middlewares/checkAuth");
const useQueries = require("../../middlewares/useQueries");

const router = express.Router();

// all route of user
router
  .route("/users")
  .post(userControllers.addUser)
  .get(checkAuth, useQueries, userControllers.getUsers);

//   single useer
router.post("/login", userControllers.login);
router
  .route("users/:id")
  .patch((req, res) => {})
  .delete((req, res) => {})
  .get((req, res) => {});

// export router
module.exports = router;
