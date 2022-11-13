const Roles = require("../models/roles-models");

let roleService = {};

roleService.creteRole = (role) => {
  return new Roles(role).save();
};
roleService.getRole = () => {
  return Roles.find({}).populate("role_Priority", "-_id value");
};
roleService.deleteRole = (id) => {
  return Roles.deleteOne({_id: id});
};
roleService.updateRole = (id, data) => {
  return Roles.updateOne({_id: id}, data);
};

module.exports = roleService;
