/**
 * =======================================
 * webpack prod config
 * daiyunzhou 2019/03/29 14:45
 * last modify Author: daiyunzhou
 * last modify Date: 2019/03/29 14:45
 * =======================================
 */

'use strict';

const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConf = require('./webpack.base.config');

module.exports  = merge(baseConf, {
    mode:"production", // "production" | "development" | "none",
    devtool: false,
    plugins: [
    ]
});
