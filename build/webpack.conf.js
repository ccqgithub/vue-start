const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PlaceAssetsPlugin = require('html-webpack-place-assets-plugin');
const utils = require('./utils');
const findEntry = require('./find-entry');
const defines = require('../config/define.conf');
const publicConf = require('../config/public.conf');
const isProduction = process.env.NODE_ENV === 'production';

// context path
const contextPath = path.resolve(__dirname, '../');

// extract css
let extractCss = isProduction ?
  new ExtractTextPlugin('css/[name].[chunkhash].css') :
  new ExtractTextPlugin('css/[name].css')

// styleLoaders: css, less, scss, sass, styl, stylus, postcss
let styleLoaders = utils.getStyleLoaders({
  extract: isProduction,
  extractPlugin: extractCss
})

// babelLoaderOptions
let babelLoaderOptions = {
  loader: 'babel-loader',
  options: {
    'presets': [
      'react',
      ['env', {
        'targets': {
          'browsers': ['> 1%', 'ie >= 8']
        },
        useBuiltIns: true
      }],
      'stage-3',
    ],
    'plugins': [
      // 'add-module-exports'
    ].concat(
      // react hot loader
      isProduction ? [] : 'react-hot-loader/babel'
    )
  }
}

// hot reload entry
let hotReloadEntry = [
  'webpack-hot-middleware/client?reload=false',
  'react-hot-loader/patch',
];

// entrys
let entryConfigs = findEntry({
  // contextDir
  contextPath: contextPath,
  // entryDir
  entryPath: path.resolve(contextPath, './src/entry/'),
  // group the entry files
  group(p) {
    if (/\.jsx$/.test(p)) {
      return 'react';
    } else {
      return 'vue';
    }
  }
});

let entries = entryConfigs.entries;
let entryObj = {};

entries.forEach((item) => {
  entryObj[item] = isProduction ?
    './' + item :
    hotReloadEntry.concat('./' + item);
});

// commonPlugins
let cssFileRe = /^.*\.(css|sass|scss|less|styl)$/;
let commonPlugins = [
  // vue
  {
    name: 'com-vue',
    minChunks: function (module, count) {
      let re = /src\/lib|node_modules/;
      return module.context
        && re.test(module.context)
        && !cssFileRe.test(module.resource);
    },
    chunks: entryConfigs.entryGroups.vue || [],
  },
  {
    name: 'vendor-vue',
    minChunks: function (module, count) {
      let re = /node_modules/;
      return module.context
        && re.test(module.context)
        && !cssFileRe.test(module.resource);
    },
    chunks: ['com-vue']
  },
  {
    name: 'vendor-vue-core',
    minChunks: function (module, count) {
      let re = /node_modules\/.*?(vue|vue-router|vuex)/;
      return module.context
        && re.test(module.context)
        && !cssFileRe.test(module.resource);
    },
    chunks: ['vendor-vue']
  },
  // react
  {
    name: 'com-rc',
    minChunks: function (module, count) {
      let re = /src\/lib|node_modules/;
      return module.context
        && re.test(module.context)
        && !cssFileRe.test(module.resource);
    },
    chunks: entryConfigs.entryGroups.react || [],
  },
  {
    name: 'vendor-rc',
    minChunks: function (module, count) {
      let re = /node_modules/;
      return module.context
        && re.test(module.context)
        && !cssFileRe.test(module.resource);
    },
    chunks: ['com-rc']
  },
  {
    name: 'vendor-rc-core',
    minChunks: function (module, count) {
      let re = /node_modules\/.*?(react|react-dom)/;
      return module.context
        && re.test(module.context)
        && !cssFileRe.test(module.resource);
    },
    chunks: ['vendor-rc']
  },
  // manifest
  {
    name: "manifest",
    minChunks: Infinity,
    chunks: ['vendor-rc-core', 'vendor-vue-core'],
  }
].map(item => {
  return new webpack.optimize.CommonsChunkPlugin(item);
});

let commonChunks = {
  vue: ['com-vue', 'vendor-vue', 'vendor-vue-core'],
  react: ['com-rc', 'vendor-rc', 'vendor-rc-core'],
};

// htmlPlugins
let htmlPlugins = [
  new PlaceAssetsPlugin({
    headReplaceExp: /<!-- html-webpack-plugin-css -->/,
    bodyReplaceExp: /<!-- html-webpack-plugin-script -->/,
    tagsJoin: '\n  ',
  })
];

// html files
let groups = Object.keys(entryConfigs.entryGroups);

groups.forEach(groupName => {
  entryConfigs.entryGroups[groupName].forEach(item => {
    let template = item.replace(/.*src\/entry\/(.*)\.(js|jsx)$/, 'src/html/$1.html');
    let filename = item.replace(/.*src\/entry\/(.*)\.(js|jsx)$/, '$1.html');
    let chunks = ['manifest']
      .concat(commonChunks[groupName])
      .concat(item);

    htmlPlugins.push(
      new HtmlWebpackPlugin({
        template: template,
        filename: filename,
        chunks: chunks,
        chunksSortMode: 'dependency', //'dependency',
        inject: false
      })
    );
  });
});

module.exports = {
  context: contextPath,

  entry: entryObj,

  cache: false,

  output: {
    path: publicConf.distPath,
    filename: 'js/[name].[hash].js',
    publicPath: publicConf.publicPath,
  },

  resolve: {
    modules: [
      'node_modules',
      path.resolve(contextPath, '../node_modules')
    ],
    extensions: ['.js', '.jsx', '.vue', '.json'],
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
        test: /\.css$/,
        use: styleLoaders.css
      },
      {
        test: /\.scss$/,
        use: styleLoaders.scss
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(contextPath, './src'),
          path.resolve(contextPath, './test')
        ],
        use: [
          babelLoaderOptions
        ]
      },
      {
        test: /\.jsx$/,
        include: [
          path.resolve(contextPath, './src'),
          path.resolve(contextPath, './test')
        ],
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
  // named module, the module's id is not number, but hash or path , so the vendor can long cache
  .concat(
    isProduction ?
    new webpack.HashedModuleIdsPlugin({
      hashDigestLength: 4
    }) :
    new webpack.NamedModulesPlugin()
  )
  .concat(htmlPlugins)
  .concat(commonPlugins)
  .concat([
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(contextPath, './root'),
        to: path.resolve(publicConf.distPath),
        ignore: ['.*']
      }
    ])
  ])
  .concat(
    isProduction ?
    [] :
    [
      new webpack.HotModuleReplacementPlugin(),
    ]
  )
  .concat(
    publicConf.compress ?
    [
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
      })
    ] :
    []
  )
}
