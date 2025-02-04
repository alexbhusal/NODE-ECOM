function getIndex (req,res){
  const isLogin = req.session.user ? true : false;
  const userData = req.session.user;
  return  res.render("index",{isLogin:isLogin,userData:userData});
};
module.exports = {
    getIndex,
};