process.NODE_ENV = 'production'

var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var publicConf = require('../config/public.conf')
var config = require('../config/index.conf')

var webpackConfig = merge.smart(baseWebpackConfig, {
  output: {
    path: config.distPath,
    filename: 'js/[name].[chunkhash].js',
    publicPath: publicConf.publicPath,
  },

  module: {
    //
  },
  plugins:[
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: path.resolve(config.distPath, './static'),
        ignore: ['.*']
      }
    ])
  ].concat(!publicConf.compress ? [] : [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: !!publicConf.sourceMap
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
  ])
})

module.exports = webpackConfig
