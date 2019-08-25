const database = [
    {"id": "0001", "name" : "Coca Cola", "price": 3},
    {"id": "0002", "name" : "Diet Coke", "price": 4},
    {"id": "0003", "name" : "Pepsi-Cola", "price": 5},
    {"id": "0004", "name" : "Mountain Dew", "price": 6},
    {"id": "0005", "name" : "Dr Pepper", "price": 7},
    {"id": "0006", "name" : "Sprite", "price": 8},
    {"id": "0007", "name" : "Diet Pepsi", "price": 9},
    {"id": "0008", "name" : "Diet Mountain Dew", "price": 10},
    {"id": "0009", "name" : "Diet Dr Pepper", "price": 11},
    {"id": "0010", "name" : "Fanta", "price": 12}
];


// function splitBarcodes(barcodes){
//     var barcodeArr = new Array();
//     var splitInput = barcodes.split(",");
//     for(var i =0;i<splitInput.length;i++){
//         barcodeArr[i] = splitInput[i].replace(/[^0-9]/ig,"");
//     }
//     return barcodeArr;
// }

function checkBarcode(barcodeArr){
    let checkInput;
    if(barcodeArr.length == 0 ){
        checkInput = "输入的商品为空，请重新输入";
    }else if(barcodeArr.length > 1000){
        checkInput = "输入的商品超出正常数量，请检查问题";
    }
    // else if(!isValidateInput(barcodeArray)){
    //     checkInput = "输入的ID无效信息,请重新输入";
    // }
    else{
        checkInput = "正确";
    }
    return checkInput;
}
function isValidateInput(barcodeArr){
    let inputNum = 0;
    for (let i=0; i<barcodeArr.length; i++){
        for (let j=0; j<database.length; j++){
            if(barcodeArr[i]===database[j].id){
                inputNum++;
            }
        }
        if(barcodeArr[i] ===""){
            inputNum++;
        }
    }
    return inputNum === barcodeArr.length

}




function countItems(barcodes){

    let result = [];
    for(let i = 0;i<barcodes.length;i++){
        let index = result.findIndex((item)=>item.id ===barcodes[i]);
        if(index>-1){
            result[index] = {
                id:barcodes[i],
                count: result[index].count + 1
            };
            }else{
                result.push({id:barcodes[i],count:1});
            }
        }
        console.log("zhangjing");
        return result;

    // let resultCountArr = new Array();
    // let idArr = new Array();
    // let splitInput = barcodes.split(",");
    // for(let i =0 ;i<splitInput.length;i++){
    //     idArr.push(splitInput.replace(/[^0-9]/ig,""));
    // }
    // const map = new Map();
    // for(let i = 0;i<idArr.length;i++){
    //     if (map.get(idArr[i])==null){
    //         map.set(idArr[i],1);

    //     }else{
    //         map.set(idArr[i],map.get(idArr[i])+1);
    //     }
    // }

    // return resultCountArr;

}

function getItems(countArr){
    let result = [];
    let queryInf = {};
    for(let i= 0;i<countArr.length;i++){
        queryInf = queryItems(countArr[i].id);
        queryInf.count = countArr[i].count;
        result.push(queryInf);
    }
    return result;

}


function queryItems(itemId){
    let result;
    for(let i = 0; i < database.length;i++){
        if(itemId == database[i].id){
            return database[i];
        }
    }
}


function calculateNum(queryItem){
    let result = 0;
    
    for(let i = 0;i<queryItem.length;i++){
       result = result + calculateSumPrice(queryItem[i]);
    }
  
    console.log("jingjing"+result);
    return result; 
}


function calculateSumPrice(queryItem){
   // let sum = queryItem.price*queryItem.count;
    let inf = queryItem.price*queryItem.count;
    return inf;
}


function printReceipt(){
    let result = "";
    barcodes = ['0001', '0003', '0005', '0003'];
    let countArr = countItems(barcodes);
    let items = getItems(countArr);
    result = print(items);
    // result = calculateNum(items);
    return result;
    
}

function print(items){
    let title = "Receipts"+"\n";
    let line = "------------------------------------------------------------"+"\n";
    let value = "";
    for(let i=0;i<items.length;i++){
        value = value+items[i].name+"                   "+items[i].price+"         "+ items[i].count+"\n";
    }
    let line1 = "------------------------------------------------------------"+"\n";
    let sum = "Price:" + calculateNum(items);
    console.log(title+line+value+line1+sum);
    return title+line+value+line1+sum;

}


module.exports = printReceipt;
