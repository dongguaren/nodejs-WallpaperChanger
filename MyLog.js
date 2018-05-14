const config = require('./config.js');
const fs = require('fs');
function getNowFormatDate() {
    let date = new Date();
    let seperator1 = "-";
    let seperator2 = ":";
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    return date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds() + seperator2 + date.getMilliseconds();
}

function MyLog(object) {
    fs.writeFileSync(config.logDic+"\\"+config.logFolder,"["+ getNowFormatDate() +"]  "+object.toString()+"\n",{flag:"a"});
}

function handleConsoleLog() {

    if( !fs.existsSync(config.logDic) ) {
        fs.mkdirSync(config.logDic);
    }
    let old_log = console.log;
    console.log = function (obj) {
        MyLog(obj);
        old_log(obj);
    };
}
module.exports.handleConsoleLog = handleConsoleLog;
