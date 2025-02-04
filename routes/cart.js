const express = require('express');
const routes = express.Router();

const cartController = require("../controller/cart");


routes.get("/list",cartController.getCartProduct);

routes.get("/:id", cartController.addItem);

routes.get("/add/:id",cartController.addItemById);

routes.get("/sub/:id",cartController.subItemById);

routes.get("/delete/:id",cartController.deleteItemById);



module.exports = routes;