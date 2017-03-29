const path = require('path');
const fs = require('fs');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebWebpackPlugin = require('web-webpack-plugin');
const { WebPlugin, AutoWebPlugin } = WebWebpackPlugin;

const extractHtml = new ExtractTextPlugin('html/[name].html');

let entrys = getEntrys();
// console.log(entrys);

module.exports = {
  entry: Object.assign(entrys, {
    //
  }),

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    publicPath: '/public/'
  },

   resolve: {
      extensions: ['.js', '.json', '.jsx', '.css', '.vue'],
   },

   module: {
    rules: [
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            attrs: ['script:src', 'img:src'],
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
        test: /\.(jpg|png|gif|otf|eot|svg|ttf|woff2)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'html/index.html'
    })
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
        entrys[newPrefix] = newPrefix;
      }
    });
  }

  walk(entryPath, '');

  return entrys;
}
