/**
 * 配置页面入口，和打包
 */

module.exports = {
  commons: [
    {
      name: 'com/common',
      js: './src/entry/com/common.js'
    }
  ],
  pages: [
    {
      name: 'index',
      js: './src/entry/index.js',
      template: './src/html/index.html',
      filename: 'index.html'
    },
    {
      name: 'test',
      js: './src/entry/test.js',
      template: './src/html/test.html',
      filename: 'test.html'
    }
  ]
}
