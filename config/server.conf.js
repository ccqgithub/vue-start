var path = require('path')

module.exports = {
  port: 9000,
  autoOpenBrowser: true,
  publicPath: '/',

  // 请求代理，详细配置参见：
  // https://github.com/chimurai/http-proxy-middleware
  proxy: {
    '/api': {
      target:'http://www.example.org',
      changeOrigin:true
    }
  }
}
