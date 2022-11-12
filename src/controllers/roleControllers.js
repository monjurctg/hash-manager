const roleService = require("../services/role-services");

const roleControllers = {};

roleControllers.addrole = async (req, res, next) => {
  const newRole = {
    ...req.body,
  };
  console.log("headi");

  roleService
    .creteRole(newRole)
    .then(() => {
      res.status(200).json({
        status: "sucess",
        message: "role add successfully",
      });
    })
    .catch((err) => {
      next(new Error(err));
    });
};

roleControllers.getRoles = async (req, res) => {
  roleService
    .getRole()
    .then((result) => res.json({result}))
    .catch((err) => res.json({status: "error", error: err.message}));
};

roleControllers.deleteOne = async (req, res, next) => {
  const id = req.params.id;
  roleService
    .deleteRole(id)
    .then(() =>
      res.status(200).json({success: true, message: "role delete successfully"})
    )
    .catch((err) => next(new Error(err)));
};
roleControllers.updateOne = async (req, res, next) => {};

module.exports = roleControllers;
