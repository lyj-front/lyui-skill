# 使用示例索引

本目录存放**导读与摘录**；完整 props / 事件 / Demo 以 `docs/` 下与官网同步的 Markdown 为准。

| 场景 | 查阅 |
|------|------|
| 安装与 registry | `docs/installation.md` |
| 快速上手、全局配置 | `docs/quickstart.md` |
| 广告条 / 弹框（独立包） | `docs/ad-dialog-doc.md` |
| 表格与配置 | `docs/table.md`、`docs/table-config.md`、`docs/table-page.md` 等 |
| 表格：查询页模板（含查询/重置/行事件） | `examples/vue/table-search-template.md` |
| 表格：虚拟滚动（大数据量/性能） | `examples/vue/table-page-virtual-guide.md`（权威：`docs/table-page-virtual.md`） |
| 弹窗：表单填写与保存（含校验/二次确认） | `examples/vue/dialog-form-template.md` |
| 上传：自定义上传（类型/大小限制） | `examples/vue/upload-custom-template.md` |
| 导出：下载 Excel（日期范围/防重复点击） | `examples/vue/export-download-template.md` |

在 monorepo 内开发时，可用 `npm run sync-docs` 将 `website/docs/zh-CN` 再次同步到 `docs/` 并刷新 `src/core/doc-manifest.ts`。
