const User = require("../models/user-model");
const userService = require("../services/user-service");

module.exports = async function (req, res, next) {
  const _id = req.params.id;
  // console.log(_id);
  let user = await User.find({_id: _id});

  if (user[0].status === "CEO") {
    next();
  }
  if (user[0].status === "DEV") {
    next(new Error("you can not add any user"));
  }
};
