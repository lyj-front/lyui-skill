# LyUI Cursor Skill

面向 **Element-UI 体系二次开发项目 LyUI（ly-ui）** 的 Cursor Skill：将 LyUI 提供可被 Cursor Agent 直接检索的 `SKILL.md`、文档索引脚本与分层目录，用于在真实业务开发中快速定位组件能力、对齐用法示例与最佳实践。

## 目录结构

```
lyui-skill/
├── src/
│   ├── core/           # 文档清单 doc-manifest.ts、registry、类型
│   ├── adapters/       # Vue 为主；React / Angular 占位说明
│   ├── ui/             # 占位（真实 UI 在 npm ly-ui）
│   ├── utils/          # 路径等工具
│   └── index.ts
├── examples/           # 导读与摘录
├── docs/               # 全部 zh-CN 组件/指南 .md（101 个）
├── scripts/
│   └── sync-docs.mjs   # 从 monorepo 同步 docs 并刷新 manifest
├── SKILL.md            # Cursor Agent 入口
├── skill.json          # 元数据（框架、路径、触发词等）
├── package.json
└── tsconfig.json
```

## 使用

### Cursor

推荐直接使用仓库地址安装，便于后续更新。

#### 方式一：全局安装到 Cursor Skills（推荐）

将仓库克隆到你的 Cursor skills 目录（保证根目录下有 `SKILL.md`）：

```bash
git clone https://github.com/xiaokang1201/lyui-skill ~/.cursor/skills/lyui
```

Windows 也可以放在用户目录下的 `.cursor/skills/lyui`（示例）：

```bash
git clone https://github.com/xiaokang1201/lyui-skill %USERPROFILE%\.cursor\skills\lyui
```

更新：

```bash
cd ~/.cursor/skills/lyui
git pull
```

#### 方式二：安装到项目内（可随项目版本管理）

作为项目的子模块放到 `.cursor/skills/lyui/`：

```bash
git submodule add https://github.com/xiaokang1201/lyui-skill .cursor/skills/lyui
git submodule update --init --recursive
```

更新（拉取子模块到最新提交）：

```bash
git submodule update --remote --merge .cursor/skills/lyui
```

### 同步文档（monorepo 内）

```bash
cd lyui-skill
npm install
npm run sync-docs
```

若不存在 `../website/docs/zh-CN`（例如单独克隆了本包），脚本会跳过复制，仍根据现有 `docs/` 生成 `src/core/doc-manifest.ts`。

### 类型检查

```bash
npm run typecheck
```

### 使用频率统计（离线）

Cursor 目前不提供可直接读取的“每个 Skill 被触发/使用”的官方统计接口时，可以用本仓库提供的离线分析脚本，对本机对话记录（jsonl）做统计：

```bash
# 统计触发词命中、ly-* 组件提及、docs/*.md 引用次数（Top 30）
npm run analyze-usage -- --input "<你的jsonl目录或文件>" --top 30
```

## 与 ly-ui 的关系

- **文档与 Skill**：在本仓库维护；`docs/installation.md` 描述的是**在业务项目里安装 `ly-ui`**，不是安装本 Skill 目录。
- **可运行组件**：须在目标项目的 `package.json` 中安装 `ly-ui`，并按 `docs/quickstart.md` 引入样式与入口；未装依赖时，其他文档中的示例无法直接跑通。
