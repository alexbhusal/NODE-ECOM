const express = require('express');
const routes = express.Router();
const checkadmin = require("../middleware/checkadmin");
const orderController = require("../controller/order");

routes.get("/",orderController.getOrderForm);
routes.post('/',orderController.orderPlace);
routes.get("/table",checkadmin,orderController.getOrderTable);
routes.get("/table/history",checkadmin,orderController.getHistory);





module.exports = routes;