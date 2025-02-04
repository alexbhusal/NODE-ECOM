const express = require('express');
const routes = express.Router();


const loginController = require("../controller/signup");
routes.get("/",loginController.getSignup)
routes.post("/", loginController.signup);

module.exports = routes;