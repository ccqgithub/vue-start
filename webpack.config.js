const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const publicMainPath = '/';
const outputPath = path.resolve(__dirname, 'public');

// extract css
const extractLESS = new ExtractTextPlugin(`css/[name].[chunkhash].css`);


// let entrys = getEntrys();
// console.log(entrys);

module.exports = {
  context: __dirname,

  entry: {
    'index': './entry/index.js',
    'test': './entry/test.js',
    'com/common': ['./entry/com/common.js'],
    'client': ['webpack-hot-middleware/client'],
  },

  output: {
    path: outputPath,
    filename: `js/[name].js`,
    publicPath: publicMainPath,
  },

   resolve: {
      extensions: ['.js', '.json', '.jsx', '.css', '.vue', '.less'],
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
          // vue-loader options
        }
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ]
      },
      {
        test: /\.less$/,
        use: extractLESS.extract({
          publicPath: `${publicMainPath}css/`,
          use: [
            // {
            //   loader: "style-loader"
            // },
            {
              loader: "css-loader"
            },
            {
              loader: 'less-loader'
            },
          ]
        })
      },
      {
        test: /\.(jpg|jpeg|png|gif|otf|eot|svg|ttf|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: `[path][name].[hash].[ext]`,
              publicPath: publicMainPath,
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'com/common',
      chunks: ['client', 'com/common', 'index', 'test'],
      // minChunks: 2,
      // children: true,
      // async: false,
      // minSize: 0,
    }),
    extractLESS,
    // entry htmls
    new HtmlWebpackPlugin({
      template: './html/index.html',
      filename: 'index.html',
      chunks: ['client', 'manifest', 'com/common', 'index'],
      chunksSortMode: getChunkSortMode(['manifest', 'client', 'com/common', 'index'])
    }),
    new HtmlWebpackPlugin({
      template: './html/test.html',
      filename: 'test.html',
      chunks: ['manifest', 'com/common', 'test'],
      chunksSortMode: getChunkSortMode(['manifest', 'com/common', 'test'])
    }),
  ],

  devServer: {
    contentBase: outputPath,
    compress: true,
    hot: true,
    hotOnly: true,

    host: '0.0.0.0',
    port: 9000,
    inline: true,


    // 代理，api接口代理
    // 详情见：https://github.com/chimurai/http-proxy-middleware
    proxy: {
      '/api': 'http://www.baidu.com/api/'
    }
  }
}

function getChunkSortMode(orders) {
  return function chunksSortMode(c1, c2) {
    let o1 = orders.indexOf(c1.names[0]);
    let o2 = orders.indexOf(c2.names[0]);
    return o1 - o2;
  }
}
