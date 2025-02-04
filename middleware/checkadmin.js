function checkadmin(req,res,next){
    const data = req.session.user;
    if(data){
        if(data.role== "admin"){
            next();
        }else{
            res.redirect('/');
        }
    }else{
        res.redirect("/");
    }


}
module.exports = checkadmin;