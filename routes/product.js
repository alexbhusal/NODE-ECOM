const express = require("express");
const validator = require("../validation/validation");
const routes = express.Router();

const productController = require("../controller/product");
const upload = require("../middleware/imageupload");

routes.get("/",productController.productform);
routes.post('/',upload.single("productimage"),validator.productValidator,productController.addProduct);

routes.get("/list",productController.getProduct);

routes.get("/delete/:id",productController.deleteProduct);

routes.get("/edit/:id",productController.editProduct);

routes.post("/update/:id",validator.productValidator,productController.updateProduct);



module.exports = routes;