const session = require("express-session");
const productmodel = require("../model/productmodel");
const cart = require("../utilities/cart_system");

async function addItem(req,res){
    try{
        const id = req.params.id;
        const data = await productmodel.getProductById(id);
        const cartItem = req.session.cart || [];
        console.log(cartItem);
        if(cartItem.length > 0){
            const firstTrough = cartItem.filter((d) => d.id === data.id);
            if(firstTrough.length > 0) {
                firstTrough[0].qty = firstTrough[0].qty + 1;
            } else {
                const cartData = {
                    id: data.id,
                    product_name: data.productname,
                    category_name: data.categoryname,
                    price: data.productprice,
                    image: data.productimage,
                    qty: 1
                }
                req.session.cart.push(cartData);
            }
        } else {
            const cartData = {
                id: data.id,
                product_name: data.productname,
                category_name: data.categoryname,
                price: data.productprice,
                image: data.productimage,
                qty: 1
            }
            req.session.cart = [cartData];
            req.session.save();
        }
        res.redirect("/");
    } catch(error){
        console.log(error);
    }
}

function getCartProduct(req,res){
    try{
        const cart = req.session.cart;
        const isLogin = req.session.user ? true : false;
       const userData = req.session.user;
        return res.render("cart/cart",{cart:cart,layout:"home",isLogin:isLogin,userData:userData});
    }catch(error){
        console.log(error);
    }
}

function addItemById(req,res){
    const id = req.params.id;
    console.log(id);
    const cartItem = req.session.cart;

    const firstTrough = cartItem.filter((d) => d.id == id);
    console.log(firstTrough);
    if(firstTrough.length > 0){
        firstTrough[0].qty = firstTrough[0].qty + 1;
    }
    res.redirect('/cart/list');
}

function subItemById(req, res) {
    const id = req.params.id;
    console.log(id);
    const cartItem = req.session.cart;

    const itemIndex = cartItem.findIndex((item) => item.id == id);
    if (itemIndex !== -1) {
        if (cartItem[itemIndex].qty > 1) {
            cartItem[itemIndex].qty--;
        } else {
            // If the quantity is already 1 or less, you might want to remove the item from the cart
            cartItem.splice(itemIndex, 1);
        }
    }

    res.redirect('/cart/list');
}

function deleteItemById(req, res) {
    const id = req.params.id;
    const cartItem = req.session.cart;

    const itemIndex = cartItem.findIndex((item) => item.id == id);
    if (itemIndex !== -1) {
        cartItem.splice(itemIndex, 1);
    }

    res.redirect('/cart/list');
}

module.exports = {
    addItem,
    getCartProduct,
    addItemById,
    subItemById,
    deleteItemById
}
