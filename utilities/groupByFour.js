function groupByFour(items){
    var result = [];
    for(var i=0;i < items.length; i +=4){
        result.push(items.slice(i,i +4));
    }
    return result;
}
module.exports = groupByFour;