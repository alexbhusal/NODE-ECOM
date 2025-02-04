const db = require("../connection/db");

function addOrder(data,userId){
    const {address,phone} = data;
    return new Promise(( resolve,reject)=>{
        db.query(
            "insert into ordertable (address,phoneNumber,user_id) VALUES(?,?,?)",
            [address,phone,userId],
            (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            }
        )

    });
}
function getOrderTable(){
    return new Promise((resolve, reject)=>{
        db.query(
            "select * from ordertable",(error, elements) =>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            }
        );

    });
}

function addHistory(orderId,cart){
   
    return new Promise((resolve, reject) => {
        const promises = [];
        for (let i = 0; i < cart.length; i++) {
            const { order_id, id, qty, price } = cart[i];
            const query = 'INSERT INTO history_table(order_id, product_id, qty, price) VALUES (?, ?, ?, ?)';
            const values = [orderId,id, qty, price];
            promises.push(new Promise((innerResolve, innerReject) => {
                db.query(query, values, (err, result) => {
                    if (err) {
                        console.error('Error inserting into database:', err);
                        innerReject(err);
                    } else {
                        console.log('Inserted into database:', result);
                        innerResolve(result);
                    }
                });
            }));
        }
        Promise.all(promises)
        .then(results => resolve(results))
        .catch(error => reject(error));
});
}
function getHistory(){
    return new Promise((resolve, reject)=>{
        db.query(
            "select * from history_table",(error, elements) =>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            }
        );

    });
}

module.exports= {
addOrder,
addHistory,
getOrderTable,
getHistory,
}