'use strict';
const http = require('http');

/**
 *  下载图片，返回 json object
 */
/**
getImg(0).then(function (obj) {
    console.log(obj);
},function (err) {
    console.log(err);
});
*/
function getImg(day) {
    if( typeof day !== "number" ){
        throw "argument must be number!";
    }

    if( !(day === 1|| day === -1 || day === 0) ){
        throw "argument must in [-1,1]!";
    }


    let options = {
        hostname: 'www.bing.com',
        // port: 443,
        path: `/HPImageArchive.aspx?format=js&idx=${day}&n=1&mkt=en-US`,
        method: 'GET'
    };

    return new Promise(function(resolve, reject) {
        let req = http.request(options, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (data) {
                let obj = JSON.parse(data);
                // let baseUrl = obj.images[0].url;
                // resolve("https://www.bing.com"+baseUrl);
                console.log("请求图片 url");
                resolve(obj);
            });
        });
        req.on('error', function (e) {
            // console.log('problem with request: ' + e.message);
            reject(e)
        });
        req.end();
    });
}

module.exports = getImg;

