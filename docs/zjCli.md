# 组件脚手架

### 准备工作
#### 1. 注册乐有家私有域用户
```bash
npm adduser --registry http://172.16.3.201:4873/
```
![Image text](https://images-tests.leyoujia.com/jjsky/dispatch/2023-03/07/11/Fogb45TjcbwIKJRYemjQr1F16dJr.png)

#### 2. 全局安装zj-cli组件脚手架
```bash
npm i -g zj-cli
```

### 使用说明

#### 1. 创建 gitLab 仓库（创建项目文件夹）

1、前往 [gitLab](http://172.16.3.120/lyj-sub) 新建一个仓库；

2、把项目拉取到本地；

3、打开本地文件夹
> PS：可以不创建远程仓库，在本地打开一个空文件夹后续用 git remote

#### 2. 使用创建命令
打开 cmd（命令行）执行以下命令（ project-name为要新建的组件包名 ）

```bash
zj init project-name
```
![Image text](https://images-tests.leyoujia.com/jjsky/dispatch/2023-03/07/14/Folbk8mXFy_uvb_7KwVURoRL_0iY.png)


#### 3. 开发调试命令
1、安装依赖
```bash
yarn
```
2、开发调试
```bash
yarn dev
```
#### 4. 发布到乐有家私有域
1、打包

```bash
yarn build
```
2、发布

```bash
npm publish --registry http://172.16.3.201:4873/
```

3、取消发布(project-name 为你新建项目时的名称)

```bash
npm unpublish project-name --force --registry http://172.16.3.201:4873/
```

### 模板文件说明
#### 1. 模板目录说明

![Image text](https://images-tests.leyoujia.com/jjsky/dispatch/2023-03/07/14/Fh2vICEcZ3ZQPy2QJfERaJlfl9GR.png)

#### 2. 发版配置说明

1、配置文件 package.json

![Image text](https://images-tests.leyoujia.com/jjsky/dispatch/2023-03/07/14/FvF_fxv4DqBC99UDCH0XQVaP23Pf.png)

2、最终上传到私有域的效果

![Image text](https://images-tests.leyoujia.com/jjsky/dispatch/2023-03/07/14/Fgov337b35lpAkzxfmUafHjM_1GP.png)


### 解决问题
1、正常创建一个新的组件自己去添加一些编译代码的配置，使用了此脚手架可以通过命令行创建出一个基础的组件模板，缩短创建组件的搭建流程。

2、根据组件的应用场景（项目里面是否有当前组件所需的依赖）决定组件打包时是否打包此依赖，从而减小打包的体积大小。

![Image text](https://images-tests.leyoujia.com/jjsky/dispatch/2023-04/19/09/FoMVy3p2FFedN8p1xk3H8tp01YEi.png)

----
### 目前已应用脚手架的组件：  

```
时间选择器组件：  
git地址： http://172.16.3.120/lyj-sub/lyj-datepicker.git  
私有域上传的地址： http://172.16.3.201:4873/-/web/detail/lyj-datepicker
```



