const ordermodel = require("../model/ordermodel");
const con = require("../connection/db");

function getOrderForm(req, res) {
  const isLogin = req.session.user ? true : false;
  const userData = req.session.user;
  res.render("order/orderform", { isLogin: isLogin,layout:"home", userData: userData });
}
async function getOrderTable(req, res) {
  try {
    const data = await ordermodel.getOrderTable();
    const isLogin = req.session.user ? true : false;
    const userData = req.session.user;
    return res.render("order/ordertable", {
      data: data,
      isLogin: isLogin,
      userData: userData,
    });
  } catch (error) {
    console.log(error);
  }
}
async function getHistory(req, res) {
  try {
    const data = await ordermodel.getHistory();
    const isLogin = req.session.user ? true : false;
    const userData = req.session.user;
    return res.render("history/historytable", {
      data: data,
      isLogin: isLogin,
      userData: userData,
    });
  } catch (error) {
    console.log(error);
  }
}

async function orderPlace(req, res) {
  try {
    const user = req.session.user;
    const order = await ordermodel.addOrder(req.body, user["id"]);
    const cartData = req.session.cart;
    const a = await ordermodel.addHistory(order.insertId, cartData);
    if (a) {
      req.session.cart = null;
      req.session.save();
      const isLogin = req.session.user ? true : false;
    const userData = req.session.user;
      return res.render("user/thankyou",{isLogin: isLogin,layout:"home", userData: userData});
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getOrderForm,
  orderPlace,
  getOrderTable,
  getHistory,
};
