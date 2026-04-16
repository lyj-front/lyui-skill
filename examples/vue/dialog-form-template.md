# 弹窗表单模板（LyUI / Vue 3）

适用：新增/编辑弹窗，包含表单字段、必填校验、保存请求、异常分支二次确认等。

关联文档建议：

- 表单：在 `docs/` 中查 `form` / `input` / `select` / `radio` 等组件文档
- 弹窗：在 `docs/` 中查 `dialog`（若文档命名不同，以仓库 docs 为准）
- 独立包弹窗：`docs/ad-dialog-doc.md`

## 推荐提示词（可直接粘贴给 AI）

基于 LyUI（ly-ui）Vue3，生成一个“工时花费”弹窗：
- 组件：`ly-dialog` + `ly-form`
- 字段：花费日期、花费工时（数字校验，最多两位小数/或 0.25 的倍数）、描述（textarea）
- 保存：调用 `listServer.updateSpend`；若返回指定 errorCode 需要二次确认后调用 `taskServer.updateTaskCompleted`
- 输出：接口函数放到 `src/server/listServer.js`，页面给出完整 SFC 代码

## 完整示例（模板）

### 接口（示例）

```js
// @post({ checkSuccess: false })
export function updateSpend() {
  return '/demprob/woTask/updateSpend'
}
```

### 页面片段（可复制模板）

```vue
<template>
  <ly-dialog
    custom-class="spendDialog"
    title="填写花费"
    width="400px"
    v-model="spendDialog"
    destroy-on-close
  >
    <ly-form :model="woTaskSpend" label-width="100px" class="spendForm">
      <ly-form-item label="花费日期:" required>
        <!-- 日期组件按你项目实际替换 -->
        <datepicker
          v-model="woTaskSpend.spendDate"
          type="single"
          format="yyyy-MM-dd"
          placeholder="请选择日期"
          style="width: 100%"
        />
      </ly-form-item>

      <ly-form-item label="花费工时(天):" required>
        <ly-input
          v-model="woTaskSpend.spendWorkingDays"
          style="width: 100%"
          maxlength="8"
          placeholder="请输入花费工时"
          @blur="woTaskSpendTimeBlur"
        />
      </ly-form-item>

      <ly-form-item label="花费描述:">
        <ly-input
          type="textarea"
          v-model="woTaskSpend.remark"
          :rows="5"
          maxlength="200"
          placeholder="请填写描述"
        />
      </ly-form-item>
    </ly-form>

    <template #footer>
      <span class="dialog-footer">
        <ly-button type="primary" size="small" :loading="saving" @click="saveSpend">确定</ly-button>
        <ly-button size="small" :disabled="saving" @click="spendCancel">取消</ly-button>
      </span>
    </template>
  </ly-dialog>
</template>

<script>
import { ref } from 'vue'
import { LyMessage, LyMessageBox } from 'ly-ui'
import listServer from '@http/listServer'
import taskServer from '@http/taskServer' // TODO：按你的项目实际路径调整

export default {
  setup() {
    const spendDialog = ref(false)
    const saving = ref(false)

    const woTaskSpend = ref({
      id: '',
      taskId: '',
      spendDate: '',
      spendWorkingDays: '',
      remark: ''
    })

    function woTaskSpendTimeBlur() {
      const v = String(woTaskSpend.value.spendWorkingDays || '').trim()
      if (!v) return
      // 仅允许数字与最多两位小数（更复杂规则按业务改）
      if (!/^\d+(\.\d{1,2})?$/.test(v)) {
        woTaskSpend.value.spendWorkingDays = ''
        LyMessage('花费工时请输入数字，最多两位小数')
        return
      }
      const num = Number(v)
      if (num < 0) {
        woTaskSpend.value.spendWorkingDays = ''
        LyMessage('花费工时需为非负数')
      }
    }

    async function saveSpend() {
      if (!woTaskSpend.value.spendDate) return LyMessage('请填写花费日期')
      if (!woTaskSpend.value.spendWorkingDays) return LyMessage('请填写花费工时')

      // 示例：0.25 的倍数校验（按业务需要保留/移除）
      const num = Number(woTaskSpend.value.spendWorkingDays)
      if (!Number.isFinite(num) || num < 0 || (num * 100) % 25 !== 0) {
        return LyMessage('花费工时请输入 0.25 的非负倍数')
      }

      saving.value = true
      try {
        const res = await listServer.updateSpend(JSON.stringify(woTaskSpend.value))
        if (res?.success) {
          LyMessage('提交成功')
          spendDialog.value = false
          return
        }

        // 示例：异常分支二次确认
        if (res?.errorCode === 24115) {
          spendDialog.value = false
          await LyMessageBox.confirm(res.errorInfo, '任务状态变更提醒', {
            distinguishCancelAndClose: true,
            confirmButtonText: '变更',
            cancelButtonText: '取消'
          })
          const res1 = await taskServer.updateTaskCompleted({ id: res.data })
          if (!res1?.success) LyMessage(res1?.errorInfo || '变更失败')
          return
        }

        LyMessage(res?.errorInfo || '提交失败')
      } catch (e) {
        LyMessage('提交失败')
      } finally {
        saving.value = false
      }
    }

    function spendCancel() {
      spendDialog.value = false
    }

    return {
      spendDialog,
      woTaskSpend,
      saving,
      woTaskSpendTimeBlur,
      saveSpend,
      spendCancel
    }
  }
}
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: center;
  gap: 8px;
}
</style>
```
