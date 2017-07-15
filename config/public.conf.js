/**
 * 配置不同环境的打包发布参数
 */

var path = require('path')
var APP_ENV = process.env.APP_ENV || 'local'
var configs = {};

// common
var common = {
  distPath: path.join(__dirname, '../public'),
  publicPath: '/',
  sourceMap: true,
  compress: false,
}

// local
configs['local'] = Object.assign({}, common, {
  publicPath: '/',
  sourceMap: true,
  compress: false
})

// test
configs['test'] = Object.assign({}, common, {
  publicPath: '/',
  sourceMap: true,
  compress: false
})

// prod
configs['prod'] = Object.assign({}, common, {
  publicPath: '/',
  sourceMap: false,
  compress: false
})

// module.exports
module.exports = configs[APP_ENV]
