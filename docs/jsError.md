# Node中台接入JS异常监控


---
node中台管理人员：张时徒


## A. lyj-cli

目前通过lyj-cli创建的项目已经默认对接了JS异常监控

但是数据并不会保存，需要前往 Apollo 添加项目

https://i.leyoujia.com/apollo/config.html#/appid=node-middleground&env=TEST&cluster=default

修改logProject参数，新增项目名，以 , 分割

添加完成之后，点击发布

## B. 乾坤子项目（已经创建好的）
新增下方  ++++++++++++++++++++++++ 包裹的代码

#### 1、src/operation/index.js

``` javascript
// 创建VUE实例
async function star(props = {}) {
  const { container } = props
  instance = createApp(App)
  // ++++++++++++++++++++++++
  if (process.env.NODE_ENV !== 'development') {
    let baseUrlList = process.env.BASE_URL.split('/').filter((item) => {
      return item !== null && typeof item !== "undefined" && item !== "";
    })
    new window.menuWindow.ErrorMiddle(window, baseUrlList[baseUrlList.length-1], instance)
  }
  // ++++++++++++++++++++++++
  initIcon(instance)
  initComps(instance)
  instance.use(LyUi, { locale })
  await mountMainProject(instance) // 挂载插件
  instance.use(router)
  instance.mount(container ? container.querySelector('#app') : '#app')
}
```

#### 2、src/operation/stand-alone.js
``` javascript
async function init() {
  try {
    const { data } = await serve.checkIsLogin()
    if (data) {
      await asynCss('https://i.leyoujia.com/jjsloginstatic/css/bootstrap.min.css', 'bootstrap')
      await asynCss('/lyj-front/lyj-menu/ly-menu.css', 'ly-menu')
      await asynScript('https://front.leyoujia.com/js/jquery.js', 'jquery')
      // ++++++++++++++++++++++++
      await asynScript('/lyj-front/js/middleError.js?_=20221026', 'middle-error')
      // ++++++++++++++++++++++++
      const App = await import('@/App.vue')
      instance = createApp(App.default)
      // ++++++++++++++++++++++++
      if (process.env.NODE_ENV !== 'development') { // 正式环境
        console.log = Function.prototype
        let baseUrlList = process.env.BASE_URL.split('/').filter((item) => {
          return item !== null && typeof item !== "undefined" && item !== "";
        })
        new ErrorMiddle(window, baseUrlList[baseUrlList.length-1], instance)
      }
      // ++++++++++++++++++++++++
      initIcon(instance)
      initComps(instance)
      instance.use(LyUi, { locale })
      instance.use(router)
      instance.mount('#app')
    } else {
      window.location.href = location.origin
    }
  } catch (error) {
    window.location.href = location.origin
  }
}
```

#### 3、前往 Apollo 添加项目（看 A 操作）

## C. 其他项目

#### 1、引入JS文档
``` html
<!-- https://itest.leyoujia.com // 根据环境来区分，如果是新系统项目，直接引入 /lyj-front/js/middleError.js 就可 -->
<script src="https://itest.leyoujia.com/lyj-front/js/middleError.js"></script>
```

#### 2、初始化控件

无vue项目

``` javascript
// project-name
new ErrorMiddle(window, 'project-name')
```

vue项目

``` javascript
// vm 为 vue 初始化的实例对象
new ErrorMiddle(window, 'project-name', vm)
```

#### 3、前往 Apollo 添加项目（看 A 操作）



