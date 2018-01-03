const path = require('path');
const httpsProxyAgent = require('https-proxy-agent');

module.exports = {
  port: 9000,
  autoOpenBrowser: true,

  // 请求代理，详细配置参见：
  // https://github.com/vagusX/koa-proxies
  proxies: {
    '/octocat': {
      target: 'https://api.github.com/users',    
      changeOrigin: true,
      agent: new httpsProxyAgent('http://1.2.3.4:88'),
      rewrite: path => path.replace(/^\/octocat(\/|\/\w+)?$/, '/vagusx'),
      logs: true
    }
  }
}
