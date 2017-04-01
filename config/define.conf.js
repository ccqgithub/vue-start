var merge = require('webpack-merge')
var PROD_ENV = process.env.PROD_ENV || 'local'
var defines = {};

// local
defines['local'] = {
  NODE_ENV: JSON.stringify('development'),
  API_BASE_URL: JSON.stringify('http://www.api.com/'),
}

// testing
defines['test'] = {
  NODE_ENV: JSON.stringify('production'),
  API_BASE_URL: JSON.stringify('http://www.api.com/'),
}

// production
defines['prod'] = {
  NODE_ENV: JSON.stringify('production'),
  API_BASE_URL: JSON.stringify('http://www.api.com/'),
}

// module.exports
module.exports = defines[PROD_ENV]
