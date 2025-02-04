const express = require('express');
const routes = express.Router();

const validator = require("../validation/validation");


const categoryController = require("../controller/category");

routes.get("/", categoryController.getForm);
routes.post('/', validator.categoryValidator,  categoryController.addCategory);
routes.get("/list",categoryController.getCategory);
routes.get("/edit/:id",categoryController.editCategory);
routes.get("/delete/:id",categoryController.deleteCategory);
routes.post("/update/:id",validator.categoryValidator, categoryController.updateCategory);




module.exports = routes;

