const express = require('express');
const routes = express.Router();

const productcontroller = require("../controller/product");

routes.get("/",productcontroller.getAllProduct);
routes.get("/product/:id",productcontroller.getProductByCategoryId);

module.exports = routes;