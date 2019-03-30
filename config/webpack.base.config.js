/**
 * =======================================
 * webpack base config
 * daiyunzhou 2019/03/29 14:45
 * last modify Author: daiyunzhou
 * last modify Date: 2019/03/29 14:45
 * =======================================
 */
'use strict';

const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const entry = require('./entry');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TransferWebpackPlugin = require('transfer-webpack-plugin');//原封不动的把assets中的文件复制到dist文件夹中
const autoprefixer = require('autoprefixer');//给css自动加浏览器兼容性前缀的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');// 压缩css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    mode:"development", // "production" | "development" | "none",
    context: path.resolve(__dirname),
    entry: entry,
    output: {
        path: config.assetsRoot, // string
        filename: './[name].js',
        publicPath: config.publicPath
    },
    resolve: {
        extensions: ['.js'],
        alias: {
          '@': path.resolve(__dirname, '..', 'src')
        }
    },
    externals: {
        jquery: "window.$"
    },
    optimization: {
        minimizer: [
            // new UglifyJsPlugin({
            //     test: /\.js(\?.*)?$/i,
            // }),
            // 压缩css
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
                canPrint: true
            }),
        ],
    },
    module: {
        rules: [
            { 
                test: /\.js$/,
                exclude: /node_modules/, 
                loader: "babel-loader",
                include: /src/,
            },
            {
                test: /\.css$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    { loader: 'postcss-loader', options: { 
                        parser: 'sugarss', 
                        exec: true 
                      } 
                    },
                ],
            },
            {
                test:/\.scss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    { loader: 'postcss-loader', options: {
                        plugins: [
                            autoprefixer({
                                browsers: ['ie >= 8','Firefox >= 20', 'Safari >= 5', 'Android >= 4','Ios >= 6', 'last 4 version']
                            })
                        ]
                    }},
                    'sass-loader',
                ],
            },
            {
                test:/\.(png|jpg|gif|jpeg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:5000
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        // 将需要放在根目录下的文件复制到public
        new TransferWebpackPlugin([//作用相当于copy-webpack-plugin
            {
                from: path.join('..','src/exclude'),
                to: '../public/',
            }
        ], path.join(__dirname, '..', 'src')),
        // 将images下的所有文件放到public/images
        new TransferWebpackPlugin([//作用相当于copy-webpack-plugin
            {
                from: path.join('..','src/images'),
                to: '../public/images',
            }
        ], path.join(__dirname, '..', 'src')),
        new MiniCssExtractPlugin({
            filename: '[name].css', //name 是所在js的js文件名
        }),
    ]
};