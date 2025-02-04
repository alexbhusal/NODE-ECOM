const express = require('express');

const routes = express.Router();
const logoutcontroller = require("../controller/logout");
routes.get('/',logoutcontroller.getlogout);
module.exports = routes;