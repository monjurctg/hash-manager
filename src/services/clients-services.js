const Clients = require("../models/client-model");
const Projects = require("../models/project-model");

let clientServices = {};

clientServices.createClient = (client) => {
  return new Clients(client).save();
};
clientServices.getClients = (filters, queries) => {
  return Clients.find({});
};

module.exports = clientServices;
