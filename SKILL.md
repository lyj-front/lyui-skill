---
name: lyui
description: >-
  Guides implementation with the LyUI (ly-ui) Vue 3 component library using the
  bundled zh-CN docs under lyui-skill/docs, plus standalone packages (e.g. ad-dialog).
  Use when the user works on LyUI, ly-* components, ly-ui install/on-demand import,
  tables/forms/dialogs, or cites LyUI documentation.
---

# LyUI 组件库（Agent Skill）

## 权威文档位置

本 Skill 包内已镜像**全部**中文组件与指南 Markdown，路径为：

`lyui-skill/docs/*.md`

共 101 个文件，与 `website/docs/zh-CN` 同源；**不要凭记忆编造 API**。更新文档请在 monorepo 内执行 `npm run sync-docs`（于 `lyui-skill` 目录）。

## 目录结构（本包）

- `docs/` — API 与用法示例（Markdown）
- `src/core/` — 文档清单与注册表
  - `doc-manifest.ts` — 文档文件清单（由脚本生成）
  - `component-registry.ts` — **组件元数据注册表（含分类、关键词、关联组件）**
  - `registry.ts` — 检索与搜索功能
  - `types.ts` — 类型定义
- `src/adapters/` — 框架说明：`vue` 为主实现；`react` / `angular` 为占位说明
- `src/ui/` — 无运行时代码；真实组件在 npm `ly-ui`
- `src/utils/` — 路径等小工具
- `examples/` — 导读与代码摘录

元数据见根目录 `skill.json`。

## 使用前提（必读）

- **`docs/installation.md` 的适用对象**：需要在**业务项目**里安装 npm 包 `ly-ui` 的工程；文档写的是私服 registry、`npm install ly-ui` / `yarn add ly-ui` 等步骤。
- **未安装 `ly-ui` 时**：其他 `docs/*.md` 里的组件示例（模板标签、`import`、`app.use(LyUi)` 等）**无法运行**；Agent 应提示用户先完成安装与 `docs/quickstart.md` 中的样式/入口配置，再对照各组件文档开发。

## LyUI（ly-ui）核心约定

- **框架**：Vue 3；**包名**：`ly-ui`（**须已安装依赖**，安装与 registry 见 `docs/installation.md`）。
- **完整引入**：`app.use(LyUi, { locale })`，样式 `import 'ly-ui/dist/index.css'`；见 `docs/quickstart.md`。
- **按需引入**：从 `ly-ui` 引入组件并注册；模板多为 **`ly-` 前缀** kebab-case（如 `ly-button`）。
- **表格**：`table.md`、`table-config.md`、`table-page.md`、`table-view.md`、`table-page-virtual.md` 职责不同，实现前读对应文档。

## 组件检索指南（新增）

本 Skill 现在包含智能组件检索系统，支持通过多种方式定位组件：

### 1. 关键词搜索

组件注册表包含丰富的关键词，支持模糊匹配：

| 用户描述 | 匹配组件 |
|---------|---------|
| "提交按钮" | `button` |
| "弹窗确认" | `dialog`, `message-box` |
| "表格分页" | `table-page` |
| "下拉选择" | `select`, `dropdown` |
| "日期时间" | `date-picker`, `datetime-picker` |
| "加载动画" | `loading`, `skeleton` |

### 2. 组件分类

组件按功能分为 7 大类：

- **基础组件** (`basic`)：button, input, layout, card 等
- **表单组件** (`form`)：form, select, date-picker, checkbox 等
- **数据展示** (`data`)：table, tree, calendar, pagination 等
- **反馈组件** (`feedback`)：dialog, message, loading, notification 等
- **导航组件** (`navigation`)：menu, tabs, breadcrumb, dropdown 等
- **业务组件** (`business`)：ad-dialog, emp-search, lyj-xlsx 等
- **指南文档** (`guide`)：installation, quickstart, custom-theme 等

### 3. 关联组件推荐

每个组件都有关联组件列表，便于发现相关功能：

- `table` → `table-page`, `pagination`, `form`
- `form` → `input`, `select`, `checkbox`, `validate`
- `dialog` → `message-box`, `drawer`, `popover`

### 4. 独立包组件

以下组件需要单独安装：

| 组件 | 包名 | 安装命令 |
|-----|------|---------|
| 广告弹窗 | `ad-dialog` | `yarn add ad-dialog` |

## 推荐工作流

1. **理解需求**：分析用户需要的功能，使用关键词在注册表中搜索
2. **定位文档**：通过 `src/core/component-registry.ts` 找到对应组件 ID
3. **阅读文档**：Read `lyui-skill/docs/<组件名>.md` 获取 props、事件与示例
4. **查看关联**：检查相关组件，确保选择最合适的解决方案
5. **实现代码**：保持与文档一致的 import、标签名与样式引入

## 快速参考

### 常用组件速查

| 场景 | 推荐组件 |
|-----|---------|
| 表单提交 | `form` + `button` |
| 数据列表 | `table-page` |
| 弹窗确认 | `dialog` 或 `message-box` |
| 页面导航 | `menu` 或 `tabs` |
| 加载状态 | `loading` 或 `skeleton` |
| 日期选择 | `date-picker` |
| 文件上传 | `upload` 或 `lbg-upload`（大文件）|
| 人员选择 | `emp-search` 或 `select-user-grouping` |

### 表格组件选择指南

| 需求 | 使用组件 |
|-----|---------|
| 基础表格 | `table` |
| 带分页的表格 | `table-page` |
| 配置化表格 | `table-config` |
| 只读展示 | `table-view` |
| 大数据量 | `table-page-virtual` |

## 指南类（非单一组件）

| 主题 | 文件 |
|------|------|
| 设计原则 | `docs/design.md` |
| 注意事项 | `docs/beCareful.md` |
| 部署 | `docs/deploy.md` |
| Nuxt | `docs/nuxt.md` |
| JS 错误 | `docs/jsError.md` |
| 脚手架 | `docs/zjCli.md` |

## 独立包：ad-dialog

不属于 `ly-ui` 主包：`yarn add ad-dialog`。详见 `docs/ad-dialog-doc.md`。
