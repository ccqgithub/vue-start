var PROD_ENV = process.env.PROD_ENV || 'local'
var configs = {};

// local
configs['local'] = {
  publicPath: '/',
  sourceMap: true,
  compress: false
}

// test
configs['test'] = {
  publicPath: '/',
  sourceMap: true,
  compress: false
}

// prod
configs['prod'] = {
  publicPath: '/',
  sourceMap: false,
  compress: false
}

// module.exports
module.exports = configs[PROD_ENV]
