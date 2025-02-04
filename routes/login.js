const express = require('express');
const routes = express.Router();
const validator = require("../validation/validation")


const loginController = require("../controller/login");

routes.get("/", loginController.getLogin);
routes.post("/", validator.loginvalidator, loginController.login);

module.exports = routes;