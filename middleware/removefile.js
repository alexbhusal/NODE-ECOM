const fs = require("fs");

function removeFile(imagename){
    fs.unlink(`./public/image/${imagename}`,(err)=>{
        if(err){
            return console.log(err);
        }
        console.log("delete");
    })
}

module.exports = removeFile;