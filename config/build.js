/**
 * =======================================
 * 上线前进行打包处理
 * daiyunzhou 2019/03/29 14:45
 * last modify Author: daiyunzhou
 * last modify Date: 2019/03/29 15:48
 * =======================================
 */
'use strict';

const rm = require('rimraf');
const ora = require('ora');
const webpack = require('webpack');
const chalk = require('chalk');
const config = require('./config');
const prodConf = require('./webpack.prod.config');
const path = require('path');

const spinner = ora(
'building for ' + process.env.NODE_ENV + ' environment...'
);
spinner.start();

rm(path.join(config.assetsRoot), err => {
    if (err) throw err;
    webpack(prodConf, (err, stats) => {
        spinner.stop()
        if (err) throw err;

        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n');
      
        if (stats.hasErrors()) {
            console.log(chalk.red(' Build failed with errors.\n'))
            process.exit(1)
        };
      
        console.log(chalk.cyan(' Build complete.\n'));
        console.log(
            chalk.yellow(
                ' 如果不是开发的情况下，build完成后会生成文件到public下\n' +
                " 通过运行supervisor ./bin/www 常规操作既可运行\n"
            )
        );
    });
});