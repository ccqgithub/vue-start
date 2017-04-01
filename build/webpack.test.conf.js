process.NODE_ENV = 'testing'

var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseConfig = require('./webpack.base.conf')

var webpackConfig = merge(baseConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  module: {
    //
  },
  devtool: '#inline-source-map',
  plugins: [
    //
  ]
})

// no need for app entry during tests
delete webpackConfig.entry

module.exports = webpackConfig
