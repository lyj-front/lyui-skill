## 公共人员查询范围组件

### 使用背景：
#### 1.公司系统涉及到人员查找的，都会有【人员查询范围】查询条件，使用比较广泛
#### 2.不同系统【人员查询范围】的值都不一样，但实际上查询结果是一样
#### 3.公司制度的名词解释都没涉及相关解释，需要统一
#### 4.用户使用成本较高


:::demo

```html
<template>
  <lyControl v-model='value' @handleSelect="handleSelect"></lyControl>
</template>
<style></style>

<script>
  import { ref } from 'vue'
  export default {
    setup() {
      const value = ref('') 
      const handleSelect = (val) => {
        console.log(val)
      }
      return {
        handleSelect,
        value,
      }
    },
  }
</script>
```

:::

### lyControl 下拉数据固定集合
```html
  {
    label:'查此人',
    value:'1'
  },{
    label:'直接下属',
    value:'2'
  },{
    label:'所有下属',
    value:'3'
  },{
    label:'本人及直接下属',
    value:'4'
  },{
    label:'本人及所有下属',
    value:'5'
  },{
    label:'管控范围',
    value:'6'
  }
```

### lyControl Events

其他事件同 select

| 参数         | 说明           | 回调参数                                                    |
| ------------ | -------------- | ----------------------------------------------------------- |
| handleSelect | 选项改变时触发 | value(选择的值) |
| list | 下拉列表的内容 | 下拉数据固定集合(支持自定义修改，但是不要修改label值) |
| options | 可以选取list中的值使用 | 默认[1,2,3,4,5,6]包含显示 |
