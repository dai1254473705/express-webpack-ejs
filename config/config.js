/**
 * =======================================
 * 配置项
 * daiyunzhou 2019/03/29 14:47
 * last modify Author: daiyunzhou
 * last modify Date: 2019/03/29 14:47
 * =======================================
 */

 'use strict';

 const path = require('path');
 module.exports = {
    publicPath: 'http://127.0.0.1:3000/',
    assetsRoot: path.resolve(__dirname, '..', 'public'),// express 静态目录
    scriptEntry: path.resolve(__dirname, '..', 'src/scripts/pages/**/*.js'), // 默认是pages下的js打包到public/scripts/pages/**/*.js
 };
