const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000; //PORT=4000 node app
const path = require('path');
const routes = require('./routes');
const app = express();
const http = require('http');



let isDev = process.env.NODE_ENV !== 'production';
app.locals.env = process.env.NODE_ENV || 'dev';

// 设置是否需要在ejs中注入reload.js,默认是不开启
app.locals.reload = false;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      title: '你来到了一片荒芜之地',
      message: err.message,
      error: {}
  });
});


let server = null;

if (isDev) {
  app.locals.reload = true;
  // ========================Express的routes代码之前======start=================
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackDevConfig = require('./config/webpack.dev.config');
  const compiler = webpack(webpackDevConfig);
  const bs = require('browser-sync').create();

  // attach to the compiler & the server
  app.use(webpackDevMiddleware(compiler, {
    // public path should be the same with webpack config
    publicPath: webpackDevConfig.output.publicPath,
    // Set to true to disable informational console logging.
    noInfo: false,
    stats: {
        colors: true
    }
  }));
  app.use(webpackHotMiddleware(compiler));
  // ========================Express的routes代码之前==========end=============

  /**
   * 将node 服务和客户端关联，防止在node重启后
   * websocket 断开连接，导致页面不能更新
   */
  const reload = require('reload');
  server = http.createServer(app);

  // router
  routes(app);

  // 当node server reload完成后，client端reload
  reload(server, app);
  
  server.listen(port, function () {
    bs.init({
      open: false,
      ui: false,
      notify: true,
      proxy: 'localhost:3000',
      files: ['./views/**'],
      port: 8080
    });
    console.log(`App (${process.env.NODE_ENV}) is now running on http://127.0.0.1:${port}`);
  });

} else {
  app.use(express.static(path.join(__dirname, 'public')));
  // router
  routes(app);
  server = http.createServer(app);
  server.listen(port, function () {
    console.log(`App (${process.env.NODE_ENV}) is now running on http://127.0.0.1:${port}`);
  });
};





