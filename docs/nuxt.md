## NUXT


---
Nuxt 目前采用的是vue2.x的语法，nuxt中不需要配置vue-router，page下的文件结构即是路由；
目前项目模板适配了移动端，引入了font-size js 和 vant
> * [Vant文档地址](https://vant-contrib.gitee.io/vant/#/zh-CN/)
> * [Nuxt文档地址](https://www.nuxtjs.cn/)
> * [项目模板地址git地址](http://172.16.3.120/front-end/nuxt-demo.git)

nuxt3 (vue3语法) 还在bata阶段 可能不是那么稳定 后续发布正式版了可以考虑升级下 性能这块有很大提升
> * [github地址](https://github.com/nuxt/framework)
> * [文档地址](https://v3.nuxtjs.org/)
### 项目目录

![目录结构](https://front.leyoujia.com/wap-nuxt/nuxt-com-ck.png)

### 目录说明

| 目录名称   |  说明  |
| --------   | -----  |
| .nuxt   | 项目运行的资源文件 |
| assets   | 公共图片css资源存放路径 |
| layout   | 基础路由入口  |
| middleware   | 项目页面路由架构（运行生成的router是根据这个文件夹下面的目录接口来生成路由规则的）  |
| pages   | 中间件  |
| plugins   | 插件 需要在nuxt.config.js 中引用  |
| static   | 静态资源文件  |
| store   | vuex状态管理器  |
| uitls   | 工具类  |
| .babelr   | babel配置文件  |
| .browserslistrc   | 浏览器兼容配置  |
| .editorconfig   | 代码风格配置文件  |
| .eslintrc   | eslint配置文件  |
| .eslintrc   | eslint配置文件  |
| nuxt.config.js | nuxt配置文件 |
| pm2.config.js | pm2进程守护的配置文件（使用pm2 reload pm2.config.js 启动项目） |

### 运行

1、本地开发启动
```
yarn dev / npm run dev
```
2、线上启动
```
第一次启动
pm2 start npm  -- “package.json中的name” -- run start
后续代码更新重启
npm run start / pm2 restart pm2.config.js
```
启动成功之后 pm2 list 可以查看项目是否启动成功

### 服务器环境安装
前提是你需要一台服务器 连接工具[Xshell下载地址](https://www.netsarang.com/zh/xshell-download/)

1、安装node（[node版本列表](https://nodejs.org/dist))
```
1）
    wget https://nodejs.org/dist/v10.15.3/node-v10.15.3-linux-x64.tar.xz；
2）解压node
    tar -xvf node-v10.15.3-linux-x64.tar.xz
3）进入到node的安装目录对node包重命名
    mv node-v10.15.3-linux-x64 node
4）配置软链(环境变量)
    ln -s node安装路径/bin/node /usr/bin/node
    ln -s node安装路径/bin/npm /usr/bin/npm
5）进入到node按照目录下创建全局的node包管理目录和缓存目录
    mkdir node_global
    mkdir node_cache
    npm config set prefix "node_global"
    npm config set cache "node_cache"
```

2、安装pm2 ([pm2文档](https://pm2.keymetrics.io/docs/usage/quick-start/))
```
step1（安装pm2）
    npm i pm2 -g
step2（配置环境变量）
    ln -s node安装路径/node_global/bin/pm2 /usr/bin/pm2
step3
    pm2 -v 查看是否安装成功
```
2、配置nginx
```
server {
    listen       80;
    server_name  127.0.0.1 localhost; # 域名或P者服务器I
    # front-wap 是nuxt项目中配置的全局路由地址 
    location ^~ /front-wap/ {
        proxy_pass http://127.0.0.1:3000/front-wap/;
    }
}
```

