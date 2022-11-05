const User = require("../models/user-model");

let userService = {};
userService.createUser = (user) => {
  const res = new User(user).save();
  return res;
};

userService.getUsers = (filters, queries) => {
  console.log(queries);
  return User.find(filters)
    .skip(queries?.skip)
    .limit(queries?.limit)
    .select(queries?.fields)
    .sort(queries?.sortBy)
    .populate("added_by", "name -_id phone")
    .populate("Role_Priority", "name value -_id");
};
userService.singleUser = (data) => {
  console.log(data, "_id");

  return User.findOne({data});
};

module.exports = userService;
