// const database = [
//   {"id": "0001", "name" : "Coca Cola", "price": 3},
//   {"id": "0002", "name" : "Diet Coke", "price": 4},
//   {"id": "0003", "name" : "Pepsi-Cola", "price": 5},
//   {"id": "0004", "name" : "Mountain Dew", "price": 6},
//   {"id": "0005", "name" : "Dr Pepper", "price": 7},
//   {"id": "0006", "name" : "Sprite", "price": 8},
//   {"id": "0007", "name" : "Diet Pepsi", "price": 9},
//   {"id": "0008", "name" : "Diet Mountain Dew", "price": 10},
//   {"id": "0009", "name" : "Diet Dr Pepper", "price": 11},
//   {"id": "0010", "name" : "Fanta", "price": 12}
// ];


// function countItems(barcodes){

//   let result = [];
//   for(let i = 0;i<barcodes.length;i++){
//       let index = result.findIndex((item)=>item.id ===barcodes[i]);
//       if(index>-1){
//           result[index] = {
//               id:barcodes[i],
//               count: result[index].count + 1
//           };
//           }else{
//               result.push({id:barcodes[i],count:1});
//           }
//       }
//       console.log("zhangjing");
//       return result;

// }

// function getItems(countArr){
//   let result = [];
//   let queryInf = {};
//   for(let i= 0;i<countArr.length;i++){
//       queryInf = queryItems(countArr[i].id);
//       queryInf.count = countArr[i].count;
//       result.push(queryInf);
//   }
//   return result;

// }


// function queryItems(itemId){
//   let result;
//   for(let i = 0; i < database.length;i++){
//       if(itemId == database[i].id){
//           return database[i];
//       }
//   }
// }


// function calculateNum(queryItem){
//   let result = 0;
  
//   for(let i = 0;i<queryItem.length;i++){
//      result = result + calculateSumPrice(queryItem[i]);
//   }

//   console.log("jingjing"+result);
//   return result; 
// }


// function calculateSumPrice(queryItem){
//  // let sum = queryItem.price*queryItem.count;
//   let inf = queryItem.price*queryItem.count;
//   return inf;
// }


// function printReceipt(){
//   let result = "";
//   barcodes = ['0001', '0003', '0005', '0003'];
//   let countArr = countItems(barcodes);
//   let items = getItems(countArr);
//   result = print(items);
//   // result = calculateNum(items);
//   return result;
  
// }

// function print(items){
//   let title = "Receipts"+"\n";
//   let line = "------------------------------------------------------------"+"\n";
//   let value = "";
//   for(let i=0;i<items.length;i++){
//       value = value+items[i].name+"                   "+items[i].price+"         "+ items[i].count+"\n";
//   }
//   let line1 = "------------------------------------------------------------"+"\n";
//   let sum = "Price:" + calculateNum(items);
//   console.log(title+line+value+line1+sum);
//   return title+line+value+line1+sum;

// }


// module.exports = printReceipt;



function loadAllItems() {
  return [{
    id: 'ITEM0001',
    name: '黄焖鸡',
    price: 18.00
  }, {
    id: 'ITEM0013',
    name: '肉夹馍',
    price: 6.00
  }, {
    id: 'ITEM0022',
    name: '凉皮',
    price: 8.00
  }, {
    id: 'ITEM0030',
    name: '冰锋',
    price: 2.00
  }];
}

function loadPromotions() {
  return [{
    type: '满30减6元'
  }, {
    type: '指定菜品半价',
    items: ['ITEM0001', 'ITEM0022']
  }];
}


function bestCharge(inputValue) {
  let result = "";
  inputValue = ["ITEM0013 x 4", "ITEM0022 x 1"];
  let itemInfo = getItems(inputValue);
  let calMoney = calculateMoney(itemInfo);

  let cutMoney = calculateCutMoney(itemInfo);
  let lastMoney = calMoney - cutMoney;
  // let items = getItems(countArr);
  result = printTitle(itemInfo) + printLastMoney(lastMoney);
  
  // // result = calculateNum(items);
  console.log("zhangjingjingresult"+result);
  return result;
}

//获得输入的商品的所有信息
function getItems(inputValue){
let result = [];
let itemResult = {};
let item = loadAllItems();
  for(let i = 0;i < inputValue.length;i++){
    let id = inputValue[i].split(' x ')[0];

    for(let j = 0;j < item.length;j++){
      if(id == item[j].id){
        itemResult = item[j];
        itemResult.count =  parseFloat(inputValue[i].split(' x ')[1]); 
      }
    }
    result.push(itemResult);
    
  }
 
  return result;
}
//计算输入商品的总价格
function calculateMoney(itemInfo){
  let result = 0;
  for(let i = 0;i< itemInfo.length;i++){
   
     result = result + calculateSum(itemInfo[i]);

  }

  
  return result; 
}

//计算输入的单个商品的总价格
function calculateSum(itemInfoNum){
  let inf = itemInfoNum.price * itemInfoNum.count;

  return inf;
}

//选择优惠方案
function calculateCutMoney(itemInfo){
  let cutMoney = 0;
  let sumMoney = calculateMoney(itemInfo);
  let cutItem = loadPromotions()[1].items;
  let cutMoney1 = 0;
  let cutMoney2 = 0;
  for(let i = 0;i< itemInfo.length;i++){
    for(let j =0;j < cutItem.length;j++){
      if(itemInfo[i].id == cutItem[j]){
        cutMoney2 +=  (itemInfo[i].price / 2) * itemInfo[i].count;
      }
    }
  }
  if(sumMoney > 30){
    cutMoney1 = 6; 
  }
  if(cutMoney1>=cutMoney2){
    cutMoney = cutMoney1;
  }else{
    cutMoney = cutMoney2;
  }
 
  return cutMoney;
}


function printTitle(items){
  let title = "============= 订餐明细 ============="+"\n";
  let line = "------------------------------------------------------------"+"\n";
  let value = "";
  value = printItem(items);
  // for(let i=0;i<items.length;i++){
  //     value = value+items[i].name+" x "+items[i].count+" = "+ items[i].count * items[i].price+"\n";
  // }
  // let cut = "使用优惠:"+"\n";
  // let sum = "总计：" + bestCharge(items)+"元\n";
  return title+value+line;

}
function printItem(items){
  let value = "";
  for(let i=0;i<items.length;i++){
    value = value+items[i].name+" x "+items[i].count+" = "+ items[i].count * items[i].price+"\n";
}
return value;

}

function printLastMoney(value){
 // let line = "------------------------------------------------------------"+"\n";
  let bottom = "===================================";
  return "总计：" + value+"元\n"+bottom;

}

module.exports = bestCharge;
