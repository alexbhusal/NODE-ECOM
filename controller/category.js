const con = require("../connection/db");
const categorymodel = require("../model/categorymodel");
const {validationResult} = require("express-validator");
function getForm(req,res){
    const error = req.flash('error');
    const isLogin = req.session.user ? true: false;
    const userData = req.session.user;
    return res.render('category/categoryform',{isLogin:isLogin,userData:userData,error:error});
}


async function addCategory(req,res) {
    try{
        const error = validationResult(req);
        if(!error.isEmpty()){
            req.flash("error",error.mapped());
            return res.redirect('/admin/category');
        }
    
    await categorymodel.addCategory(req.body);
    return res.redirect("/admin/category/list");
    
    }catch(error){
        console.log(error)
    }
}
async function getCategory(req,res){
    try{
        const data = await categorymodel.getCategory();
        const isLogin = req.session.user ? true : false;
        const userData = req.session.user;
        return res.render("category/categorytable",{data:data,isLogin:isLogin,userData:userData})
    } catch(error){
        console.log(error)
    }
}

async function editCategory(req,res){
    try{
        const id = req.params.id;
        const data = await categorymodel.getEdit(id);
        const isLogin = req.session.user ? true : false;
        const userData = req.session.user;
        return res.render('category/edit',{data:data[0],isLogin:isLogin,userData:userData});
    }catch(error){
        console.log(error)
    }
}

async function deleteCategory(req, res){
    try{
        const id = req.params.id;
        const data = await categorymodel.getDelete(id);
        return res.redirect("/admin/category/list");
    }catch(error){
        console.log(error);
    }
}
async function updateCategory(req,res){
    try{
        const error = validationResult(req);
        if(!error.isEmpty()){
            const isLogin = req.session.user ? true : false;
            const userData = req.session.user;
            return res.render("category/categoryform",{error:error.mapped(),isLogin:isLogin,userData:userData})
        }
        const id = req.params.id;
        const data = await categorymodel.getUpdate(id,req.body);
        return res.redirect("/admin/category/list");
    }catch(error){
        console.log(error);
    }
}
module.exports = {
    getForm,
    addCategory,
    getCategory,
    editCategory,
    deleteCategory,
    updateCategory
};