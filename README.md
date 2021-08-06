# autoapi-webpack-plugin

前端注释自动转译 md 文件，webpack 插件。

转译逻辑通过 [babel-autoapi](https://www.npmjs.com/package/babel-autoapi) 实现。

# Installation

```bash
npm i -D autoapi-webpack-plugin
```

# API

| 属性            | 类型            | 是否必填 | 描述                                                       |
| --------------- | --------------- | -------- | ---------------------------------------------------------- |
| **targets**     | Array\<string\> | true     | 需要解析的目标文件，可以传多个                             |
| **merge**       | boolean         | false    | 默认 true，是否合并为一个文件输出                          |
| **toc**         | boolean         | false    | 默认 true，输出文件是否带 [TOC] 目录                       |
| **outFilename** | string          | false    | 默认 'README'，输出单一文件的文件名，`merge = true` 时有效 |
| **outDirname**  | string          | false    | 默认 null，输出多个文件的文件夹名，`merge = false` 时有效  |

# Usage

```javascript
// webpack.config.js
const AutoapiWebpackPlugin = require("autoapi-webpack-plugin");

module.exports = {
  // ...
  plugins: [
    new AutoapiWebpackPlugin({
      targets: ["./src/*.js"],
      merge: false,
      outDirname: "apis",
    }),
  ],
  // ...
};
```
