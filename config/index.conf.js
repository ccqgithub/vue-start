var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin-fix')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  distPath: path.join(__dirname, '../dist'),

  entrys: {
    'index': './src/entry/index.js',
    'test': './src/entry/test.js',
    'com/common': './src/entry/com/common.js',
    'hot-reload-client': './build/dev-client.js'
  },

  commonPlugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'com/common',
      chunks: ['hot-reload-client', 'com/common', 'index'],
      minChunks: 2,
    }),
  ],

  htmlPlugins: [
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
      filename: 'index.html',
      chunks: !isProduction ?
        ['manifest', 'hot-reload-client', 'com/common', 'index'] :
        ['manifest', 'com/common', 'index'],
      chunksSortMode: 'dependency',
      headReplaceExp: /<!-- html-webpack-plugin-css -->/,
      bodyReplaceExp: /<!-- html-webpack-plugin-script -->/,
    }),
    new HtmlWebpackPlugin({
      template: './src/html/test.html',
      filename: 'test.html',
      chunks: !isProduction ?
        ['manifest', 'hot-reload-client', 'com/common', 'test'] :
        ['manifest', 'com/common', 'test'],
      chunksSortMode: 'dependency',
      headReplaceExp: /<!-- html-webpack-plugin-css -->/,
      bodyReplaceExp: /<!-- html-webpack-plugin-script -->/,
    }),
  ]
}
