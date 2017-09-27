const path = require('path');
const publicConf = require('../config/public.conf');
const isProduction = process.env.NODE_ENV === 'production';

// get style loaders
exports.getStyleLoaders = function(options) {
  options = options || {};

  let styleLooader = options.isVue ? 'vue-style-loader' : 'style-loader';
  let cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: isProduction,
      sourceMap: publicConf.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    let loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: publicConf.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return options.extractPlugin.extract({
        use: loaders,
        fallback: styleLooader
      })
    } else {
      return [styleLooader].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}
