# 安装 LyUi

> **说明**：本文面向**已有或新建的前端业务工程**。请在该项目内按下方步骤连接 registry 并安装 `ly-ui`；**只有依赖安装完成**且按 [快速上手](/#/zh-CN/component/quickstart) 引入入口与样式后，各组件文档中的示例才能在工程中运行。

## 环境支持

- 现代浏览器

| ![IE](https://cdn.jsdelivr.net/npm/@browser-logos/edge/edge_32x32.png) | ![Firefox](https://cdn.jsdelivr.net/npm/@browser-logos/firefox/firefox_32x32.png) | ![Chrome](https://cdn.jsdelivr.net/npm/@browser-logos/chrome/chrome_32x32.png) | ![Safari](https://cdn.jsdelivr.net/npm/@browser-logos/safari/safari_32x32.png) |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Edge                                                                   | last 2 versions                                                                   | last 2 versions                                                                | last 2 versions                                                                |

> 由于 Vue3 不再支持 IE11，故而 ly-ui 也不支持 IE11 及之前版本。

## 当前最新版本

ly-ui 目前还处于快速开发迭代中：

[ly-ui version 1.2.29](http://172.16.3.201:4873/-/web/detail/ly-ui)

## 通过 npm 或者 yarn 安装

**我们推荐使用包管理器的方式安装**，它能更好地和 [vite](https://vitejs.dev), [webpack](https://webpack.js.org/)
打包工具配合使用。

使用前，需要先连接到npm 私服
```shell
$ npm set registry http://172.16.3.201:4873/
```

```shell
$ npm install ly-ui --save
```

```shell
$ yarn add ly-ui
```

## Hello world

如果是通过 npm / yarn 安装，并希望配合打包工具使用，请阅读下一节：[快速上手](/#/zh-CN/component/quickstart)。
