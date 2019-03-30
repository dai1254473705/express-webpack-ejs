/**
 * =======================================
 * webpack dev config
 * daiyunzhou 2019/03/29 14:45
 * last modify Author: daiyunzhou
 * last modify Date: 2019/03/29 14:45
 * =======================================
 */

'use strict';

const merge = require('webpack-merge');
const baseConf = require('./webpack.base.config');
const webpack = require('webpack');

module.exports  = merge(baseConf, {
    mode:"development", // "production" | "development" | "none",
    devtool: 'inline-source-map',
    watch: true,
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
});
