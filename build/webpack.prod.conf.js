process.NODE_ENV = 'production'

var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var publicConf = require('../config/public.conf')

// extract css
var extractCss = new ExtractTextPlugin('css/[name].[chunkhash].css')

var styleLoaders = utils.getStyleLoaders({
  extract: true,
  extractPlugin: extractCss
})


// plugins
function getPlugins() {
  var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'com/common',
      chunks: Object.keys(entryConfig.entrys),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: path.resolve(__dirname, '../dist/static'),
        ignore: ['.*']
      }
    ])
  ]

  return plugins
}

var webpackConfig = merge(baseWebpackConfig, {
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[chunkhash].js',
    publicPath: publicConf.publicPath,
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: styleLoaders
        }
      },
      {
        test: /\.less$/,
        use: styleLoaders.less
      }
    ]
  },
  plugins: getPlugins()
})

module.exports = webpackConfig
