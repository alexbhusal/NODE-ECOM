const mysql = require("mysql");

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    port: 3306,
    database:"onlineshopping",
});

con.connect((error) =>{
    if(error) {
        return console.log(error);
    }
    console.log("database connected");
});
module.exports = con;