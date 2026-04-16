## 新建微项目完整流程

介绍新系统新建微项目的完整流程，请从上往下走完全流程。

### 菜单配置

1、前往 [itest 菜单配置页](http://itest.leyoujia.com/jjslogin/menuConfig/topic_list)、[3.100 菜单配置页](http://172.16.3.100/jjslogin/menuConfig/topic_list)
配置菜单（新项目具体配置在哪个一级菜单下，可询问相关负责人，一般为产品经理）；

2、复制即将要配置的一级菜单编码；

3、点击 子菜单 按钮进入二级菜单，点击新增按钮创建菜单；

![新增菜单](https://7xln4b.com1.z0.glb.clouddn.com/lxt/project/Fk2BIujZc97AvycOjNQoVqAtTlO0.png)

>  地址组成分析： /lyj-menu/一级菜单编码/二级菜单编号。

### 创建 gitLab 仓库

1、前往 [gitLab](http://172.16.3.120/) 新建一个仓库；

> PS：特别注意！！！仓库名称需要与项目名称保持一致

![新建仓库示例](https://7xln4b.com1.z0.glb.clouddn.com/lxt/project/FkAv1ch7GVtx29S-CWM77z3vxFTZ.png)

2、把项目拉取到本地；

### 新建项目

1、npm 先连接到私服镜像，如果之前已经改过镜像，那么不需要再次修改（不需要使用淘宝镜像，私服已经提供了淘宝镜像的功能）；

```shell
$ npm set registry http://172.16.3.201:4873/
```

2、安装脚手架 [lyj-cli](http://172.16.3.201:4873/-/web/detail/lyj-cli)；

```shell
$ npm i -g lyj-cli
```

3、打开 cmd（命令行） 定位到刚刚从gitLab上拉取到本地的文件夹中，执行以下命令（ project-name为要新建的项目名 ）；

```shell
$ lyj init project-name
```

4、按要求输入两个值：

a. 项目中文名

b. 主项目访问链接（第一步通过菜单创建的链接）

### 配置本地 host (目前只支持直接使用IP地址访问，所以可以去掉这个部分了)

前往 C:\Windows\System32\drivers\etc，找到 host 文件最后添加：127.0.0.1 dev.leyoujia.com  （一个电脑只需要配置一次）

### 启动项目

1、安装项目依赖

```shell
$ yarn
```

2、启动本地服务

```shell
$ yarn serve
```
3、配置 Ngnix 服务，并启动

>  ng 的作用有两个： a. 转发 itest 的登录服务； b. 转发 itest 主项目；

nginx.conf 示例（如果遇到无法启动的情况，可能是从这里复制出来的携带有特殊符号，请联系前端负责人拿一份配置文件）：

```shell
worker_processes  1;

events {
    worker_connections  1024;
}

http {
  include    mime.types;
  default_type  application/octet-stream;

  sendfile        on;
  keepalive_timeout  100; #连接超时时间，1分钟，具体时间可以根据请求（例如后台导入）需要的时间来设置
  proxy_connect_timeout 100; # 单位 秒
  proxy_read_timeout 100;
  client_max_body_size 1000m;

  server {
    listen     80;
    server_name  127.0.0.1 172.16.7.229; # 域名或者服务器IP
    # server_name  http://172.16.7.229/; # 域名或者服务器IP

    #根目录访问的时候切换到登录链接
    if ( $request_uri = '/' ) {
      rewrite ^/(.*)$ jjslogin/tologin permanent;
    }

    # 根目录
    location ^~ / {
      # proxy_pass http://172.16.3.100/;
      proxy_pass http://itest.leyoujia.com/;
    }

    # 指定 /lyj-menu
    # location /lyj-menu {
    #   proxy_pass http://172.16.3.100/lyj-menu/;
    # }

    location ^~ /lyj-front/ly-ui {
      proxy_pass http://127.0.0.1:8080/lyj-front/ly-ui/;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
      proxy_set_header Host $host;
    }
  }
}
```

4、通过乾坤头部访问开发环境

http://172.16.X.XXX/lyj-menu/一级菜单编码/二级菜单编号
