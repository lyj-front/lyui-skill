/**
 * LyUI 组件注册表 - 统一导出模块
 * 提供组件检索、搜索和推荐功能
 */
import { DOC_FILES } from './doc-manifest.js';
import { COMPONENT_REGISTRY, COMPONENT_MAP, COMPONENTS_BY_CATEGORY, CATEGORY_NAMES, getComponentMeta, getRelatedComponents, getComponentsByCategory, getStandalonePackages, } from './component-registry.js';
import { SearchIndex, suggestComponentsByUseCase } from './search-index.js';
import { validateSearchQuery, validateSearchOptions, safeExecute, ComponentNotFoundError, } from './errors.js';
// 导出常量
export { COMPONENT_REGISTRY, COMPONENT_MAP, COMPONENTS_BY_CATEGORY, CATEGORY_NAMES, };
// 导出基础查询函数
export { getComponentMeta, getRelatedComponents, getComponentsByCategory, getStandalonePackages, };
// 导出错误类型
export { LyUIError, SearchError, DocParseError, ComponentNotFoundError, ValidationError, safeExecute, safeExecuteAsync, } from './errors.js';
// 初始化搜索索引（单例模式）
let searchIndexInstance = null;
function getSearchIndex() {
    if (!searchIndexInstance) {
        searchIndexInstance = new SearchIndex([...COMPONENT_REGISTRY]);
    }
    return searchIndexInstance;
}
/**
 * 重置搜索索引（用于测试或动态更新注册表后）
 */
export function resetSearchIndex() {
    searchIndexInstance = null;
}
/**
 * 列出所有文档文件
 */
export function listDocFiles() {
    return DOC_FILES;
}
/**
 * 将文件名转换为文档索引条目
 */
export function toDocIndexEntry(file) {
    const id = file.replace(/\.md$/i, '');
    return { file, id };
}
/**
 * 获取所有文档条目
 */
export function allDocEntries() {
    return DOC_FILES.map(toDocIndexEntry);
}
/**
 * 检查文档文件是否存在
 */
export function hasDocFile(file) {
    return DOC_FILES.includes(file);
}
/**
 * 根据文档文件名获取组件元数据
 */
export function getMetaByDocFile(file) {
    const id = file.replace(/\.md$/i, '');
    return getComponentMeta(id);
}
/**
 * 智能搜索组件
 * 使用倒排索引提供高效的搜索能力
 * @deprecated 使用 searchComponents 替代
 */
export function smartSearch(query, options) {
    try {
        validateSearchQuery(query);
        if (options) {
            validateSearchOptions(options);
        }
        return getSearchIndex().search(query, options);
    }
    catch (error) {
        // 返回空数组而不是抛出错误，保持向后兼容
        return [];
    }
}
/**
 * 搜索组件
 * 支持关键词、ID、显示名的模糊匹配，支持拼音搜索
 * @param query - 搜索查询（支持中文、英文、拼音）
 * @param options - 搜索选项
 * @returns 匹配的组件列表
 * @example
 * // 中文搜索
 * searchComponents('按钮') // 返回 button 组件
 * // 拼音搜索
 * searchComponents('anniu') // 返回 button 组件
 * // 英文搜索
 * searchComponents('button') // 返回 button 组件
 */
export function searchComponents(query, options) {
    const result = safeExecute(() => {
        validateSearchQuery(query);
        if (options) {
            validateSearchOptions(options);
        }
        const results = getSearchIndex().search(query, options);
        return results.map(r => r.component);
    });
    return result ?? [];
}
/**
 * 获取分类统计信息
 */
export function getCategoryStats() {
    return Object.keys(COMPONENTS_BY_CATEGORY).map(cat => ({
        category: cat,
        name: CATEGORY_NAMES[cat],
        count: COMPONENTS_BY_CATEGORY[cat].length,
    }));
}
/**
 * 根据使用场景推荐组件
 * @param useCase - 用户描述的使用场景
 * @param limit - 返回结果数量限制
 * @returns 推荐的组件列表及其相关度
 */
export function suggestComponents(useCase, limit = 5) {
    const result = safeExecute(() => {
        if (typeof useCase !== 'string') {
            throw new Error('useCase must be a string');
        }
        if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
            throw new Error('limit must be an integer between 1 and 100');
        }
        return suggestComponentsByUseCase(useCase, getSearchIndex(), limit);
    });
    return result ?? [];
}
/**
 * 获取组件使用建议（简化版，仅返回组件列表）
 * @deprecated 使用 suggestComponents 替代以获取相关度信息
 */
export function suggestComponentsLegacy(useCase) {
    return suggestComponents(useCase).map(r => r.component);
}
/**
 * 安全获取组件元数据
 * @param id - 组件ID
 * @returns 组件元数据，未找到时返回 undefined
 */
export function getComponentMetaSafe(id) {
    return safeExecute(() => {
        const meta = getComponentMeta(id);
        if (!meta) {
            throw new ComponentNotFoundError(id);
        }
        return meta;
    });
}
//# sourceMappingURL=registry.js.map