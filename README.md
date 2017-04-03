# vue-start

> vue + vuex + vue-router + webpack 快速开始脚手架

## 主要工具和知识点

- [vue@2](https://vuejs.org/)
- [vue-router@2](https://router.vuejs.org/)
- [vuex@2](https://vuex.vuejs.org/)
- [webpack@2](https://webpack.js.org/)

## 两个重要环境变量

> `process.env.NODE_ENV`, 表示是本地开发、构建产品、或者测试, 很多类库会判断`process.env.NODE_ENV === 'production'` 来进行日志输出和性能控制

- `development`
- `production`
- `testing`

> `process.env.PROD_ENV`, 表示针对不同发布环境的构建而不同，主要服务于`config/define.conf.js` 和 `config/public.conf.js`，比如不同环境配置不同API 和域名等等...

- 'local'
- 'prod'
- 'test'
- ...

## 目录结构

- `build`: 构建脚本

- `config`: 配置

  - `index.conf.js`: 打包入口配置，chunsk配置等...
  - `define.conf.js`: 针对不同`PROD_ENV`, 配置替换代码中的常量，如环境(`process.env.NODE_ENV`) 或 API地址(`API_BASE_URL`)等等, 使用[webpack.DefinePlugin](https://webpack.js.org/plugins/define-plugin/)插件...
  - `public.conf.js`: 针对不同`PROD_ENV`, 配置打包输出，如publicPath等...
  - `server.conf.js`: 开发环境配置

- `src`： 源码

  - `asset`: 图片，字体等
  - `component`: vue 组件
  - `entry`: 入口js
  - `html`: 页面代码
  - `less`: 独立less文件
  - `lib`: 类库
  - `vuex`: vuex
    - `store`: 主storee
    - `modules`: 子模块
    - `types`: action types 或者 mutation types
  - `routes.js`: 路由配置

- `static`, 纯静态资源，不参与webpack构建

- `test`, 测试脚本

## 开发构建

> 在`package.json` 中的`scripts`中配置

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build-local": "PROD_ENV=local node build/build.js",
  "build": "PROD_ENV=prod node build/build.js",
  "dev": "PROD_ENV=local node build/dev-server.js"
},
```

下面是两个例子，自己可以根据需求在scripts中添加修改自定义命令
```sh
npm install

# 启动本地server
npm run dev

# 构建，产品环境: prod
npm run build

# 构建，产品环境: local
npm run build-local
```

## 开发环境

- node 最新 LTS 版本

## 相关工具

- [vue-cli](https://github.com/vuejs/vue-cli), vue 官方start kit
