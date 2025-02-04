const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination:function(req,file,cd){
        const imagePath = path.join(__dirname,'../public/image')
        cd(null,"./public/image/");
    },
    filename:function(req,file,cd){
        const date = new Date().toISOString().replace(/:/g,'-');
        cd(null, date+
        file.originalname);
    },
});
const fileFilter = (req,file,cd)=>{
    if(
        file.mimetype ==="image/jpeg"||
        file.mimetype ==="image/jpg"||
        file.mimetype ==="image/png"
    ){
        req.isFileValid = true;
        cd(null,true);
    }else{
        req.isFileValid = false;
        cd(null,false);
    }
};
const upload = multer({
    storage:storage,
    fileFilter:fileFilter,
});

module.exports = upload;