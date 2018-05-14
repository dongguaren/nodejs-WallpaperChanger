/**
 * 全局 context
 * @type {{imgSavedDic: string, imgUpperLimit: number, jsonSavedPath: string}}
 */
const config = require('./config.js');
class OneImgMess{
    constructor(jsonObjectByNet){
        this.imgDate = new Date().toLocaleDateString();
        this.jsonObjectByNet = jsonObjectByNet;
    }
}


/**
 * 被序列化的对象
 */
class ImgMess{
    /**
     * 序列化只有数据
     * 反序列化拿到的是数据对象，因为没有类型，不能直接调用原来的方法
     * @param obj
     */
    constructor(obj){
        /**
         * 存放 OneImgMess
         * @type {Array}
         */
        if( obj === undefined || obj === null ){
            this.imgArray = [];
        }else {
            this.imgArray=obj.imgArray;
        }

    }

    add(oneImgMess){
        if( this.imgArray.length < config.imgUpperLimit ){
            this.imgArray.push(oneImgMess);
        }else {
            fs.unlinkSync(config.imgSavedDic + "\\" + this.imgArray[0].imgDate + "_bingImg.jpg");
            this.imgArray.splice(0,1);
            this.imgArray.push(oneImgMess);
        }
        return this;
    }

    getLatestImgUrl(){
        if( this.imgArray.length === 0 )return null;
        let len = this.imgArray.length;
        let jsonObj = this.imgArray[ len - 1 ].jsonObjectByNet;
        let baseUrl = jsonObj.images[0].url;
        return "https://www.bing.com"+baseUrl;
    }

    getLatestImgSavedPath(){
        if( this.imgArray.length === 0 )return null;
        let len = this.imgArray.length;
        let partPath = this.imgArray[ len - 1 ].imgDate;
        return config.imgSavedDic + "\\" + partPath + "_bingImg.jpg";
    }

    toString(){
        return this.imgArray.toString();
    }
}

module.exports.OneImgMess = OneImgMess;
module.exports.ImgMess = ImgMess;


/**
function test() {
    imgMess = new ImgMess();
    console.log(imgMess);
    imgMess.add(new OneImgMess("1",{"name":"liuhao","age":5}));
    imgMess.add(new OneImgMess("1",{"name":"liuhao","age":5}));
    imgMess.add(new OneImgMess("1",{"name":"liuhao","age":5}));
    imgMess.add(new OneImgMess("1",{"name":"liuhao","age":5}));
    imgMess.add(new OneImgMess("1",{"name":"liuhao","age":5}));
    imgMess.add(new OneImgMess("1",{"name":"liuhao","age":5}));
    imgMess.add(new OneImgMess("1",{"name":"liuhao","age":5}));
    imgMess.add(new OneImgMess("1",{"name":"liuhao","age":5}));
    console.log(imgMess);
}


 /////
*/