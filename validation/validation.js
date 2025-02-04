const {check} = require('express-validator');

const categoryValidator = [
    check("categoryname")
    .notEmpty()
    .withMessage("Category name is required")
];

const productValidator = [
    check("productname").notEmpty().withMessage("product name required"),
    check("productprice").isNumeric().withMessage("price must be numeric"),
    // check("productdescription").notEmpty().withMessage("Description is required"),
    // check("category").notEmpty().withMessage("category required"),
];

const loginvalidator = [
    check("user_name").notEmpty().withMessage("username is required"),
    check("password").notEmpty().withMessage("password must be strong")
]



module.exports = {
    categoryValidator,
    productValidator,
    loginvalidator
}