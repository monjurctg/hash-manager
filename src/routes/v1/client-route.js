const express = require("express");
const clientControllers = require("../../controllers/client-controllers");

const router = express.Router();

router
  .route("/")
  .post(clientControllers.addClient)
  .get(clientControllers.getClients);
module.exports = router;
