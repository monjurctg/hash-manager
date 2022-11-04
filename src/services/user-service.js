const User = require("../models/user-model");

let userService = {};
userService.createUser = (user) => {
  const res = new User(user).save();
  return res;
};

userService.getUsers = (filters, queries) => {
  return User.find(filters)
    .skip(queries?.skip)
    .limit(queries?.limit)
    .select(queries?.fields)
    .sort(queries?.sortBy);
};
userService.singleUser = (email) => {
  return User.findOne({email});
};

module.exports = userService;
