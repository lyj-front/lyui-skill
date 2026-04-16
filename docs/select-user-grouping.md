## Select-user-grouping 选择人员分组组件

选择人员分组

### 基础用法

适用广泛的基础单选
:::demo `v-model`的值为当前被选中的`el-option`的 value 属性值

```html
<template>
  <ly-select-user-grouping popover-class-name="grouping1" v-model="values"></ly-select-user-grouping>
  <ly-select-user-grouping popover-class-name="grouping2" v-model="values2"></ly-select-user-grouping>
</template>

<script>
  export default {
    data() {
      return {
        values: [ { "viewSystemType": 1, "authorityNumber": "77832345", "authorityName": "杨阳" }, { "viewSystemType": 1, "authorityNumber": "00446012", "authorityName": "杨忠祥" } ],
        values2: [ { "viewSystemType": 1, "authorityNumber": "77832345", "authorityName": "杨阳" }, { "viewSystemType": 1, "authorityNumber": "00446012", "authorityName": "杨忠祥" } ],
      }
    },
  }
</script>
<!--<setup>
import { defineComponent, ref } from 'vue';
export default defineComponent({
    setup() {
        return {
           values: [ { "viewSystemType": 1, "authorityNumber": "77832345", "authorityName": "杨阳" }, { "viewSystemType": 1, "authorityNumber": "00446012", "authorityName": "杨忠祥" } ],
           values2: [ { "viewSystemType": 1, "authorityNumber": "77832345", "authorityName": "杨阳" }, { "viewSystemType": 1, "authorityNumber": "00446012", "authorityName": "杨忠祥" } ]
        };
    },
});
</setup>-->
```

:::

### 去掉离职人员

适用广泛的基础单选
:::demo `v-model`的值为当前被选中的`el-option`的 value 属性值

```html
<template>
  <ly-select-user-grouping popover-class-name="grouping3" :leave="false" v-model="values"></ly-select-user-grouping>
</template>

<script>
  export default {
    data() {
      return {
        values: [ { "viewSystemType": 1, "authorityNumber": "77832345", "authorityName": "杨阳" }, { "viewSystemType": 1, "authorityNumber": "00446012", "authorityName": "杨忠祥" } ],
      }
    },
  }
</script>
<!--<setup>
import { defineComponent, ref } from 'vue';
export default defineComponent({
    setup() {
        return {
           values: [ { "viewSystemType": 1, "authorityNumber": "77832345", "authorityName": "杨阳" }, { "viewSystemType": 1, "authorityNumber": "00446012", "authorityName": "杨忠祥" } ]
        };
    },
});
</setup>-->
```

:::
