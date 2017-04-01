var HtmlWebpackPlugin = require('html-webpack-plugin')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  entrys: {
    'index': './entry/index.js',
    'test': './entry/test.js',
    'com/common': './entry/com/common.js',
    'hot-reload': './build/dev-client.js'
  },

  htmlPlugins: [
    new HtmlWebpackPlugin({
      template: './html/index.html',
      filename: 'index.html',
      chunks: !isProduction ?
        ['manifest', 'hot-reload', 'com/common', 'index'] :
        ['manifest', 'com/common', 'index'],
      chunksSortMode: getChunkSortMode()
    }),
    new HtmlWebpackPlugin({
      template: './html/test.html',
      filename: 'test.html',
      chunks: !isProduction ?
        ['manifest', 'hot-reload', 'com/common', 'test'] :
        ['manifest', 'com/common', 'test'],
      chunksSortMode: getChunkSortMode()
    }),
  ]
}

// getChunkSortMode
function getChunkSortMode() {
  var orders = ['manifest', 'hot-reload', 'com/common', 'index', 'test'];

  return function chunksSortMode(c1, c2) {
    let o1 = orders.indexOf(c1.names[0]);
    let o2 = orders.indexOf(c2.names[0]);
    return o1 - o2;
  }
}
