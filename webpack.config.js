const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// extract css
const extractLESS = new ExtractTextPlugin('[name].css');

// let entrys = getEntrys();
// console.log(entrys);

module.exports = {
  context: __dirname,

  entry: Object.assign({
    a: './entry/a.js',
    b: './entry/b.js',
    'com/common': ['./entry/com/common.js'],
    'test-less': './less/test.less'
  }),

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js',
    publicPath: '/public/'
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
            attrs: ['img:src', 'script:src'],
            minimize: true,
            removeComments: false,
            collapseWhitespace: false
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
              limit: 10000
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './html/index.html',
      // chunks: ['a']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'com/common',
      minify: false,
    }),
    extractLESS
  ],

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000
  }
}

// return all entrys
function getEntrys() {
  let entrys = {};
  let entryPath = path.join(__dirname, './entry');

  function walk(p, prefix) {
    let dirList = fs.readdirSync(p);

    dirList.forEach(function(item) {
      let f = path.join(p, item);
      let newPrefix = prefix + '/' + item;

      if (fs.statSync(f).isDirectory()) {
        walk(f, newPrefix);
      } else if (fs.statSync(f).isFile()) {
        newPrefix = newPrefix.replace(/^\//, '');
        entrys[newPrefix] = './' + newPrefix;
      }
    });
  }

  walk(entryPath, 'entry');

  return entrys;
}
