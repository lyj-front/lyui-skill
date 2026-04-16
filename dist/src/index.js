/**
 * lyui-skill：文档索引与适配层导出（供脚本或类型引用，非浏览器 UI 包）。
 */
// 核心类型
export * from './core/types.js';
// 注册表功能（包含文档索引和组件元数据）
export * from './core/registry.js';
// 组件注册表（单独导出，便于按需引用）
export { COMPONENT_REGISTRY, COMPONENT_MAP, COMPONENTS_BY_CATEGORY, CATEGORY_NAMES, getComponentMeta, searchComponents, getRelatedComponents, getComponentsByCategory, getStandalonePackages, } from './core/component-registry.js';
// 工具函数
export * from './utils/paths.js';
// 框架适配器
export * from './adapters/index.js';
