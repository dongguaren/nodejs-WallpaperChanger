'use strict';
const config = require('./config.js');
const fs = require('fs');
const request=require("request");
const wallpaper = require('wallpaper');
const schedule = require('node-schedule');
const AllImgData = require('./OneImgMessSavedByJson.js');
const getImgJsonObj = require('./GetImgJsonObj.js');
const MyLog = require('./MyLog.js');

function downloadImgByUrl(url,savedFilename) {
    return new Promise(function (resolve, reject) {
        request(url).pipe(fs.createWriteStream(savedFilename).on("error",function (err) {
            reject(err);
        }).on('finish',function () {
            console.log("下载图片");
            resolve();
        }))
    });
}


function changeBackground() {
    let img_str = "D:\\BingWallImg\\today_bing_img.jpg";
    const getImg = require('./GetImgJsonObj.js');
    console.log(getImg);
    getImg(0).then(function (url) {
        console.log("获得图片地址：" + url);
        return downloadImgByUrl(url,img_str)
    }).then(function () {
        return wallpaper.set(img_str);
    }).then(function () {
        console.log("已设置为桌面背景")
    },function (err) {
        console.log(err);
    });
}



function ensureEmvirment() {
    // 1.确认图片保存文件夹
    console.log("检查 BingImg 文件夹");
    if( !fs.existsSync(config.imgSavedDic) ) {
        console.log("不存在 BingImg 文件夹，进行初始化");
        fs.mkdirSync(config.imgSavedDic);
        console.log("BingImg 文件夹初始化完成")
    }

    // 2.检查配置文件
    console.log("检查配置文件");
    if( !fs.existsSync( config.jsonSavedPath ) ) {
        console.log("不存在配置文件，进行初始化");
        fs.writeFileSync(config.jsonSavedPath, JSON.stringify(new AllImgData.ImgMess()));
        console.log("配置文件初始化完成")
    }

}

function readConfigContext() {
    let json_str = fs.readFileSync(config.jsonSavedPath,{encoding:"utf8"});
    // return JSON.parse(json_str);
    return new AllImgData.ImgMess(JSON.parse(json_str));
}

function isNeedDownload(configContext) {
    let todayDate = new Date().toLocaleDateString();
    let len = configContext.imgArray.length;
    let arr = configContext.imgArray;

    return (len===0)?true:(arr[len-1].imgDate !== todayDate);

}

function saveContextToFile(context) {
    fs.writeFileSync(config.jsonSavedPath, JSON.stringify(context));
    console.log("本次信息写入配置文件");
}


let wallpaper_old_set = wallpaper.set;
wallpaper.set = function (obj) {
  console.log("设置桌面背景");
  return wallpaper_old_set(obj);
};


function JobStart() {
    ensureEmvirment();
    let configContext = readConfigContext();
    if( isNeedDownload(configContext) ){

        // console.log(typeof configContext.add);

        getImgJsonObj(0).then(jsonObj =>  Promise.resolve(configContext.add(new AllImgData.OneImgMess(jsonObj))) )
            .then(() => downloadImgByUrl(configContext.getLatestImgUrl(),configContext.getLatestImgSavedPath()))
            .then(() => wallpaper.set(configContext.getLatestImgSavedPath()))
            .then(() => saveContextToFile(configContext),err => {console.log(err);failed()});

    }else {
        console.log("今日图片已下载"  );
    }
}

let reTryTimes = 3;
function failed() {
    if( reTryTimes === 0 )return;
    setTimeout(() => JobStart(),1000*60*10);
    reTryTimes--;
}


function main() {

    MyLog.handleConsoleLog();

    console.log("has started");
    schedule.scheduleJob('30 0 0 * * *', function(){
        console.log("开始更换背景图片");
        JobStart();
    });
    setTimeout(() => JobStart(),1000*60);
}
// main();


fs.existsSync( "config.json" )



/**
 * 30 1 1 * * *
 * 每天 01:01:30 触发
 */








