var PROD_ENV = process.env.PROD_ENV || 'local'
var configs = {};

// local
configs['local'] = {
  publicPath: '/',
  sourceMap: true
}

// test
configs['test'] = {
  publicPath: '/',
  sourceMap: true
}

// prod
configs['prod'] = {
  publicPath: '/',
  sourceMap: false
}

// module.exports
module.exports = configs[PROD_ENV]
