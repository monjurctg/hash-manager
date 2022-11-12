const priorityService = require("../services/priority-service");

const priorityControllers = {};

priorityControllers.addPriority = async (req, res, next) => {
  const newpriority = {
    ...req.body,
  };

  priorityService
    .createPriority(newpriority)
    .then(() => {
      res.status(200).json({
        status: "sucess",
        message: "priority add successfully",
      });
    })
    .catch((err) => {
      next(new Error(err));
    });
};

priorityControllers.getPriority = async (req, res) => {
  priorityService
    .getPriority()
    .then((result) => res.json({result}))
    .catch((err) => res.json({status: "error", error: err.message}));
};

priorityControllers.deleteOne = async (req, res, next) => {
  const id = req.params.id;
  priorityService
    .deletePriority(id)
    .then(() =>
      res
        .status(200)
        .json({success: true, message: "priority delete successfully"})
    )
    .catch((err) => next(new Error(err)));
};
priorityControllers.updateOne = async (req, res, next) => {};

module.exports = priorityControllers;
