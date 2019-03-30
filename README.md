# fe-node-template 
---
> 前端模板： express + ejs + webpack

## install

+ 开发环境： `npm i` 
+ test || release: `npm i --production`

## start

+ 安装依赖： `npm install`
+ 开发： `npm run dev`
+ 打包： `npm run build`
+ 预览：`npm run start`

> 默认端口号为3000,此端口下可以实现js,css 等文件修改后自动更新，如果是修改ejs，在端口8080下可实现自动更新；

## 可是实现什么功能？

+ 修改的是client里的css文件（包括.scss等），保存后，浏览器不会整页刷新，新的样式效果直接更新到页面内。
+ 修改的是client里的javascript文件，保存后，浏览器会自动整页刷新，得到更新后的效果。
+ 修改的是server里的文件，保存后，服务器将自动重启，浏览器会在服务器重启完毕后自动刷新。
+ 修改ejs,页面将会刷新

## 环境约定

+ 开发： `development`
+ 测试环境： `test`
+ 线上环境： `production`

## author 

+ daiyunzhou


## 相关文档

+ https://www.npmjs.com/package/webpack-hot-middleware
