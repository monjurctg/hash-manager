const clientServices = require("../services/clients-services");

const clientControllers = {};

clientControllers.addClient = async (req, res, next) => {
  const newClient = {
    ...req.body,
  };

  clientServices
    .createClient(newClient)
    .then((client) => {
      res.status(200).json({
        status: "sucess",
        message: "client add successfully",
      });
    })
    .catch((err) => {
      next(new Error(err));
    });
};

clientControllers.getClients = async (req, res) => {
  clientServices
    .getClients()
    .then((result) => res.json({result}))
    .catch((err) => res.json({status: "error", error: err.message}));
};

module.exports = clientControllers;
