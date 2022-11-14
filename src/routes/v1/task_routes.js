const express = require("express");
const taskControllers = require("../../controllers/task-controllers");

const router = express.Router();

router.route("/").post(taskControllers.addtask).get(taskControllers.getTasks);
router.route("/in_progress/:id").patch(taskControllers.gotoInprogress);
router.route("/complete/:id").patch(taskControllers.gotoComplete);

module.exports = router;
