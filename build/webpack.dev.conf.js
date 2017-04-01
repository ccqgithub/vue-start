process.NODE_ENV = 'development'

var webpack = require('webpack')
var merge = require('webpack-merge')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
  module: {
    //
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
})
