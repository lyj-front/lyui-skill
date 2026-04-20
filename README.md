# LyUI Skill

LyUI Cursor Skill：同步 zh-CN 组件文档、提供索引与适配层占位。

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
└── skill.json               # Skill 元数据
```

## 安装

```bash
npm install
```

## 开发

```bash
# 类型检查
npm run typecheck

# 构建
npm run build

# 运行示例
npm run demo

# 同步文档
npm run sync-docs

# 生成文档索引
npm run generate-doc-index

# 生成新组件
npm run generate-component -- --name my-component --category form
```

## 测试

```bash
# 运行测试
npm test

# 单独运行测试
npm run test:search-index
npm run test:component-registry
npm run test:registry

# 性能基准测试
npm run test:benchmark
```

## 代码规范

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

## 文档索引

运行 `npm run generate-doc-index` 生成 `docs-index.md`，包含：

- 所有组件的分类索引
- 代码示例统计
- API 文档统计

## 组件生成器

快速创建新组件：

```bash
npm run generate-component -- --name my-component --category form --display-name "我的组件"
```

自动生成：
- 文档模板 (`docs/my-component.md`)
- 注册表条目（输出到控制台，需手动添加到 `component-registry.ts`）

## CI/CD

项目使用 GitHub Actions 进行持续集成：

- **Lint & Format**：代码规范和格式检查
- **Type Check**：TypeScript 类型检查
- **Test**：多版本 Node.js 测试
- **Build**：构建验证

## 架构设计

查看 [ARCHITECTURE.md](./ARCHITECTURE.md) 了解详细的架构设计。

## 版本管理

遵循 [Semantic Versioning](https://semver.org/) 规范：

- `MAJOR`：不兼容的 API 变更
- `MINOR`：向后兼容的功能添加
- `PATCH`：向后兼容的问题修复

查看 [CHANGELOG.md](./CHANGELOG.md) 了解版本历史。

## License

UNLICENSED
