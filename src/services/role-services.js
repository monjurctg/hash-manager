const Roles = require("../models/roles-models");

let roleService = {};

roleService.creteRole = (role) => {
  return new Roles(role).save();
};
roleService.getRole = (filters, queries) => {
  return Roles.find({})
    .populate("role_Priority", "-_id value")
    .select("_id name value ");
};
roleService.deleteRole = (id) => {
  return Roles.deleteOne({_id: id});
};
roleService.updateRole = (id, data) => {
  return Roles.updateOne({_id: id}, data);
};

module.exports = roleService;
