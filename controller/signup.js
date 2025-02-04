const usermodel = require("../model/usermodel");
const categorymodel = require("../model/categorymodel");
async function getSignup(req,res){
    try{
        const data = await categorymodel.getCategory();
        return res.render('user/signup',{layout:'home',category:data});
    }catch(error){
        console.log(error);

    }
};
async function signup(req,res) {
    try{
        const data = req.body;
        const result = await usermodel.signup(data);
        const userData = await usermodel.getUserByID(result.insertId);

        req.session.user = {
            role: userData[0].role,
            id: userData[0].id,
        }
        return res.redirect('/')
    }catch(error){
        console.log(error);
    }
}
module.exports = {
    getSignup,
    signup
};