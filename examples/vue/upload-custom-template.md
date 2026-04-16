# 自定义上传模板（LyUI / Vue 3）

适用：需要对上传文件做**类型/大小限制**，并使用自定义请求（axios / fetch）上传，带进度展示。

关联文档：在 `docs/` 中查 `upload`（组件 props、事件以 docs 为准）。

## 推荐提示词（可直接粘贴给 AI）

基于 LyUI（ly-ui）Vue3，给我一个自定义上传示例：
- 使用 `ly-upload`，不自动上传（`auto-upload=false`）
- 限制类型：`.xls,.xlsx`，大小不超过 20MB
- 选择文件后立即自定义上传，显示上传进度
- 输出：一份可复制的单文件组件（SFC）

## 完整示例（模板）

```vue
<template>
  <ly-upload
    ref="uploadRef"
    :file-list="fileList"
    class="upload-box"
    accept=".xls,.xlsx"
    action="#"
    :auto-upload="false"
    :on-change="onFileChange"
  >
    <ly-button size="small" type="primary">上传附件</ly-button>
  </ly-upload>
</template>

<script>
import { ref } from 'vue'
import { LyMessage } from 'ly-ui'
import axios from 'axios'

export default {
  setup() {
    const fileList = ref([])
    const uploadRef = ref(null)

    function isSupportedFileType(filename) {
      return /(\.xls|\.xlsx)$/i.test(filename || '')
    }

    async function onFileChange(file) {
      const isOk = isSupportedFileType(file?.name)
      const isLt20M = (file?.size || 0) / 1024 / 1024 < 20

      if (!isOk) {
        LyMessage.warning('不支持当前文件类型（仅 .xls/.xlsx）')
        uploadRef.value?.handleRemove?.(file)
        return false
      }
      if (!isLt20M) {
        LyMessage.warning('上传大小不能超过 20MB')
        uploadRef.value?.handleRemove?.(file)
        return false
      }

      const instance = axios.create({ baseURL: '/', timeout: 10000 })

      // ly-upload 常见会把内部队列放在 uploadFiles；若你项目版本不同按实际调整
      const cur = uploadRef.value?.uploadFiles?.find?.((i) => i.uid === file.uid)

      const formData = new FormData()
      formData.set('file', file.raw)
      formData.set('projectType', '7') // TODO：替换你的业务参数

      try {
        const res = await instance.post('/jjscj-sa/jy/importDate', formData, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
          onUploadProgress: (evt) => {
            const total = evt.total || 0
            if (!total) return
            const percent = Math.round((evt.loaded * 100) / total)
            if (cur) cur.percentage = percent
          }
        })
        const data = res?.data
        if (data?.success) LyMessage.success('上传成功')
        else LyMessage.warning(data?.errorMsg || '上传失败')
      } catch (err) {
        // 403 场景按你的项目登录策略处理
        if (err?.response?.status === 403) window.location.href = '/'
        else LyMessage.warning('上传失败')
      }

      return true
    }

    return { fileList, uploadRef, onFileChange }
  }
}
</script>

<style scoped>
.upload-box :deep(.el-upload-list) {
  display: none;
}
</style>
```
