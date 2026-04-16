## 公共人员、部门、岗位、职位关键词搜索

搜索人员、部门、职位、岗位（默认接口），同时支持自定义接口请求数据或自定义数据

### 1、人员、门店、职位、岗位搜索

:::demo

```html
<template>
  <div style="margin:20px 0;">
    <div style="margin:20px 0">人员搜索</div>
    <LyEmpSearch
      v-model="value"
      :options="defaultOptions"
      excludeOptions
      apiKey="emp"
      placeholder="请输入人员查询"
      :value-key="'workerId'"
      @change="valueChange"
      @remove-tag="removeTag"
      @handleSelect="handleSelect"
    >
      <template #seletSolt="{data}">
        <template v-if='data.type=="tooltipTags"'>
          {{renderLabel(data.item)}}
        </template>
        <template v-if='data.type=="unExpandTags"'>
          {{renderLabel(data.item)}}
        </template>
        <template v-if='data.type=="expandTags"'>
          {{renderLabel(data.item)}}
        </template>
        <template v-if='data.type=="outInput"'>
          {{renderLabel(data.item)}}
        </template>
      </template>
    </LyEmpSearch>
  </div>
  <div style="margin:20px 0;">
    <div style="margin:20px 0">人员搜索(自定义展示字段)</div>
    <LyEmpSearch
      v-model="value2"
      :options="defaultOptions"
      multiple
      apiKey="emp"
      placeholder="请输入人员查询"
      value-key="workerId"
      label-key="empName"
      @change="valueChange"
      @remove-tag="removeTag"
      @handleSelect="handleSelect"
    >
      <template #default="data">
        <div>{{data.empName}}--{{data.deptName}}</div>
      </template>
    </LyEmpSearch>
  </div>
  <div style="margin:20px 0;">
    <div style="margin:20px 0">部门、门店搜索</div>
    <LyEmpSearch
      v-model="radioValue1"
      :options="defaultOptions1"
      apiKey="dept"
      placeholder="请输入部门、门店查询"
      :value-key="'number'"
      showStatus
      @change="valueChange"
      @remove-tag="removeTag"
      @handleSelect="handleSelect"
    >
    </LyEmpSearch>
  </div>
  <div style="margin:20px 0;">
    <div style="margin:20px 0">职位搜索</div>
    <LyEmpSearch
      v-model="radioValue2"
      :options="defaultOptions2"
      apiKey="duty"
      placeholder="请输入职位查询"
      :value-key="'dutyNumber'"
      @change="valueChange"
      @remove-tag="removeTag"
      @handleSelect="handleSelect"
    >
    </LyEmpSearch>
  </div>
  <div style="margin:20px 0;">
    <div style="margin:20px 0">岗位搜索</div>
    <LyEmpSearch
      v-model="radioValue3"
      :options="defaultOptions3"
      apiKey="post"
      placeholder="请输入岗位查询"
      :value-key="'postId'"
      @change="valueChange"
      @remove-tag="removeTag"
      @handleSelect="handleSelect"
    >
    </LyEmpSearch>
  </div>
</template>

<style></style>

<script>
  import { ref } from 'vue'
  export default {
    setup() {
      const value = ref('77806104') // 多选value
      const value2 = ref(['77806104', '55006951']) // 多选value
      const radioValue1 = ref('77806104') // 单选value
      const radioValue2 = ref('77806101') // 单选value
      const radioValue3 = ref('77806103') // 单选value
      let selectArr = ref([])
      const defaultOptions = ref([
        {
          deptName: 'J万科城一部',
          empName: 'AAA',
          workerId: '77806104',
        },
        {
          deptName: '美丽AAA一部',
          empName: '刘鹏（美丽AAA）',
          workerId: '55006951',
        },
      ])
      const defaultOptions1 = ref([
        {
          label: `部门1`,
          value: '77806104',
        },
      ])
      const defaultOptions2 = ref([
        {
          label: `职位1`,
          value: '77806101',
        },
      ])
      const defaultOptions3 = ref([
        {
          label: `岗位1`,
          value: '77806103',
        },
      ])
      const valueChange = (val) => {
        console.log('valuechange', val)
      }
      const removeTag = (val) => {
        console.log('removetag', val)
      }
      const handleSelect = (val) => {
        console.log(val, '选择数组',radioValue1.value)
      }
      function renderLabel(item) {
        console.log(item,'=============')
        return item.currentLabel.split('--')[1]
      }
      console.log(111, defaultOptions)
      return {
        defaultOptions,
        defaultOptions1,
        defaultOptions2,
        defaultOptions3,
        selectArr,
        renderLabel,
        removeTag,
        handleSelect,
        valueChange,
        value,
        value2,
        radioValue1,
        radioValue2,
        radioValue3,
      }
    },
  }
</script>
```

