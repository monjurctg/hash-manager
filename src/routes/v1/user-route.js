const express = require("express");
const priorityControllers = require("../../controllers/priority-controllers");
const roleControllers = require("../../controllers/roleControllers");

const userControllers = require("../../controllers/user-controllers");
const checkAuth = require("../../middlewares/checkAuth");
const checkPermission = require("../../middlewares/checkPermission");
const useQueries = require("../../middlewares/useQueries");

const router = express.Router();

router.post("/login", userControllers.login);

// all route of user
router.post("/users/signup", userControllers.addUser);
router.post(
  "/users/invite/:ceo_id/:role_id",
  checkPermission,
  userControllers.addUser
);
router.post("/users/register", userControllers.addUser);

router.route("/users").get(useQueries, userControllers.getUsers);

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

router
  .route("/priority/:id")
  .get()
  .delete(priorityControllers.deleteOne)
  .patch();

// role
router
  .route("/role")
  .post(roleControllers.addrole)
  .get(roleControllers.getRoles);

router.route("/role/:id").delete(roleControllers.deleteOne).patch();

// export router
module.exports = router;
