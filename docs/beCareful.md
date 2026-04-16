## 微项目开发注意事项

记录使用乾坤开发微项目时遇到的坑，以及必要的注意事项

### 模板介绍

#### 目录结构

![目录结构](https://7xln4b.com1.z0.glb.clouddn.com/lxt/project/FpLAoelU-_FQig7s5kv9ScP1YUbt.png)

| 文件/文件夹       | 说明                                                                 |
| ---------- | ------------------------------------------------------------------- |
| public     | 静态资源（不经过打包）                                             |
| assets     | 图片/css/其他资源（会经过打包）                                     |
| components     | 页面组件（LeYouJia目录下的组件会自动全局导入）                   |
| icons     | 微项目图标库，配置 lyj-icon 组件使用    |
| operation     | 存放乾坤微项目启动代码    |
| operation/plugIn.js     | 插件注册    |
| router     | 路由文件    |
| server     | 存放接口    |
| store     | 存放全局变量，函数等，工厂函数等（并非Vuex）    |
| unit     | 存放通用方法    |
| views     | 页面    |
| .env.development     | 开发环境变量    |
| .env.production     | 打包之后的环境变量    |
| vue.config.js     | vue-cli 配置文件    |

### operation/plugIn.js 插件注册

> 乾坤的微项目不能直接通过 script 引入，所以提供了以下引入外链文件的方式

#### 1、配置 PLUGIN 数组

```javascript
const PLUGIN = [{
  plugName: 'autoComplugins',
  url: 'https://front.leyoujia.com/plugins/autoComplugins/v3/autoComplugins.js',
  type: 1,
  explain: '人员插件'
}]
```

| 参数       | 说明                                                                 | 类型            | 可选值 | 默认值 |
| ---------- | -------------------------------------------------------------------- | --------------- | ------ | ------ |
| plugName     | 如果是自己引入的，自己定一个插件名，注意不要重复                       | string | —      | —      |
| url     | 链接，注意这里需要提供 http/https 链接                       | string | —      | —      |
| type     | 引入类型                       | number | 1：通过 script 标签引入插件；2：通过 vue.component 注入组件；3：通过 vue.use 方法注入插件；4：通过 vue.directive 方法注入指令；5： 注入一个 function 方法；     | —      |
| explain     | 简介                       | string | —      | —      |

#### 2、window.middleground API


| 名称       | 说明                                                                 | 参数 |
| ---------- | ------------------------------------------------------------------- | ---------- |
| middlegroundMap     | 输出所有可用的插件列表                                                  | —      |
| injectedPlugIn     | 当前项目已注入插件列表                                                  | —      |
| init     | 注入PLUGIN配置的插件                                                  | 接收两个参数 (PLUGIN, vm)      |
| postPlugIn     | 导入一个新的插件                                                  | 接收 PLUGIN 中的一个插件对象     |
| registerPlugIn     | 根据 plugName 注册插件到项目中                                                  | 接收两个参数 (plugName, vm)      |

#### 3、系统预设插件

| 插件       | 说明                                                                 |
| ---------- | ------------------------------------------------------------------- |
| tag_plugin     | 标签中台插件                                                  |
| autoComplugins     | 人员插件                                                  |

### window 问题

开发微项目的过程中使用 window 需要特别注意，由于乾坤的机制，页面实际有两个 window，一个是当前微项目的 window，另一个是主项目的 window；

我们在浏览器的控制台中打印出来的 window 是主项目的。而在代码中 console.log 输出的 window 是当前项目的；如果要使用主项目的 window，可以使用 window.menuWindow 获取。
```javascript
window.menuWindow
```

### 页面跳转问题

不能直接使用 vue-router 的 router.push() 进行页面跳转；

应该使用 router.qkGo() ；该方法接收参数与 router.push 一致

#### router 配置

在使用 router 配置的时候应该注意以下问题

1、需要配置 meta.title 属性，提供给页面标签的标题使用

2、如果有面包屑的需求，则需要配置一下 meta.breadcrumb 属性，配合 <Breadcrumb></Breadcrumb> 组件使用

meta.breadcrumb 参数说明

title

| 参数       | 说明                                                                 |
| ---------- | ------------------------------------------------------------------- |
| name     | 面包屑跳转页面的name                                                  |
| title    | 面包屑使用文本                                                  |

### server 接口调用

在 server 目录下新建 xxxServer.js，接口可以按照模块区分文件

示例 xxxServer.js
> 这里是为了演示，并非实际接口，所以基本用了同一个接口名称
```javascript
import {
  get,
  post,
  postQuery,
  postFormQuery,
  postFormData,
} from './unit'

/**
 * ListTablePage 模块
 */
class Server {
  @get()
  getList() {
    return '/college_web/lxt-plan/query'
  }

  @get()
  getListUrlParam() {
    return '/college_web/lxt-plan/{id}'
  }

  @post()
  postPlan() {
    return '/college_web/lxt-plan/{id}'
  }
}

export default new Server()
```

示例 调用接口

```javascript
import serve from '@http/listServer'

serve.getList()

serve.getListUrlParam({
  id: 1
})

serve.postPlan({
  id: 1,
  name: '计划'
})

// 所有类型均用此方式调用接口...
```

#### 装饰器说明

| 装饰器       | 说明                                                                 |
| ---------- | ------------------------------------------------------------------- |
| get     | get 方法，使用标准的 query 传参                                                  |
| post    | post 方法，用标准的 JSON 格式                                                  |
| postQuery    | post方法，用 JSON 格式，但是服务器是通过 query 接收参数的情况                                                |
| postFormQuery    | post方法，用 from 格式，但是服务器是通过 query 接收参数的情况                                            |
| postFormData    | post方法，用 from 格式，但是服务器接收参数，并非标准的from格式，也并非query的情况，可以尝试使用这个          |

### view 页面开发说明

1. 页面使用 script setup 方式开发，写法从vue官方文档中查阅 [VUE官方文档地址](https://v3.cn.vuejs.org/api/sfc-script-setup.html#%E5%9F%BA%E6%9C%AC%E8%AF%AD%E6%B3%95)

2. 表格尽量使用 [ly-table-page](http://itest.leyoujia.com/lyj-front/ly-ui/#/zh-CN/component/table-page) 组件开发，
目前只有使用 [ly-table-page](http://itest.leyoujia.com/lyj-front/ly-ui/#/zh-CN/component/table-page) 组件才可对接视图组件,
[ly-table-page](http://itest.leyoujia.com/lyj-front/ly-ui/#/zh-CN/component/table-page) 使用配置项同样可以配置出纯表格，而不是一个完整的页面,
如果有不满足需求的地方，可以联系上级修改组件。

3. 模板内置 LyjTabs 组件，接收属性 tabConfig[Array]

| 参数       | 说明                                                                 | 类型 |
| ---------- | ------------------------------------------------------------------- | ---- |
| label     | tab显示的名称                                        | string |
| routeName     | 点击tab跳转的页面名称                                        | string |
| query     | 点击tab跳转页面的 query 传参                                        | object |

4. 内置 LyjIcon 组件，可以与 icons 文件夹中的图标相对应，使用时只需要将图标放置相对应的文件夹，就可以直接使用该图标

| 参数       | 说明                                                                 | 类型 | 可选值 | 默认值 |
| ---------- | ------------------------------------------------------------------- | ---------- | ---------- | ---------- |
| iconType     | icon图标的类型                                        | string      | svg/png      | svg      |
| icon     | icon 图标文件的文件名                                        | string      | —      | —      |
| className     | 给icon自定义className                                        | string      | —      | —      |
| w     | icon的宽度                                        | string      | —      | 16      |
| h     | icon的高度                                        | string      | —      | 16      |

5. 在主项目中注入的原型方法，微项目可直接使用

| 方法       | 说明                                                                 | 参数 | 默认值 |
| ---------- | ------------------------------------------------------------------- | ---- | ---- |
| String.prototype.realWidth     | 返回该字符串显示到页面中，实际宽度为多少            | css 的 font 属性值 | '13px PingFangSC-Medium, PingFang SC' |
| Window.prototype.compose     | 函数合成，将传入的函数按照倒序依次执行               | [function, function, ...] | —      |
| Window.prototype.asyncScript     | 导入js               | (url, id) | —      |
| Window.prototype.asyncCss     | 导入css               | (url, id) | —      |
| Window.prototype.getClientHeight     | 取窗口可视范围的高度               | —  | —      |

### 微项目配置页

如果遇到需要修改已经创建好的url链接的情况，可以在微项目配置页进行修改

点击可以进去查看，也可以自己输入链接进去，域名/lyj-menu/config

[开发环境](http://dev.leyoujia.com/lyj-menu/config)

[测试环境](http://itest.leyoujia.com/lyj-menu/config)

[3.100](http://172.16.3.100/lyj-menu/config)

[正式环境](http://i.leyoujia.com/lyj-menu/config)

> 此处要注意，不管是线上线下，尽量保持环境整洁，不要配置无用的项目进去，新增上去的无效项目，自己删除

> 使用 lyj-cli 通过脚手架创建项目，会自动在 3.100 与 itest 环境配置好对应项目，如果是通过脚手架创建了无效的项目，记得前往这两个环境删除掉无效的项目


### 同一个项目配置多个菜单入口

之前通过脚手架，我们得到的二级菜单链接为：
```
/lyj-menu/一级菜单编码/二级菜单编号
```

但是这种方式只能支持到二级菜单，想要在一个项目里配置出多个三级菜单，可以前往 [itest 菜单配置页](http://itest.leyoujia.com/jjslogin/menuConfig/topic_list)、[3.100 菜单配置页](http://172.16.3.100/jjslogin/menuConfig/topic_list)
配置菜单，然后使用参数的方式去识别 url

> 三级菜单依旧绕不开二级菜单，所以依旧要要配置
>
> 重点注意，二级菜单地址不能配置为空！！不能配置为空！！不能配置为空！！否则老的头部点击二级菜单会直接跳转到登录页面。
>
> 建议使用第一个三级菜单的地址

三级菜单 url 规则:

```
/lyj-menu/一级菜单编码/二级菜单编号?submenu=三级菜单编号#/微项目路由地址
```

### 修改导航菜单icon

> 目前修改导航菜单的icon十分麻烦，需要到主项目中修改
>
> 后期会在菜单配置页面上传 icon，待开发中

1. 从 gitLab 上拉取 [主项目](http://172.16.3.120/lyj-front/lyj-menu.git)

2. 将设置指定的 icon 放置于 src/icons/svg 目录下，修改 icon 的名称于菜单编码一致即可。icon 仅支持 svg 格式 （需要注意正式环境的菜单编码可能会与测试环境不同，这里需要使用正式环境的编码）

3. 打包部署

4. 上线的时候主项目同样需要发版

### 隐藏侧边栏

链接上携带参数 hideSideBar = true 即可隐藏侧边栏

例如： https://itest.leyoujia.com/lyj-menu/zxxy/newLxt?submenu=banner&hideSideBar=true#/banner/index


### 子项目独立运行

独立运行项目启动入口文件：
src\operation\stand-alone.js

通过乾坤运行项目启动入口文件：
src\operation\index.js

可以通过直接访问： /lyj-front/projectName 直接访问项目，但是如果项目引入了插件，需要到 stand-alone.js 写一下引用
