# 表格虚拟滚动（table-page-virtual）落地指引

适用：表格数据量大（上万/十万行）、滚动明显卡顿、DOM 节点过多导致掉帧，需要用 `table-page-virtual` 相关能力做性能优化。

权威文档：`docs/table-page-virtual.md`（实现前先读这一篇，避免“凭经验瞎配”）。

## 推荐提示词（可直接粘贴给 AI）

我在 Vue3 项目里已安装 ly-ui，需要做一个大数据量表格页面：
- 目标：虚拟滚动/虚拟列表，滚动流畅
- 使用 `table-page-virtual`（请对齐 lyui-skill/docs/table-page-virtual.md 的配置与示例）
- 支持：检索条件、分页或服务端筛选（按文档推荐的组合方式）
- 输出：一份可复制的单文件组件（SFC）模板
- 先给“关键配置项清单”，再给完整代码

## 关键配置项（先对齐文档再动手）

- **渲染容器/高度**：通常需要明确高度或 `height="auto"` 的正确组合（以文档为准）
- **行高/缓存**：虚拟滚动对行高、动态高度、展开行等特性有约束
- **交互组合**：分页/排序/筛选 与 虚拟滚动的关系（哪些放前端、哪些交给服务端）
- **列渲染复杂度**：避免在单元格里做高成本计算，必要时做格式化函数或轻量组件

## 最小模板（仅展示“怎么组织代码”）

> 下面是结构模板，具体 props 与配置项请以 `docs/table-page-virtual.md` 为准后再填充。

```vue
<template>
  <!-- 示例组件名/props 以 docs/table-page-virtual.md 为准 -->
  <ly-table-page-virtual
    ref="tableRef"
    row-key="id"
    :table-config="tableConfig"
    height="auto"
  >
    <template #search="{ data }">
      <ly-input v-model="data.keyword" placeholder="关键词" clearable />
    </template>
  </ly-table-page-virtual>
</template>

<script>
import { ref, reactive } from 'vue'
import listServer from '@http/listServer'

export default {
  setup() {
    const tableRef = ref(null)

    const searchParams = reactive({
      keyword: ''
    })

    const tableConfig = {
      api: listServer.getBigList, // TODO 替换为你的接口
      search: searchParams,
      responseMap: { Total: 'total', List: 'list' },
      pageMap: { Size: 'pageSize', No: 'pageNum' },
      header: [
        { label: '序号', width: '56', type: 'index' },
        { label: '名称', prop: 'name', minWidth: '180' }
      ]
      // TODO：把虚拟滚动相关配置按 docs/table-page-virtual.md 补齐
    }

    return { tableRef, tableConfig }
  }
}
</script>
```

## 常见坑位（你附件里反复出现的“真实开发点”）

- **不要一上来返回全量十万行**：优先确认文档推荐的“服务端分页/筛选 + 前端虚拟渲染”的组合
- **避免在 cell slot 做重计算**：复杂渲染会把虚拟滚动收益抵消
- **行事件**：行点击/双击/选中要注意 `stop` 与事件冒泡，避免重复触发
