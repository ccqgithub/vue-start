const fs = require('fs');
const path = require('path');
const koa = require('koa');
const staticServe = require('koa-static');
const webpack = require('webpack');
const hotMiddleware = require('koa-webpack-hot');
const opn = require('opn');
const proxy = require('koa-proxies');
const httpsProxyAgent = require('https-proxy-agent');

const publicConfig = require('../config/public.conf');
const config = require('../config/server.conf');
const webpackConfig = require('../build/webpack.conf');

// new app
const app = new koa();

const compiler = webpack(webpackConfig);
// run webpack
const watching = compiler.watch({
  // aggregateTimeout: 300,
  // poll: undefined
}, (err, stats) => {
  console.log(err);
  // console.log(stats)
  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings)
  }
});

app.use(hotMiddleware(compiler, {
  log: console.log,
  // path: '/__webpack_hmr',
  // heartbeat: 10 * 1000
}));

//如果为 true，则解析 "Host" 的 header 域，并支持 X-Forwarded-Host
app.proxy = true;
//默认为2，表示 .subdomains 所忽略的字符偏移量。
app.subdomainOffset = 2;

// not caught errors
app.on('error', (err, ctx) => {
  console.log(err);
  console.log(err.stack);
});

// 静态文件
app.use(staticServe(publicConfig.distPath));

const proxies = config.proxies || {};
Object.keys(proxies).forEach(key => {
  app.use(proxy(key, proxies[key]));
});

// not found
app.use(async (ctx, next) => {
  console.log(ctx.path)
  ctx.throw('Not Found!', 404);
});

// 开启监听服务
const server = app.listen(config.port);

// autoOpenBrowser
if (config.autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
  const uri = 'http://localhost:' + config.port;
  opn(uri);
}