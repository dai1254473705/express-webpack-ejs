/**
 * =======================================
 * webpack base entry
 * daiyunzhou 2019/03/29 14:50
 * last modify Author: daiyunzhou
 * last modify Date: 2019/03/29 14:50
 * 
 * 开发环境需要使用hotMiddlewareScript，实现HMR;
 * 打包的时候需要去掉hotMiddlewareScript；
 * =======================================
 */

'use strict';

const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
const glob = require('glob');
const env = process.env.NODE_ENV;
const config = require('./config');

// 动态入口
function getEntry(){
    var entry = {};
    glob.sync(config.scriptEntry).forEach(function(name){
        var start = name.indexOf('src/') + 4;
        var end = name.length - 3;
        var eArr = [];
        var n = name.slice(start,end);
        eArr.push(name);
        entry[n] = eArr;
    })
    return entry;
};

// 获取入口列表
let entryList = getEntry();

if ( env !== 'production' ) {
    Object.keys(entryList).map(key => {
        entryList[key].push(hotMiddlewareScript);
    });
}

module.exports = entryList;
