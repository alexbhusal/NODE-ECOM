function inc(val){
    return val + 1;
}
function isEq(arg1,arg2,op){
    return arg1==arg2 ? op.fn(this) : op.inverse(this);
}

function getTotal(qty,price){
    return qty*price
}

helper = {
    inc,
    isEq,
    getTotal
};
module.exports = helper;