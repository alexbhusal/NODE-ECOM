async function getlogout(req,res){
    try{
        req.session.destroy();
        return res.redirect("/");
    }catch(error){
        console.log(error);
    }
}
module.exports = {
    getlogout,
}