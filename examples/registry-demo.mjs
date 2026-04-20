/**
 * 组件注册表功能演示
 * 运行: node examples/registry-demo.mjs
 */

import {
  // 基础查询
  getComponentMeta,
  searchComponents,
  getRelatedComponents,
  getComponentsByCategory,
  getStandalonePackages,

  // 智能搜索
  suggestComponents,
  getCategoryStats,

  // 常量
  CATEGORY_NAMES,
  COMPONENT_REGISTRY,
} from '../dist/src/core/registry.js';

console.log('=== LyUI 组件注册表演示 ===\n');

// 1. 获取分类统计
console.log('1. 组件分类统计:');
const stats = getCategoryStats();
stats.forEach(({ category, name, count }) => {
  console.log(`   ${name} (${category}): ${count} 个组件`);
});
console.log(`   总计: ${COMPONENT_REGISTRY.length} 个组件\n`);

// 2. 搜索组件示例
console.log('2. 搜索 "按钮":');
const buttonResults = searchComponents('按钮', { limit: 5 });
buttonResults.forEach((comp) => {
  console.log(`   - ${comp.displayName} (${comp.id}): ${comp.keywords.slice(0, 3).join(', ')}...`);
});
console.log();

// 3. 智能搜索
console.log('3. 智能搜索 "弹窗":');
const dialogResults = searchComponents('弹窗', { limit: 5, fuzzy: true });
dialogResults.forEach((comp, index) => {
  console.log(`   ${index + 1}. ${comp.displayName} (${comp.id})`);
});
console.log();

// 4. 获取组件详情
console.log('4. 获取 table 组件详情:');
const tableMeta = getComponentMeta('table');
if (tableMeta) {
  console.log(`   名称: ${tableMeta.displayName}`);
  console.log(`   分类: ${CATEGORY_NAMES[tableMeta.category]}`);
  console.log(`   复杂度: ${tableMeta.complexity}`);
  console.log(`   关键词: ${tableMeta.keywords.slice(0, 5).join(', ')}...`);
  console.log(`   关联组件: ${tableMeta.related.join(', ')}`);
}
console.log();

// 5. 获取关联组件
console.log('5. table 的关联组件:');
const related = getRelatedComponents('table');
related.forEach((comp) => {
  console.log(`   - ${comp.displayName} (${comp.id})`);
});
console.log();

// 6. 使用场景推荐
console.log('6. 表单场景推荐组件:');
const formSuggestions = suggestComponents('需要一个表单来提交数据', 5);
formSuggestions.forEach(({ component, relevance }) => {
  console.log(`   - ${component.displayName} (${component.id}): 相关度 ${(relevance * 100).toFixed(0)}%`);
});
console.log();

// 7. 独立包组件
console.log('7. 独立包组件:');
const standalone = getStandalonePackages();
standalone.forEach((comp) => {
  console.log(`   - ${comp.displayName}: yarn add ${comp.packageName}`);
});
console.log();

console.log('=== 演示结束 ===');
