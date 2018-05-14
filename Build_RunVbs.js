'use strict';
const fs = require('fs');
const config = require('./config.js');

let basicPath = __dirname;
let vbsName = "AutoRunChangeWallPaper.vbs";
// let vbsSymName = "autoRunChangeWallPaper-Sym.vbs";

// console.log(basicPath);

let vbs_text = `Set ws = CreateObject("Wscript.Shell") 
ws.run "cmd /c node ${basicPath}\\index.js",vbhide `;

fs.writeFileSync(vbsName,vbs_text);


if( fs.existsSync( config.jsonSavedPath ) ){
    fs.unlinkSync( config.jsonSavedPath );
}


/**
 * 此代码不能生成快捷方式,所以需要手动产生
 */
// fs.symlinkSync(vbsName,vbsSymName);

console.log("自动运行脚本构建完毕");
