## Framework 组织架构组件

架构树组件

### 使用方法

:::demo

```html
<template>
  <!-- :default-checked-keys="['all']" -->
  <!-- split
    select-all
    :has-level="false" -->
  <ly-framework
    has-checkbox
    ref="framework1"
    default-checked-node-keys="checked"
    framework-key="framework-1"
    :loading="loading"
    :framework-data="data"
    :props="defaultProps"
    node-key="id"
    :has-invalid="true"
    @invalid-change="invalidChange"
    @check="check"
    @check-change="checkChange"
  ></ly-Framework>
  <br/>
  <ly-button @click="setChecked">通过setChecked设置选中状态</ly-button>
  <br/>
  <br/>
  <ly-button @click="setCheckedAll">通过setCheckedAll设置选中全部</ly-button>
  <br/>
  <br/>
  <ly-button @click="setDeCheckedAll">通过setCheckedAll设置取消全部选中</ly-button>
</template>

<style></style>

<script>
  // serve 按实际项目写，实际项目中应该是 import serve from '@http/xxxxx' xxxxx = server目录下的文件名
  const { default: serve} = require('../../utils/server/common-api.js')
  import { reactive, toRefs, ref } from 'vue'

  export default {
    setup () {
      const framework = reactive({
        loading: false,
        data: [],
        defaultProps: {
          label: 'name',
        }
      })
      const framework1 = ref(null)

      // 初始化
      init()

      async function init() {
        framework.loading = true
        try {
          let { data } = await serve.controlDept({
            status: 'Y',
            showManager: false,
            searchType: '2',
            empNumber: "88888888",
            isAll: 'N',
            isCheck: 'N',
          })
          framework.data = data.deptTreeList
        } catch (err) {}
        framework.loading = false
      }

      async function invalidChange(val) {
        framework.loading = true
        // 这里接口可能并不是真正的含无效的参数，但是写的话就是这么写，接口需要自己去调整
        try {
          let { data } = await serve.controlDept({
            status: 'Y',
            showManager: false,
            searchType: '2',
            empNumber: "88888888",
            isAll: 'Y',
            isCheck: 'N',
          })
          framework.data = data.deptTreeList
        } catch (err) {}
        framework.loading = false
      }

      function check(curnode, data) {
        console.log('curnode: ', curnode);
        console.log('data: ', data);
      }

      function setChecked() {
        framework1.value.setChecked('7701311', true)
      }

      function setCheckedAll() {
        framework1.value.setCheckedAll(true)
      }

      function setDeCheckedAll() {
        framework1.value.setCheckedAll(false)
      }

      function checkChange(curNode, curCheck, chrildCheck) {
        console.log('curNode: ', curNode);
        console.log('curCheck: ', curCheck);
        console.log('chrildCheck: ', chrildCheck);
      }

      return {
        framework1,
        invalidChange,
        check,
        setChecked,
        setCheckedAll,
        setDeCheckedAll,
        checkChange,
        ...toRefs(framework)
      }
    }
  }
</script>
```
:::

### api使用演示

:::demo

```html
<template>
  <ly-framework
    ref="framework3"
    framework-key="framework-3"
    :loading="loading"
    :framework-data="data"
    :props="defaultProps"
    node-key="id"
  ></ly-Framework>
  <br/>
  <ly-button @click="apiExpandYanFa">通过expandByKey展开node</ly-button>
  <br/>
  <br/>
  <ly-button @click="apiLocateNode">通过locateNode定位node</ly-button>
</template>

<style></style>

<script>
  // serve 按实际项目写，实际项目中应该是 import serve from '@http/xxxxx' xxxxx = server目录下的文件名
  const { default: serve} = require('../../utils/server/common-api.js')
  import { reactive, toRefs, ref } from 'vue'

  export default {
    setup () {
      const framework = reactive({
        loading: false,
        data: [],
        defaultProps: {
          label: 'name',
        }
      })
      const framework3 = ref(null)

      // 初始化
      init()

      async function init() {
        framework.loading = true
        try {
          let { data } = await serve.controlDept({
            status: 'Y',
            showManager: false,
            searchType: '2',
            empNumber: '02089891',
            isAll: 'N',
            isCheck: 'N',
          })
          framework.data = data.deptTreeList
        } catch (err) {}
        framework.loading = false
      }

      // 通过 expandByKey 展开node
      function apiExpandYanFa() {
        framework3.value.expandByKey(['7701311', '0130675'])
      }

      function apiLocateNode() {
        framework3.value.locateNode('7701311')
      }

      return {
        apiExpandYanFa,
        apiLocateNode,
        framework3,
        ...toRefs(framework)
      }
    }
  }
</script>
```
:::

### Framework Attributes

| 参数                                  | 说明             | 类型    | 是否必传    | 默认值 |
| ------------------- | ----------------  | ------- | ------ | ------ |
| framework-key                         | tree组件标识     | string  | true | ly-framework |
| default-expanded-keys | 设置组件渲染时默认展开的node，不设置默认展开一层     | string  | false | / |
| loading                               | 是否显示loading  | Boolean | false | false  |
| framework-data                        | tree的数据       | Array   | true  |  /     |
| props                                 | 配置选项，具体看下| Object  | false  |  /     |
| node-key | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一| string  | false | /   |
| has-checkbox                         | 显示checkbox    | string  | false | /   |
| has-invalid                           | 显示含无效    | Boolean  | false | false   |
| has-expand                           | 是否显示展开所有按钮    | Boolean  | false | true   |
| width                                 | 宽度            | string  | false | 410px   |
| height                                | 高度            | string  | false | 320px   |
| default-checked-node-keys            | 绑定接口数据的某一个字段，同步checked的状态  | string  | false | 320px   |

### props

| 参数     | 说明                                                     | 类型                          | 可选值 | 默认值 |
| -------- | -------------------------------------------------------- | ----------------------------- | ------ | ------ |
| label    | 指定节点标签为节点对象的某个属性值                       | string, function(data, node)  | —      | —      |
| children | 指定子树为节点对象的某个属性值                           | string                        | —      | —      |
| disabled | 指定节点选择框是否禁用为节点对象的某个属性值             | boolean, function(data, node) | —      | —      |
| isLeaf   | 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效 | boolean, function(data, node) | —      | —      |

### Framework Events (tree组件的所有 Events都可以直接使用)
| 方法名              | 说明                                                                                      | 参数                                                                                                                                             |
| ------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| invalidChange | 切换含无效时的回调，业务需要通过这个值自行调用接口修改数据源 | Boolean |

### Framework ref 方法
| 方法名              | 说明                                                                                      | 参数                                                                                                                                             |
| ------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| expandByKey | 根据传入的key数组展开对应的数据 | Array |
| locateNode | 根据传入的key定位到node的位置 | string |
| setChecked | 根据传入的key设置选中状态 | string(key), boolean(选中状态) |
| setCheckedAll | 设置全部选中 | boolean(选中状态) |
