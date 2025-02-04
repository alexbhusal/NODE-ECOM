const express = require('express');
const routes = express.Router();


const indexController = require("../controller/index");

routes.get("/", indexController.getIndex);

module.exports = routes;