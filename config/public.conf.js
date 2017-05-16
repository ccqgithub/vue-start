var APP_ENV = process.env.APP_ENV || 'local'
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
module.exports = configs[APP_ENV]
