const taskServices = require("../services/task-services");
const userService = require("../services/user-service");

const taskControllers = {};

taskControllers.addtask = async (req, res, next) => {
  const {user_id} = req.body;
  const newtask = {
    ...req.body,
  };

  taskServices
    .createTask(newtask)
    .then((task) => {
      userService
        .updateUserData({_id: user_id}, {$push: {myTasks: task._id}})
        .then((data) => console.log(data));
      res.status(200).json({
        status: "sucess",
        message: "task add successfully",
      });
    })
    .catch((err) => {
      next(new Error(err));
    });
};

taskControllers.getTasks = async (req, res) => {
  taskServices
    .getTasks()
    .then((result) => res.json({data: result}))
    .catch((err) => res.json({status: "error", error: err.message}));
};

taskControllers.gotoInprogress = (req, res) => {
  taskServices
    .inProgress(req.params.id)
    .then((result) => res.json({message: "task status change successfully"}))
    .catch((err) => res.json({status: "error", error: err.message}));
};
taskControllers.gotoComplete = (req, res) => {
  taskServices
    .taskComplete(req.params.id)
    .then((result) => res.json({message: "task status change successfully"}))
    .catch((err) => res.json({status: "error", error: err.message}));
};

module.exports = taskControllers;
