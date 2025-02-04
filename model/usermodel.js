const db = require("../connection/db");

const bcrypt = require('bcrypt');

function signup(data){
    const {user_name,password,fullname} = data;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password,salt);
    return new Promise((resolve,reject)=>{
        db.query(
            "insert into usertable (user_name,password,role,fullname) VALUES(?,?,?,?)",
            [user_name,hash,'user',fullname],
            (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            }
        )
    });
}

function getUserByID(id){
    return new Promise((resolve,reject)=>{
        db.query(
            "select * from usertable where id=?",
            [id],
            (error,elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            }
        )
    });
}

function login(data){
    return new Promise((resolve,reject)=>{
        db.query(
            "select * from usertable where user_name=?",
            [data.user_name],
            (error,elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            }
        )
    });
}

module.exports={
    signup,
    getUserByID,
    login
}