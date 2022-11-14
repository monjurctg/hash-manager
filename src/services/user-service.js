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
    .populate({path: "role", select: " role_Priority name"});

  // .populate({path: "role", select: "value"});
};
userService.singleUser = (email) => {
  return User.find({email: email});
};

userService.updateUserData = (filter, object_data) => {
  return User.findByIdAndUpdate(filter, object_data);
};

module.exports = userService;
