/**
 * lyui-skill：文档索引与适配层导出（供脚本或类型引用，非浏览器 UI 包）。
 */
// 核心类型
export * from './core/types.js';
// 注册表功能（包含文档索引和组件元数据）
export * from './core/registry.js';
// 搜索索引（高级搜索功能）
export { SearchIndex } from './core/search-index.js';
// 拼音支持
export { getPinyin, matchPinyin, generateSearchVariants } from './core/pinyin.js';
// 缓存
export { LRUCache, createSearchCache, getSearchCache, resetSearchCache } from './core/cache.js';
// 错误处理
export { LyUIError, SearchError, DocParseError, ComponentNotFoundError, ValidationError, safeExecute, safeExecuteAsync, } from './core/errors.js';
// 文档解析和索引
export { DocIndex, getDocIndex, resetDocIndex, generateIndexReport, } from './core/doc-index.js';
// 组件注册表（单独导出，便于按需引用）
export { COMPONENT_REGISTRY, COMPONENT_MAP, COMPONENTS_BY_CATEGORY, CATEGORY_NAMES, getComponentMeta, searchComponents, getRelatedComponents, getComponentsByCategory, getStandalonePackages, } from './core/component-registry.js';
// 工具函数
export * from './utils/paths.js';
// 框架适配器
export * from './adapters/index.js';
//# sourceMappingURL=index.js.map