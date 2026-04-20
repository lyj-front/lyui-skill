# LyUI Skill

LyUI Cursor Skill：同步 zh-CN 组件文档、提供索引与适配层占位。

[![CI](https://github.com/lyj-front/lyui-skill/actions/workflows/ci.yml/badge.svg)](https://github.com/lyj-front/lyui-skill/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-green.svg)](https://nodejs.org/)

## 特性

- 🔍 **智能搜索**：倒排索引实现 O(1) 组件查找
- 🈶 **拼音支持**：支持拼音搜索（如 "anniu" 匹配 "按钮"）
- 📚 **文档索引**：自动同步和索引 100+ 组件文档
- 🎯 **场景推荐**：根据使用场景智能推荐组件
- ⚡ **高性能**：搜索响应 < 0.2ms
- 🔧 **工程化**：完整的 CI/CD、测试覆盖、代码规范

---

## 安装

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 快速安装

```bash
# 克隆仓库
git clone https://github.com/lyj-front/lyui-skill.git
cd lyui-skill

# 安装依赖
npm install

# 构建项目
npm run build

# 验证安装
npm test
```

---

## 使用方式

### 1. 组件搜索

#### 基础搜索

```typescript
import { searchComponents } from './src/index.js';

// 中文搜索
const buttons = searchComponents('按钮');
// 返回: [button, button-group, ...]

// 英文搜索
const tables = searchComponents('table');
// 返回: [table, table-page, ...]

// 拼音搜索（无需切换输入法）
const results = searchComponents('anniu');
// 返回: [button] ("按钮"的拼音)
```

#### 高级搜索选项

```typescript
import { searchComponents } from './src/index.js';

const results = searchComponents('table', {
  limit: 5,        // 最多返回5个结果
  fuzzy: true,     // 启用模糊匹配
  threshold: 0.3   // 最低匹配分数
});
```

### 2. 场景推荐

```typescript
import { suggestComponents } from './src/index.js';

// 根据使用场景推荐组件
const suggestions = suggestComponents('表单提交', 5);
// 返回:
// [
//   { component: form, relevance: 0.95 },
//   { component: button, relevance: 0.85 },
//   { component: input, relevance: 0.80 },
//   ...
// ]
```

### 3. 组件元数据查询

```typescript
import { 
  getComponentMeta, 
  getRelatedComponents,
  getComponentsByCategory 
} from './src/index.js';

// 获取组件元数据
const buttonMeta = getComponentMeta('button');
// 返回: { id, displayName, category, keywords, related, ... }

// 获取相关组件
const related = getRelatedComponents('button');
// 返回: [button-group, link]

// 按分类获取组件
const basicComponents = getComponentsByCategory('basic');
// 返回: [button, icon, link, ...]
```

### 4. 文档索引

```typescript
import { listDocFiles, hasDocFile, getMetaByDocFile } from './src/index.js';

// 列出所有文档
const docs = listDocFiles();

// 检查文档是否存在
const exists = hasDocFile('button.md');

// 通过文档文件获取组件元数据
const meta = getMetaByDocFile('button.md');
```

### 5. 分类统计

```typescript
import { getCategoryStats } from './src/index.js';

const stats = getCategoryStats();
// 返回:
// [
//   { category: 'basic', name: '基础组件', count: 12 },
//   { category: 'form', name: '表单组件', count: 18 },
//   ...
// ]
```

---

## 开发指南

### 文档同步

```bash
# 从上游同步文档
npm run sync-docs

# 生成文档索引
npm run generate-doc-index
```

### 组件开发

#### 生成新组件

```bash
# 使用组件生成器
npm run generate-component -- --name my-component --category form --display-name "我的组件"

# 参数说明:
# --name: 组件ID (必需)
# --category: 分类 (basic/form/data/feedback/navigation/business/guide/other)
# --display-name: 显示名称
```

生成后需要：
1. 在 `src/core/component-registry.ts` 中添加注册表条目
2. 编辑 `docs/my-component.md` 完善文档
3. 运行 `npm run sync-docs` 同步

#### 组件注册表示例

```typescript
// src/core/component-registry.ts
{
  id: 'my-component',
  displayName: '我的组件',
  category: 'form',
  keywords: ['my-component', 'ly-my-component', '我的组件'],
  related: ['input', 'form'],
  complexity: 'simple',
  docPath: 'docs/my-component.md',
}
```

### 测试

```bash
# 运行所有测试
npm test

# 单独运行测试
npm run test:search-index
npm run test:component-registry
npm run test:registry

# 性能基准测试
npm run test:benchmark
```

### 代码规范

```bash
# 运行 ESLint
npm run lint

# 自动修复
npm run lint:fix

# 格式化代码
npm run format

# 检查格式
npm run format:check

# 运行完整 CI 检查
npm run ci
```

### 构建与发布

```bash
# 类型检查
npm run typecheck

# 构建
npm run build

# 运行示例
npm run demo
```

---

## 搜索算法

项目使用倒排索引（Inverted Index）实现高效的组件搜索：

- **精确匹配**：ID、显示名完全匹配
- **前缀匹配**：支持前缀搜索
- **模糊匹配**：基于 n-gram 的相似度计算
- **拼音搜索**：支持中文拼音输入（如 "anniu" 匹配 "按钮"）
- **场景推荐**：基于关键词权重的使用场景匹配

### 性能表现

```
Exact ID Lookup:    0.000ms/op
Chinese Search:     0.124ms/op
Pinyin Search:      0.101ms/op
Fuzzy Search:       0.071ms/op
Complex Query:      0.077ms/op
Index Building:     6.727ms/op
```

---

## 项目结构

```
lyui-skill/
├── docs/                    # 组件文档（从上游同步）
├── docs-index.md            # 自动生成的文档索引
├── src/
│   ├── core/
│   │   ├── cache.ts              # LRU 缓存实现
│   │   ├── component-registry.ts # 组件元数据注册表
│   │   ├── doc-index.ts          # 文档索引系统
│   │   ├── doc-manifest.ts       # 文档清单（自动生成）
│   │   ├── doc-parser.ts         # 文档解析器类型定义
│   │   ├── errors.ts             # 错误处理
│   │   ├── pinyin.ts             # 拼音支持
│   │   ├── registry.ts           # 统一导出模块
│   │   ├── search-index.ts       # 倒排索引搜索实现
│   │   └── types.ts              # 类型定义
│   ├── adapters/            # 框架适配层
│   ├── utils/               # 工具函数
│   └── index.ts             # 主入口
├── scripts/
│   ├── sync-docs.mjs        # 文档同步脚本
│   ├── analyze-usage.mjs    # 使用分析脚本
│   ├── generate-doc-index.mjs  # 生成文档索引
│   ├── generate-component.mjs  # 组件生成器
│   └── doc-parser-impl.mjs  # 文档解析实现
├── tests/                   # 单元测试
├── examples/                # 示例代码
├── ARCHITECTURE.md          # 架构设计文档
├── 使用与提效指南.md        # 详细使用文档
└── skill.json               # Skill 元数据
```

---

## CI/CD

项目使用 GitHub Actions 进行持续集成：

- **Lint & Format**：代码规范和格式检查
- **Type Check**：TypeScript 类型检查
- **Test**：多版本 Node.js 测试
- **Build**：构建验证

---

## 相关文档

- [架构设计文档](./ARCHITECTURE.md) - 详细的架构设计说明
- [使用与提效指南](./使用与提效指南.md) - 完整的使用教程和提效技巧
- [CHANGELOG.md](./CHANGELOG.md) - 版本更新历史

---

## 版本管理

遵循 [Semantic Versioning](https://semver.org/) 规范：

- `MAJOR`：不兼容的 API 变更
- `MINOR`：向后兼容的功能添加
- `PATCH`：向后兼容的问题修复

---

## License

UNLICENSED
