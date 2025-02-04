const db = require("../connection/db");

function addProduct(data,image){
    const {productname,productprice,productdescription,category} = data;
    return new Promise((resolve, reject)=>{
        db.query(
            "insert into producttable (productname,productprice,productdescription,productimage,category_id) VALUES (?,?,?,?,?)",
            [productname, productprice, productdescription, image, category],
            (error, elements) =>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            }
        );

    });
}
function getProduct(){
    return new Promise((resolve, reject)=>{
        db.query(
            `SELECT
            producttable.id,
            producttable.productname,
            producttable.productprice,
            producttable.productdescription,
            producttable.productimage,
            categorytable.categoryname
            FROM
            producttable INNER JOIN categorytable ON
            producttable.category_id = categorytable.id`,
            
            (error, elements) =>{
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
            `select * from producttable where id=${id}`,
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
            `delete from producttable where id=${id}`,
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
   const {productname , productprice , productdescription} = body;
    return new Promise((resolve, reject)=>{
        db.query(
        "update producttable set productname=?,productprice=?,productdescription=? where id=?",
        [productname,productprice,productdescription,id],
        (error, result)=>{
            if(error){
                return reject(error);
            }
            return resolve(result);
        })
    })
}

function getImageById(id){
    return new Promise((resolve,reject)=>{
        db.query("select productimage from producttable where id=?",
        [id],
        (error,result)=>{
            if(error){
                return reject(error);
            }
            return resolve(result[0])
        })
    })
}

function getProductByCategoryId(id){
    return new Promise((resolve,reject)=>{
        db.query("select * from producttable where category_id=?",
        [id],
        (error,result)=>{
            if(error){
                return reject(error);
            }
            return resolve(result);
        })
    })
}


function getProductById(id){
    return new Promise((resolve,reject)=>{
        db.query(
            "SELECT producttable.id, producttable.productname, producttable.productprice, producttable.productdescription, producttable.productimage,categorytable.categoryname FROM producttable INNER JOIN categorytable ON producttable.category_id = categorytable.id where producttable.id=?;",
            
            [id],
            (error, elements)=>{
                if(error){
                    return reject(error);
                }
              
                return resolve(elements[0]);
            }
    );

});
}
function getAllProduct(){
    return new Promise((resolve,reject)=>{
        db.query("select * from producttable",
        
        (error,result)=>{
            if(error){
                return reject(error);
            }
            return resolve(result);
        })
    })
}

module.exports={
    addProduct,
    getProduct,
    getEdit,
    getDelete,
    getUpdate,
    getImageById,
    getProductByCategoryId,
    getProductById,
    getAllProduct
}