/**
 * 用于配置 webpack.DefinePlugin
 */

var APP_ENV = process.env.APP_ENV || 'local'
var defines = {};

// common
var common = {
  API_BASE_URL: JSON.stringify('http://www.api.com/'),
}

// local
defines['local'] = Object.assign({}, common, {
  NODE_ENV: JSON.stringify('development'),
})

// testing
defines['test'] = Object.assign({}, common, {
  NODE_ENV: JSON.stringify('production'),
})

// production
defines['prod'] =  Object.assign({}, common, {
  NODE_ENV: JSON.stringify('production'),
})

// module.exports
module.exports = defines[APP_ENV]