:::

### 2、自定义搜索

:::demo

```html
<template>
  <div style="margin:20px 0;">
    <div style="margin:20px 0">接口请求</div>
    <LyEmpSearch
      v-model="value"
      :remote="true"
      @change="valueChange"
      @remove-tag="removeTag"
      @handleSelect="handleSelect"
      :extensionApi="extensionApi"
    >
    </LyEmpSearch>
  </div>

  <div style="margin:20px 0;">
    <div style="margin:20px 0">自定义数据源</div>
    <LyEmpSearch
      v-model="value"
      :options="options"
      :remote="false"
      @change="valueChange"
      @remove-tag="removeTag"
      @handleSelect="handleSelect"
    >
    </LyEmpSearch>
  </div>
</template>

<style></style>

<script>
  import { ref } from 'vue'
  export default {
    setup() {
      const value = ref()
      let selectArr = ref([])
      const options = ref([
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ])
      const valueChange = (val) => {
        console.log(val)
      }
      const removeTag = (val) => {}
      const handleSelect = (val) => {
        console.log(val, '选择数组')
      }
      const extensionApi = (cb) => {
        cb([
          { label: '我是接口请求数据1', value: 1 },
          { label: '我是接口请求数据2', value: 2 },
        ])
      }
      return {
        extensionApi,
        selectArr,
        removeTag,
        handleSelect,
        valueChange,
        options,
        value,
      }
    },
  }
</script>
```

:::

### empSearch Attributes

其他属性同 select

| 参数        | 说明                                                  | 类型                   | 可选值                                                        | 默认值    |
| ----------- | ----------------------------------------------------- | ---------------------- | ------------------------------------------------------------- | --------- |
| options     | 下拉列表，在有 value 时必填                           | [] {label:'',value:''} | —                                                             | —         |
| debounce    | 搜索频率间隔时间                                      | Number                 | -                                                             | 300ms     |
| apiKey      | 接口标识                                              | String                 | emp(人员搜索)、dept(岗位搜索)、duty(职位搜索)、post(岗位搜索) | emp       |
| valueKey    | 作为 value 唯一标识的键名                             | String                 | —                                                             | workerId  |
| labelKey    | 选中输入框中的值的 label，详见自定义展示字段          | String                 | —                                                             | label     |
| description | 文本描述                                              | string                 | —                                                             | —         |
| isLeave     | 是否可以查询离职人员（注：知道 apiKey 为 emp 时有效） | Boolean                | true/false                                                    | true      |
| powerUrl    | 人员和部门、门店搜索范围的权限地址 （默认查询所有）   | String                 | —                                                             | searchAll |
| showStatus   | 是否将失效部门标红   | Boolean                 | —                                                             | false |
| request   | 调用获取数据时接口需要额外的参数   | Object                 | 无                                                             | {} |

### Slot

| name      | 说明                                                                                                                                                                                                                                                                               |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| option    | 自定义展示数据                                                                                                                                                                                                                                                                     |     |
| seletSolt | 选中数据展示 ，data 参数 type:'tooltipTags'(气泡提示区域) type:'unExpandTags'(不展开选中项时，选中的展示区域) type:'expandTags'(展开选中项时，选中的展示区域) type:'outInput'(下方展示选中项时，选中的展示区域),item:{currentLabel:'',value:''}选中的 option 包含 label 和 value } |     |

### empSearch Events

其他事件同 select

| 参数         | 说明           | 回调参数                                                    |
| ------------ | -------------- | ----------------------------------------------------------- |
| handleSelect | 选项改变时触发 | value(选择的值--value 组数)、allValue(选中的值--源数据数组) |
| extensionApi | 扩展搜索请求   | function(cb) cb 传参为列表数据                              |
