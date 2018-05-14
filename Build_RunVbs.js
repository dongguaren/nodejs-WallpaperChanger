'use strict';
const fs = require('fs');

let basicPath = __dirname;
let vbsName = "AutoRunChangeWallPaper.vbs";
// let vbsSymName = "autoRunChangeWallPaper-Sym.vbs";

// console.log(basicPath);

let vbs_text = `Set ws = CreateObject("Wscript.Shell") 
ws.run "cmd /c node ${basicPath}\\index.js",vbhide `;

fs.writeFileSync(vbsName,vbs_text);

/**
 * 需要管理员权限才能运行
 */
// fs.symlinkSync(vbsName,vbsSymName);

console.log("自动运行脚本构建完毕");
