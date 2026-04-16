# 查看大图组件（参照乐聊查看大图改版，后续项目统一用这个查看大图插件）

### 备注
此组件需要引入jq
```html
<script src="https://front.leyoujia.com/js/jquery.js"></script>
```

### 使用方法

> 1.引入方式

在HTML页面中引入js,css文件：

```html
<script src="https://front.leyoujia.com/js/viewer/viewer.js"></script>
<link rel="stylesheet" href="https://front.leyoujia.com/js/viewer/viewer.css">
```

> 2.基础用法

```html
// html
<ul id="testViewer" data-title="图片展示">
    <li><img src="https://front.leyoujia.com/pluginsAPI/images/1.jpg" alt="图片1"></li>
</ul>
```

> 3.相关js

```javascript
$(function() {
    
    //查看大图
    function gt(id) {
        return document.getElementById(id);
    };
    //查看大图
    var Viewer = window.Viewer;
    var viewerOptions = { navbar: false };
    var viewer;

    function gtImgArr() {
        var tarImg = gt('testViewer');
        if (tarImg.querySelectorAll("img").length > 0) {
            viewer = new Viewer(gt('testViewer'), viewerOptions);
        }
    };
    gtImgArr();
});
```

### 更多参数配置

https://front.leyoujia.com/pluginsAPI/html/viewer.html

