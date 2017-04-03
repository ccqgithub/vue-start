var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var utils = require('./utils')
var config = require('../config/index.conf')
var defines = require('../config/define.conf')
var publicConf = require('../config/public.conf')
var entrys = config.entrys
var isProduction = process.env.NODE_ENV == 'production'

// extract css
var extractCss = isProduction ?
  new ExtractTextPlugin('css/[name].[chunkhash].css') :
  new ExtractTextPlugin('css/[name].css')


var styleLoaders = utils.getStyleLoaders({
  extract: isProduction,
  extractPlugin: extractCss
})

// resolve dir
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),

  entry: entrys,

  // cache: false,

  output: {
    path: config.distPath,
    filename: 'js/[name].js',
    publicPath: publicConf.publicPath,
  },

  resolve: {
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
              {
                loader: 'babel-loader',
                options: {
                  'presets': [
                    ['env', {
                      'targets': {
                        'browsers': ['not ie <= 8']
                      }
                    }],
                    'stage-2',
                    'stage-3',
                  ],
                }
              }
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
          {
            loader: 'babel-loader',
            options: {
              'presets': [
                ['env', {
                  'targets': {
                    'browsers': ['not ie <= 8']
                  }
                }],
                'stage-2',
                'stage-3',
              ],
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'imgs/[path].[name].[hash].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[path].[name].[hash].[ext]'
        }
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin(defines),
    extractCss
  ].concat(config.htmlPlugins)
  .concat(config.commonPlugins)
}
