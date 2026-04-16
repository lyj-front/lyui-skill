# 导出/下载 Excel 模板（LyUI / Vue 3）

适用：按日期范围导出，后端返回 `blob`，前端触发文件下载，并做“防重复点击”交互。

关联文档建议：在 `docs/` 中查日期组件/按钮等；导出本质是浏览器下载逻辑，与组件库弱相关。

## 推荐提示词（可直接粘贴给 AI）

基于 Vue3 + LyUI，生成一个“按日期范围导出 Excel”的弹窗/区域：
- 日期范围选择（用你项目日期组件，给出可替换占位）
- 点击导出后 axios 请求 `responseType=blob`
- 生成并下载 `.xlsx`
- 防重复点击：请求中禁用按钮/提示“正在导出”
- 输出：完整示例代码（单文件组件 SFC）

## 完整示例（模板）

```vue
<template>
  <div class="export-row">
    <span class="label">时间范围：</span>
    <!-- 日期组件按你项目实际替换 -->
    <datepicker
      type="range"
      v-model:startTime="exportObj.dateS"
      v-model:endTime="exportObj.dateE"
      startPlaceholder="开始时间"
      endPlaceholder="结束时间"
      format="yyyy-MM-dd"
      range-separator="到"
    />
    <ly-button size="small" type="primary" :disabled="exportObj.btnStatus" @click="exportExcel">
      {{ exportObj.btnStatus ? '导出中...' : '导出' }}
    </ly-button>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { LyMessage } from 'ly-ui'
import axios from 'axios'

export default {
  setup() {
    const exportObj = reactive({
      dateS: '',
      dateE: '',
      btnStatus: false
    })

    async function exportExcel() {
      if (exportObj.btnStatus) return LyMessage.error('正在导出，请稍后...')
      if (!exportObj.dateS || !exportObj.dateE) return LyMessage.warning('请选择时间范围')

      exportObj.btnStatus = true
      try {
        const res = await axios.post(
          '/jjscj-ras/exception/downloadExceptionReport',
          { startDate: exportObj.dateS, endDate: exportObj.dateE },
          {
            responseType: 'blob',
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
          }
        )

        const blob = new Blob([res.data], { type: 'application/vnd.ms-excel;charset=UTF-8' })
        const filename = `导出_${exportObj.dateS}_${exportObj.dateE}.xlsx`

        if (window.navigator?.msSaveOrOpenBlob) {
          window.navigator.msSaveBlob(blob, filename)
          return
        }

        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } catch (err) {
        if (err?.response?.status === 403) window.location.href = '/'
        else LyMessage.error('导出失败')
      } finally {
        exportObj.btnStatus = false
      }
    }

    return { exportObj, exportExcel }
  }
}
</script>

<style scoped>
.export-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.label {
  white-space: nowrap;
}
</style>
```
