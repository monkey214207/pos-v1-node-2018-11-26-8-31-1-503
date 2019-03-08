const loadAllItems = require('../main/datbase').loadAllItems;
const loadPromotions = require('../main/datbase').loadPromotions;
//#1
module.exports = function printInventory(inputs) {
    var orderInfo = getOrderInfo(inputs);
    loadOrderInfo(orderInfo);
    var promotion = getPromotion(orderInfo);
    summary = getSummary(orderInfo,promotion);
    console.log(summary);
};
//#2
function getOrderInfo(selectedItems) {
    var orderInfo = [];
    selectedItems.forEach(item => {
      let info = item.split("-");
      if(info.length>2){return null;}
      isExitIndexResult = isExitIndex(orderInfo, info);

      if(isExitIndexResult.isExit){
        if(info.length == 2){orderInfo[isExitIndexResult.index].count += Number(info[1]);}
        if(info.length == 1){orderInfo[isExitIndexResult.index].count += 1;}
      }
      if(!isExitIndexResult.isExit){
        if(info.length == 2){orderInfo.push({id:info[0], count:Number(info[1])});}
        if(info.length == 1){orderInfo.push({id:info[0], count:1});}
      }
    });
    return orderInfo;
    }

//#3
function isExitIndex(orderInfo, info){
    let isExitIndex = 0;
    let result = {};
    orderInfo.forEach(x => {
        if(x.id !== info[0]){isExitIndex += 1;}
    });
    if(isExitIndex < orderInfo.length){result.isExit = true;}
    else{result.isExit = false;}
    result.index = isExitIndex;
    return result;
}
//#4
function loadOrderInfo(orderInfo){
    let allItems = loadAllItems();
    orderInfo.forEach(info => {
        allItems.forEach(x => {
            if(x.barcode === info.id){
                info.name = x.name;
                info.unit = x.unit;
                info.price = x.price;
            }
        });
    });
}
//#5
function getPromotion(orderInfo){
    let promotions = loadPromotions()[0].barcodes;
    let result = [];
    let proPrice = 0.0;
    orderInfo.forEach(info => {
        if(info.count >= 2){
            if(promotions.find(function(x){return x === info.id})){
                let proCount = parseInt(info.count/2);
                result.push({name:info.name,count:proCount,unit:info.unit});
                proPrice += info.price*proCount;
            }
        }
    });
    return {proPrice:proPrice,pros:result}
}

//#6
function getSummary(orderInfo,promotion){
    var summary = '***<没钱赚商店>购物清单***\n';
    let allPrice = 0;
    orderInfo.forEach(info => {
        let tmp = '名称：'+info.name+'，数量：'+info.count+info.unit+
        '，单价：'+info.price+'(元)，小计：'+info.count*info.price+'(元)\n';
        summary += tmp;
        allPrice += info.count*info.price;
    });
    if(promotion.proPrice > 0){
        summary += '----------------------\n'+'挥泪赠送商品：\n';'名称：雪碧，数量：1瓶\n' +
        promotion.pros.forEach(x =>{
            let tmp = '名称：'+x.name+'，数量：'+x.count+x.unit+'\n';
            summary += tmp;
        });
    }
    summary += '----------------------\n';
    summary += '总计：'+allPrice+'(元)\n'+'节省：'+promotion.proPrice+'(元)\n'+'**********************';
    return summary;
    }