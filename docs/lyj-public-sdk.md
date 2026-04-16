# 新系统与APP端轻应用公用方法sdk

### 使用方法
-----
#### 1.引入方式
> \operation\plugIn vue项目增加公共js引入，如下图：

![Image text](https://images-tests.leyoujia.com/workflowplatform/follow/2025-06/24/18/FjTJjn9M9GSxxxxrcALPLF95wBAB.png)


> jq 需要在项目引入下面的cdn文件

```html
<script type="text/javascript" src="https://front.leyoujia.com/front_cdn/common/js/CommonUtils.js"></script>
```

-----

#### 使用组件

:::demo 该组件会暴露在window下，需手动调用，下面是window.CommonUtils.dateFormat日期格式的调用：

```html
<template>
    <div>日期格式：{{ dateValue}}</div>
    <br/>
    <ly-select style="width:240px;" v-model="value" placeholder="请选择格式" @change="changeDateFormat">
        <ly-option label="YYYY-mm-dd HH:MM:SS格式" value="YYYY-mm-dd HH:MM:SS"></ly-option>
        <ly-option label="YYYY-mm-dd格式" value="YYYY-mm-dd"></ly-option>
        <ly-option label="YYYY/mm/dd HH:MM:SS格式" value="YYYY/mm/dd HH:MM:SS"></ly-option>
        <ly-option label="YYYY-mm-dd格式" value="YYYY-mm-dd"></ly-option>
  </ly-select>
</template>
<script>
    export default {
        data() {
            return {
                dateValue: '2025.06.24 18:20:55',
                value: ''
            }
        },
        mounted() {
            this.loadCommonUtils();
        },
        methods: {
            loadCommonUtils() {
                const script = document.createElement('script');
                script.src = 'https://front.leyoujia.com/front_cdn/common/js/CommonUtils.js';
                script.onload = () => {
                    console.log('CommonUtils加载成功');
                };
                document.head.appendChild(script);
            },
            changeDateFormat(){
                if(window.CommonUtils){
                    this.dateValue = window.CommonUtils.dateFormat(new Date(), this.value);
                }
            },
        }
    }
</script>
```

:::

------



### 可调用方法

| 方法名       | 说明                     | 类型     | 参数                          | 默认值 |
| ---------  | ------------------------ | -------- | ----------------------------- | ------ |
| dateFormat       | 格式化日期       | function | (date, fmt) date为日期参数，fmt为日期格式            | -      |
| asynCss       | 异步加载css       | function | (url, id) url为css文件路径，id为标识            | -      |
| asynScript       | 异步加载js       | function | (url, id) url为js文件路径，id为标识            | -      |
| debounce       | 防抖       | function | (fn, wait) fn为函数，wait为等待时间            | -      |
| throttle       | 节流       | function | (fn, wait) fn为函数，wait为等待时间            | -      |
| isApp       | 是否在app端       | function | () 无参数            | -      |
| getUrlParam       | 获取url参数       | function | (name) name为参数名            | -      |
| fileDownload       | 文件下载       | function | (fileUrl, fileName) fileUrl为文件路径，fileName为文件名            | -      |
| getFileType       | 获取文件类型       | function | (fileName) fileName为文件名            | -      |
| getFileName       | 获取文件名       | function | (fileName) fileName为文件路径            | -      |
| isEmpty       | 判断多种数据类型是否为空       | function | (data) data为要判断的值            | -      |
| isEmail       | 验证邮箱       | function | (email) email为邮箱地址            | -      |
| isMobile       | 验证手机号       | function | (mobile) mobile为手机号            | -      |
| isIdCard       | 验证身份证       | function | (idCard) idCard为身份证号            | -      |
| replacePhone       | 只能输入手机号，非手机号替换为空       | function | (value) value为输入值            | -      |
| replaceNonNumber       | 只能输入数字，非数字替换为空       | function | (value) value为输入值            | -      |
| replaceNonChineseAndEnglish       | 只能输入中英文，非中英文替换为空       | function | (value) value为输入值            | -      |
| replacePoint       |只能输入小数，不满足的替换为空       | function | (value, limit) value为输入值, limit为小数位         | -      |
| getPoster       | 生成截图       | function | (element) element为元素            | -      |
| request       | 请求       | function | (url, params, callback, header) url为请求地址，params为请求参数，callback为回调函数，header为请求头            | -      |
| requestBody       | 请求体       | function | (url, params, callback, header, encrypt) url为请求地址，params为请求参数，callback为回调函数，header为请求头，encrypt为是否加密           | -      |
| minAppHomeReload       | 重新加载app       | function | () 无参数            | -      |
| loadBarTitle       | 设置标题       | function | (title) title为标题文本            | -      |
| loadbarColor       | 设置颜色       | function | (color, isDark) color为颜色值，isDark为是否暗色模式            | -      |
| loadBarTitleColor       | 设置标题颜色       | function | (color) color为颜色值            | -      |
| setDarkStyle       | 设置暗色       | function | () 无参数            | -      |
| loadUserInfo       | 获取个人信息，回调函数是setUserInfo       | function | () 无参数            | -      |
| loadLocation       | 获取位置，回调函数是setLocation       | function | () 无参数            | -      |
| loadLocalCity       | 获取本地城市       | function | (callback) callback为回调函数            | -      |
| goCityPage       | 跳转城市页面       | function | (callback) callback为回调函数            | -      |
| hiddenBack       | 隐藏返回       | function | () 无参数            | -      |
| webReloadApp       | 重新加载app       | function | (params) params为参数            | -      |
| webGoBack       | 返回       | function | () 无参数            | -      |
| newInitWebCacheApp       | 初始化web缓存       | function | (webCache, key) webCache为缓存数据，key为缓存键            | -      |
| newLoadWebCacheApp       | 加载web缓存       | function | (key, callback) key为缓存键，callback为回调函数            | -      |
| showTimeSelector       | 显示时间选择器       | function | (type, nowSelectTime, startTime, endTime, callback, toastMsg) 无参数，type：1表示年月日时分，type=2表示年月日，nowSelectTime：当前选中时间，startTime：开始时间，endTime：结束时间，callback： 回调函数，toastMsg：提示信息            | -      |
| minAppShare       | 分享       | function | (shareType, title, summary, targetUrl, imageUrl, miniPath) shareType为分享类型，title为标题，summary为摘要，targetUrl为目标链接，imageUrl为图片链接，miniPath为小程序路径            | -      |
| gotoMap       | 跳转地图       | function | (latitude, longitude, address) latitude为纬度，longitude为经度，address为地址            | -      |
| webtoChat       | 跳转聊天       | function | (workerNo) workerNo为工号            | -      |
| uploadAttachment       | 选择附件       | function | (type, maxNumber, maxSize, callback) type为文件类型，maxNumber为最大数量，maxSize为最大大小，callback为回调函数            | -      |
| minAppUpLoadFile       | 上传文件       | function | (file, tokenUrl, fileType, compressType, callback) file为文件，tokenUrl为token地址，fileType为文件类型，compressType为压缩类型，callback为回调函数            | -      |
| showAlbum       | 查看图片       | function | (params) params为图片预览参数            | -      |
| toOtherMiniApp       | 跳转其他小程序       | function | (minAppId, minAppPage) minAppId为小程序id, minAppPage为小程序页面路径           | -      |
| toMoviePlayer       | 跳转视频播放器       | function | (url) url为视频地址            | -      |
| openLwdview       | 打开乐文档       | function | (url) url为文档地址            | -      |
| miniAppRecord       | 录音上传       | function | (type, identifier, maxDurationMillis, callback) type为录音类型，identifier为标识符，maxDurationMillis为最大时长，callback为回调函数            | -      |
| webAppSMG       | 发短信       | function | (telNo, content) telNo为电话号码，content为短信内容            | -      |
