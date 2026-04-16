# 表格查询页模板（LyUI / Vue 3）

适用：你要快速生成一个**带检索条件 + 查询/重置 + 操作列 + 行事件**的列表页骨架，并且用 `ly-table-page` 承载分页/请求/渲染。

权威文档优先级：

- `docs/table-page.md`（查询页容器与插槽）
- `docs/table-config.md`（配置项、字段、回调映射）
- 若数据量极大/卡顿：改看 `docs/table-page-virtual.md`

## 推荐提示词（可直接粘贴给 AI）

请基于 LyUI（ly-ui）Vue3，生成一个资金风控列表页：
- 使用 `ly-table-page`，包含查询/重置
- 查询条件：关键词（输入框）+ 状态（下拉）+ 日期范围
- 表格列：序号、项目名称、风险等级、更新时间、操作列（查看/编辑）
- 需要：`row-key`、行单击事件 `@row-click`、双击事件 `@row-dblclick`（若组件支持）
- 接口放到 `src/server/listServer.js`（示例函数名：`getRiskManagerList`）
- 返回结构映射 `Total/List`、分页参数映射 `Size/No`
- 最终输出一份可运行的单文件组件（SFC）示例（可用占位接口路径与字段名）

## 完整示例（模板）

> 注意：接口路径、字段名、权限点、响应结构请按你的项目实际替换；不要直接照抄生产接口。

### 列表接口（示例）

将接口新增到你的项目（例如 `src/server/listServer.js`）：

```js
// @post()
export function getRiskManagerList() {
  return '/pay-pool/pay-risk-manage/getRiskManagerList'
}
```

### 页面 SFC（可复制模板）

```vue
<template>
  <ly-table-page
    ref="tableRef"
    row-key="id"
    :table-config="tableConfig"
    :sort-always-show="true"
    :after-reset="searchReset"
    height="auto"
    headerFixed
    scrollBarFixed
    :scrollBarPosition="62"
    @row-click="tableRowClick"
  >
    <template #search="{ data }">
      <div class="search-row">
        <ly-input v-model="data.keyword" placeholder="关键词（如预警内容/问题数据）" class="w240" clearable />
        <ly-select v-model="data.status" placeholder="状态" class="w140" clearable>
          <ly-option :value="''" label="全部" />
          <ly-option :value="'0'" label="未处理" />
          <ly-option :value="'1'" label="已处理" />
        </ly-select>
        <!-- 这里用日期组件占位，按你项目实际日期组件替换 -->
        <span class="hint">日期范围：请按项目日期组件接入</span>
      </div>
    </template>

    <template #operate="{ row }">
      <ly-button type="text" @click.stop="viewRow(row)">查看</ly-button>
      <ly-button type="text" @click.stop="editRow(row)">编辑</ly-button>
    </template>
  </ly-table-page>
</template>

<script>
import { ref, reactive } from 'vue'
import { LyMessage } from 'ly-ui'
import listServer from '@http/listServer'

export default {
  setup() {
    const tableRef = ref(null)

    const searchParams = reactive({
      keyword: '',
      status: '',
    })

    const tableConfig = {
      api: listServer.getRiskManagerList,
      search: searchParams,
      responseMap: {
        Total: 'total',
        List: 'list'
      },
      pageMap: {
        Size: 'pageSize',
        No: 'pageNum'
      },
      header: [
        { label: '序号', width: '56', type: 'index' },
        { label: '项目名称', prop: 'projectName', minWidth: '180' },
        { label: '风险等级', prop: 'riskLevel', width: '120' },
        { label: '更新时间', prop: 'updateTime', width: '180' },
        { label: '操作', type: 'operate', width: '140', fixed: 'right', slot: 'operate' }
      ]
    }

    function searchReset() {
      searchParams.keyword = ''
      searchParams.status = ''
    }

    function tableRowClick(row, column) {
      // 单击行（根据需要做详情/选中态）
      console.log('row-click', row, column)
    }

    function viewRow(row) {
      LyMessage(`查看：${row?.projectName || ''}`)
    }

    function editRow(row) {
      LyMessage(`编辑：${row?.projectName || ''}`)
    }

    return {
      tableRef,
      tableConfig,
      searchReset,
      tableRowClick,
      viewRow,
      editRow
    }
  }
}
</script>

<style scoped>
.search-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.w240 {
  width: 240px;
}
.w140 {
  width: 140px;
}
.hint {
  color: #999;
  font-size: 12px;
}
</style>
```

## 检查清单（落地必看）

- **接口是否可用**：在项目里确认 `listServer.getRiskManagerList` 真存在且返回结构符合 `responseMap`
- **分页参数**：后端用 `pageNum/pageSize` 还是 `pageNo/size`，对应调整 `pageMap`
- **搜索参数**：`ly-table-page` 触发查询时，是否会把 `search` 对象按引用带入请求（避免把 `reactive` 深拷贝丢响应式）
- **操作列事件**：按钮点击要 `@click.stop`，避免触发行点击
