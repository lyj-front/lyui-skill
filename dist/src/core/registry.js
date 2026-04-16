import { DOC_FILES } from './doc-manifest.js';
import { COMPONENT_REGISTRY, COMPONENT_MAP, COMPONENTS_BY_CATEGORY, CATEGORY_NAMES, getComponentMeta, searchComponents, getRelatedComponents, getComponentsByCategory, getStandalonePackages, } from './component-registry.js';
export { 
// 从 component-registry 重新导出
COMPONENT_REGISTRY, COMPONENT_MAP, COMPONENTS_BY_CATEGORY, CATEGORY_NAMES, getComponentMeta, searchComponents, getRelatedComponents, getComponentsByCategory, getStandalonePackages, };
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
 * 结合文档索引和组件元数据进行搜索
 */
export function smartSearch(query) {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery)
        return [];
    const results = new Map();
    // 1. 通过组件注册表搜索
    const componentMatches = searchComponents(lowerQuery);
    for (const comp of componentMatches) {
        const score = calculateScore(comp, lowerQuery);
        results.set(comp.id, {
            component: comp,
            score,
            matchedBy: getMatchedBy(comp, lowerQuery),
        });
    }
    // 2. 如果没有匹配，尝试模糊匹配
    if (results.size === 0) {
        for (const comp of COMPONENT_REGISTRY) {
            const score = fuzzyMatch(comp, lowerQuery);
            if (score > 0) {
                results.set(comp.id, {
                    component: comp,
                    score,
                    matchedBy: ['keyword'],
                });
            }
        }
    }
    // 按分数排序
    return Array.from(results.values())
        .sort((a, b) => b.score - a.score);
}
/**
 * 计算匹配分数
 */
function calculateScore(comp, query) {
    let score = 0;
    // ID 完全匹配（最高分）
    if (comp.id === query)
        score += 100;
    else if (comp.id.toLowerCase() === query)
        score += 95;
    // 显示名完全匹配
    if (comp.displayName === query)
        score += 90;
    else if (comp.displayName.toLowerCase() === query)
        score += 85;
    // ID 包含
    if (comp.id.toLowerCase().includes(query))
        score += 50;
    // 显示名包含
    if (comp.displayName.toLowerCase().includes(query))
        score += 40;
    // 关键词匹配
    const keywordMatches = comp.keywords.filter(k => k.toLowerCase().includes(query)).length;
    score += keywordMatches * 20;
    return score;
}
/**
 * 获取匹配来源
 */
function getMatchedBy(comp, query) {
    const matched = [];
    const q = query.toLowerCase();
    if (comp.id.toLowerCase().includes(q))
        matched.push('id');
    if (comp.displayName.toLowerCase().includes(q))
        matched.push('displayName');
    if (comp.keywords.some(k => k.toLowerCase().includes(q)))
        matched.push('keyword');
    return matched;
}
/**
 * 模糊匹配（用于没有直接匹配时的备用方案）
 */
function fuzzyMatch(comp, query) {
    // 简单的字符包含检查
    const allText = [
        comp.id,
        comp.displayName,
        ...comp.keywords,
    ].join(' ').toLowerCase();
    // 检查 query 中的每个字符是否都存在于文本中
    const queryChars = [...query];
    const matched = queryChars.filter(char => allText.includes(char));
    return matched.length / queryChars.length * 30; // 最高 30 分
}
/**
 * 获取分类统计信息
 */
export function getCategoryStats() {
    return Object.keys(COMPONENTS_BY_CATEGORY)
        .map(cat => ({
        category: cat,
        name: CATEGORY_NAMES[cat],
        count: COMPONENTS_BY_CATEGORY[cat].length,
    }));
}
/**
 * 获取组件使用建议
 * 根据用户描述推荐合适的组件
 */
export function suggestComponents(useCase) {
    const useCaseLower = useCase.toLowerCase();
    // 定义使用场景到组件的映射
    const useCasePatterns = [
        { pattern: /表单|输入|提交|验证/, components: ['form', 'input', 'select', 'checkbox', 'radio'] },
        { pattern: /表格|列表|数据展示|分页/, components: ['table', 'table-page', 'pagination', 'list'] },
        { pattern: /弹窗|对话框|提示|确认/, components: ['dialog', 'message-box', 'message', 'notification'] },
        { pattern: /导航|菜单|路由/, components: ['menu', 'tabs', 'breadcrumb', 'dropdown'] },
        { pattern: /加载|等待|进度/, components: ['loading', 'skeleton', 'progress'] },
        { pattern: /选择|下拉|级联/, components: ['select', 'cascader', 'tree', 'radio', 'checkbox'] },
        { pattern: /时间|日期|日历/, components: ['date-picker', 'time-picker', 'calendar', 'datetime-picker'] },
        { pattern: /上传|文件|图片/, components: ['upload', 'image', 'lbg-upload'] },
        { pattern: /搜索|查询|过滤/, components: ['input', 'select', 'emp-search', 'table'] },
    ];
    for (const { pattern, components } of useCasePatterns) {
        if (pattern.test(useCaseLower)) {
            return components
                .map(id => getComponentMeta(id))
                .filter((c) => !!c);
        }
    }
    return [];
}
