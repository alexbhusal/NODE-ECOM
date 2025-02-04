 const con = require("../connection/db");
const productmodel = require("../model/productmodel");
const categorymodel = require("../model/categorymodel");
const {validationResult}  = require("express-validator");

const removeFile = require("../middleware/removefile");

const groupByFour = require("../utilities/groupByFour")


 async function productform(req,res){ 
  const category = await  categorymodel.getCategory();
  const error = req.flash("error");
  const isLogin = req.session.user ? true: false;
  const userData = req.session.user;
    return res.render("product/productForm",{category:category,error : error,isLogin:isLogin,userData:userData});
}


async function addProduct(req,res){
    try{
        const error  = validationResult(req);
        
        if(error.isEmpty() && req.isFileValid){
            const filename = req.file.filename;
            const body = req.body;
            await productmodel.addProduct(body,filename)
         return res.redirect('/admin/product/list');
        
        }
           const errorData = error.mapped()
           if(!req.isFileValid){
        errorData['productimage']={
            msg: "Invaild formate image (only accpect jpeg,jpg,png)"
        }
           }
            req.flash("error",errorData)
         return res.redirect("/admin/product");
        } catch(error){
            console.log(error);
        }
       
}
    
    
async  function getProduct (req,res){
        try{
           const data = await productmodel.getProduct();
           const isLogin = req.session.user ? true : false;
           const userData = req.session.user;
           return res.render("product/producttable",{data:data,isLogin:isLogin,userData:userData})
        }catch(error){
            console.log(error);
        }
}
     
    
    
async function deleteProduct(req,res){
        try{
            const id = req.params.id;
            const image = await productmodel.getImageById(id);
            removeFile(image.productimage);
            const data = await productmodel.getDelete(id);
            return res.redirect("/admin/product/list")
        }catch(error){
             console.log(error);
        }
}


async function editProduct(req,res){
    try{
        const id = req.params.id;
       const data = await productmodel.getEdit(id);
       const category = await categorymodel.getCategory();
       const isLogin = req.session.user ? true : false;
       const userData = req.session.user;
       return res.render("product/edit",{data:data[0],category:category,isLogin:isLogin,userData:userData});
    }catch(error){
        console.log(error);
    }
}


async function updateProduct(req,res){
    console.log("Update");
    try{
        const error = validationResult(req);
        if(!error.isEmpty()){
            console.log(error);
            console.log(req.body);
            const isLogin = req.session.user ? true :false;
            const userData = req.session.user;
            return res.render('product/productForm',{error:error.mapped(),isLogin:isLogin,userData:userData});
        }
        const id = req.params.id;
        console.log(req.body);
        const data = await productmodel.getUpdate(id , req.body);
        return res.redirect("/admin/product/list");
    }catch(error){
        console.log(error);
    }
}


/*-------user----------*/
async function getProductByCategoryId(req,res){
    try{
        const id = req.params.id;
        const data = await productmodel.getProductByCategoryId(id);
        const isLogin = req.session.user ? true : false;
       const userData = req.session.user;
        const category = await categorymodel.getCategory();
        return res.render("product/viewproduct",{layout:'home',product:groupByFour(data),category:category,isLogin:isLogin,userData:userData})
    }catch(error){
        console.log(error);
    }
}
async function getAllProduct(req,res){
    try{
        const data = await productmodel.getAllProduct();
    const category = await categorymodel.getCategory();
        const isLogin = req.session.user ? true : false;
        const userData = req.session.user;
        return res.render("user/userindex",{layout:"home",category:category,data:data,isLogin:isLogin,userData:userData})
    } catch(error){
        console.log(error)
    }
}
module.exports = {
    productform,
    addProduct,
    getProduct,
    deleteProduct,
    editProduct,
    updateProduct,
    getProductByCategoryId,
    getAllProduct,
    
};    