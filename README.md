### 自动更换壁纸

配置环境：windows + node

这是使用 nodejs 编写的自动更换壁纸的小程序。

电脑开机后和每日 0:0:30 会抓取当日 Bing 首页图片作为壁纸。

### 使用方法

    npm install
    npm run buildvbs
此时文件夹下出现 AutoRunChangeWallPaper.vbs 文件

开始 -> 运行 shell:startup

将 AutoRunChangeWallPaper.vbs 的**快捷方式**复制到上个命令打开的文件夹中。

### 说明
文件夹下的 BingImg 文件夹会缓存前5天的图片文件。

喜欢哪天的可以进入此文件夹复制。

log 信息会保存在 log/log.txt 中
