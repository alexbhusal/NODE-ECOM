const usermodel = require('../model/usermodel');
const categorymodel = require("../model/categorymodel");
const {validationResult} = require("express-validator");
const bcrypt = require('bcrypt');


async function getLogin(req,res){
    try{
    const data = await categorymodel.getCategory();
    const error = req.flash('error') || {};
    return res.render("user/login",{layout:'home', category:data, error:error});
    }catch(error){
        console.log(error);
    }
};

async function login(req,res){
    const error1 = {
        user_name: {
            msg: "Invalid email"
        },
        password: {
            msg: "Invalid password"
        }
    }
    const error = validationResult(req);
    if(!error.isEmpty()){
        req.flash("error",error.mapped());
        return res.redirect('/login');
    }
    const result = await usermodel.login(req.body);
    if(result.length>0){
        const check = await bcrypt.compare(req.body.password,result[0].password);
        console.log(check);
        if(check){
            req.session.user = {
                role: result[0].role,
                id: result[0].id,
            }
            if(result[0].role="admin"){
                return res.redirect('/admin/')
            }
            return res.redirect('/');
        }
        req.flash('error',error1);
        return res.redirect('/login')
    }

    req.flash('error',error1);
    return res.redirect('/login');
}


module.exports = {
    getLogin,
    login
}