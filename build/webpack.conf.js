var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackPlaceAssetsPlugin = require('html-webpack-place-assets-plugin')
var utils = require('./utils')
var entryConfigs = require('../config/entry.conf')
var defines = require('../config/define.conf')
var publicConf = require('../config/public.conf')
var isProduction = process.env.NODE_ENV == 'production'

// extract css
var extractCss = isProduction ?
  new ExtractTextPlugin('css/[name].[chunkhash].css') :
  new ExtractTextPlugin('css/[name].css')

// styleLoaders
var styleLoaders = utils.getStyleLoaders({
  extract: isProduction,
  extractPlugin: extractCss
})

// babelLoaderOptions
var babelLoaderOptions = {
  loader: 'babel-loader',
  options: {
    'presets': [
      ['env', {
        'targets': {
          'browsers': ['> 1%', 'not ie <= 8']
        }
      }],
      'stage-2',
      'stage-3',
    ],
    'plugins': [
      'add-module-exports'
    ]
  }
}

// entrys
var entrys = {
  'hot-reload-client': [
    'eventsource-polyfill',
    'webpack-hot-middleware/client?noInfo=true&reload=false'
  ]
}

entryConfigs.commons.forEach(item => {
  entrys[item.name] = item.js
})

entryConfigs.pages.forEach(item => {
  entrys[item.name] = item.js
})

// commonPlugins
var commonPlugins = []

entryConfigs.commons.forEach(item => {
  commonPlugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: item.name,
      minChunks: 2,
    }),
  )
})

// htmlPlugins
var htmlPlugins = [
  new HtmlWebpackPlaceAssetsPlugin({
    headReplaceExp: /<!-- html-webpack-plugin-css -->/,
    bodyReplaceExp: /<!-- html-webpack-plugin-script -->/,
    tagsJoin: '\n  ',
  })
]

entryConfigs.pages.forEach(item => {
  var chunksDev = ['manifest', 'hot-reload-client']
    .concat(entryConfigs.commons.map(item => item.name))
    .concat(item.name);
  var chunksProd = ['manifest']
    .concat(entryConfigs.commons.map(item => item.name))
    .concat(item.name);

  htmlPlugins.push(
    new HtmlWebpackPlugin({
      template: item.template,
      filename: item.filename,
      chunks: isProduction ? chunksProd : chunksDev,
      chunksSortMode: 'dependency',
      inject: false
    })
  )
})

// resolve dir
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),

  entry: entrys,

  cache: false,
  devtool: isProduction ? '' : '#cheap-module-eval-source-map',

  output: {
    path: publicConf.distPath,
    filename: 'js/[name].[hash].js',
    publicPath: publicConf.publicPath,
  },

  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      //
    }
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            attrs: ['img:src'],
            minimize: true,
            removeComments: false,
            collapseWhitespace: false,
            removeAttributeQuotes: false,
            interpolate: 'require',
          }
        }]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: Object.assign({}, styleLoaders, {
            js: [
              babelLoaderOptions
            ]
          })
        }
      },
      {
        test: /\.less$/,
        use: styleLoaders.less
      },
      {
        test: /\.js$/,
        include: [resolve('src'), resolve('test')],
        use: [
          babelLoaderOptions
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'imgs/[path][name].[hash].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[path][name].[hash].[ext]'
        }
      }
    ]
  },

  plugins: [
    // new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin(defines),
    extractCss,
  ]
  .concat(htmlPlugins)
  .concat(commonPlugins)
  .concat([
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../root'),
        to: path.resolve(publicConf.distPath),
        ignore: ['.*']
      }
    ])
  ])
  .concat(isProduction ? [] : [
    new webpack.HotModuleReplacementPlugin(),
  ])
  .concat(!publicConf.compress ? [] : [
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
}
