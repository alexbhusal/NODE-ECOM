const db = require("../connection/db");


function addCategory(data){
    const {categoryname} = data;
    return new Promise((resolve, reject)=>{
        db.query(
            "insert into categorytable (categoryname) VALUES (?)",
            [categoryname],
            (error, elements) =>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            }
        );

    });
}

function getCategory(){
    return new Promise((resolve, reject)=>{
        db.query(
            "select * from categorytable",(error, elements) =>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            }
        );

    });
}

function getEdit(id){
    return new Promise((resolve, reject)=>{
        db.query(
            `select * from categorytable where id=${id}`,
            (error, result) =>{
                if(error){
                    return reject (error);
                }
                return resolve(result);
            }
        )
    })
}

function getDelete(id){
    return new Promise((resolve, reject)=>{
        db.query(
            `delete from categorytable where id=${id}`,
             (error, result)=>{
                if(error){
                    return reject(error);
                }
                return resolve (result);
            }
        )
    })
}

function getUpdate(id,body){
   
    const {categoryname} = body;
    return new Promise((resolve, reject)=>{
        db.query(
        "update categorytable set categoryname=? where id=?",
        [categoryname,id],
        (error, result)=>{
            if(error){
                return reject(error);
            }
            return resolve(result);
        })
    })
}


module.exports={
    addCategory,
    getCategory,
    getEdit,
    getDelete,
    getUpdate
}