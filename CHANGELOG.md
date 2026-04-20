# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- 新增 `SearchIndex` 类，使用倒排索引优化搜索性能
- 新增 `suggestComponentsByUseCase` 函数，基于关键词权重推荐组件
- 添加 Vitest 测试框架和单元测试
- 添加 ESLint 和 Prettier 代码规范配置
- 添加 GitHub Actions CI 工作流
- 添加 `.gitignore` 文件

### Changed
- 重构 `registry.ts`，使用 `SearchIndex` 替代原有搜索实现
- 优化 `component-registry.ts`，移除重复的类型定义
- 改进 `suggestComponents` 算法，使用场景模式匹配而非硬编码正则
- 更新 `package.json`，添加测试、lint、format 脚本
- 更新 `tsconfig.json`，启用更严格的类型检查

### Deprecated
- `searchComponents` 在 `component-registry.ts` 中的旧实现（使用 `SearchIndex` 替代）
- `smartSearch` 函数（使用 `searchComponents` 替代）

## [0.1.0] - 2024-XX-XX

### Added
- 初始版本发布
- 组件注册表系统，支持 100+ 组件的元数据管理
- 文档同步脚本 `sync-docs.mjs`
- 使用分析脚本 `analyze-usage.mjs`
- 组件分类和关键词搜索功能
- 框架适配层占位（Vue/React/Angular）

[Unreleased]: https://github.com/your-org/lyui-skill/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/your-org/lyui-skill/releases/tag/v0.1.0
