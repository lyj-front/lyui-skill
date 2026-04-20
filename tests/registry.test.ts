/**
 * Registry 模块单元测试
 */
import {
  listDocFiles,
  toDocIndexEntry,
  allDocEntries,
  hasDocFile,
  getMetaByDocFile,
  searchComponents,
  getCategoryStats,
  suggestComponents,
  resetSearchIndex,
} from '../dist/src/core/registry.js';

function assertEqual(actual: unknown, expected: unknown, message?: string): void {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected}, got ${actual}`);
  }
}

function assertTrue(value: boolean, message?: string): void {
  if (!value) {
    throw new Error(message || 'Expected true, got false');
  }
}

function assertGreaterThan(actual: number, expected: number, message?: string): void {
  if (!(actual > expected)) {
    throw new Error(message || `Expected ${actual} to be greater than ${expected}`);
  }
}

function runTests() {
  console.log('Running Registry tests...\n');

  // Test 1: listDocFiles 返回文档文件列表
  console.log('Test 1: listDocFiles 返回文档文件列表');
  {
    const files = listDocFiles();
    assertGreaterThan(files.length, 0, 'Should have doc files');
    assertTrue(files.every(f => f.endsWith('.md')), 'All files should end with .md');
    console.log('✓ Passed\n');
  }

  // Test 2: toDocIndexEntry 正确转换文件名
  console.log('Test 2: toDocIndexEntry 正确转换文件名');
  {
    const entry = toDocIndexEntry('button.md');
    assertEqual(entry.file, 'button.md');
    assertEqual(entry.id, 'button');
    console.log('✓ Passed\n');
  }

  // Test 3: allDocEntries 返回所有文档条目
  console.log('Test 3: allDocEntries 返回所有文档条目');
  {
    const entries = allDocEntries();
    const files = listDocFiles();
    assertEqual(entries.length, files.length, 'Should have same number of entries as files');
    console.log('✓ Passed\n');
  }

  // Test 4: 每个条目有 file 和 id
  console.log('Test 4: 每个条目有 file 和 id');
  {
    const entries = allDocEntries();
    for (const entry of entries) {
      assertTrue(entry.file !== undefined, 'Entry should have file');
      assertTrue(entry.id !== undefined, 'Entry should have id');
    }
    console.log('✓ Passed\n');
  }

  // Test 5: hasDocFile 识别存在的文档
  console.log('Test 5: hasDocFile 识别存在的文档');
  {
    const files = listDocFiles();
    if (files.length > 0) {
      assertTrue(hasDocFile(files[0]), 'Should recognize existing doc file');
    }
    console.log('✓ Passed\n');
  }

  // Test 6: hasDocFile 识别不存在的文档
  console.log('Test 6: hasDocFile 识别不存在的文档');
  {
    assertTrue(!hasDocFile('non-existent.md'), 'Should not recognize non-existent doc');
    console.log('✓ Passed\n');
  }

  // Test 7: getMetaByDocFile 返回存在的组件元数据
  console.log('Test 7: getMetaByDocFile 返回存在的组件元数据');
  {
    const meta = getMetaByDocFile('button.md');
    if (meta) {
      assertEqual(meta.id, 'button');
    }
    console.log('✓ Passed\n');
  }

  // Test 8: getMetaByDocFile 返回 undefined 对于不存在的文档
  console.log('Test 8: getMetaByDocFile 返回 undefined 对于不存在的文档');
  {
    const meta = getMetaByDocFile('non-existent.md');
    assertEqual(meta, undefined);
    console.log('✓ Passed\n');
  }

  // Test 9: searchComponents 搜索到匹配的组件
  console.log('Test 9: searchComponents 搜索到匹配的组件');
  {
    resetSearchIndex();
    const results = searchComponents('button');
    assertGreaterThan(results.length, 0, 'Should find button');
    const ids = results.map(r => r.id);
    assertTrue(ids.includes('button'), 'Should include button in results');
    console.log('✓ Passed\n');
  }

  // Test 10: searchComponents 支持中文搜索
  console.log('Test 10: searchComponents 支持中文搜索');
  {
    resetSearchIndex();
    const results = searchComponents('按钮');
    assertGreaterThan(results.length, 0, 'Should find results for Chinese query');
    console.log('✓ Passed\n');
  }

  // Test 11: searchComponents 支持 limit 选项
  console.log('Test 11: searchComponents 支持 limit 选项');
  {
    resetSearchIndex();
    const results = searchComponents('a', { limit: 3 });
    assertTrue(results.length <= 3, 'Should respect limit option');
    console.log('✓ Passed\n');
  }

  // Test 12: getCategoryStats 返回分类统计
  console.log('Test 12: getCategoryStats 返回分类统计');
  {
    const stats = getCategoryStats();
    assertGreaterThan(stats.length, 0, 'Should have category stats');
    for (const stat of stats) {
      assertTrue(stat.category !== undefined, 'Stat should have category');
      assertTrue(stat.name !== undefined, 'Stat should have name');
      assertTrue(typeof stat.count === 'number', 'Stat count should be a number');
    }
    console.log('✓ Passed\n');
  }

  // Test 13: suggestComponents 根据使用场景推荐组件
  console.log('Test 13: suggestComponents 根据使用场景推荐组件');
  {
    const suggestions = suggestComponents('表单');
    assertGreaterThan(suggestions.length, 0, 'Should suggest components');
    console.log('✓ Passed\n');
  }

  // Test 14: suggestComponents 返回带相关度的结果
  console.log('Test 14: suggestComponents 返回带相关度的结果');
  {
    const suggestions = suggestComponents('表格');
    if (suggestions.length > 0) {
      assertTrue(suggestions[0].component !== undefined, 'Should have component');
      assertTrue(typeof suggestions[0].relevance === 'number', 'Should have relevance score');
    }
    console.log('✓ Passed\n');
  }

  // Test 15: suggestComponents 支持 limit 参数
  console.log('Test 15: suggestComponents 支持 limit 参数');
  {
    const suggestions = suggestComponents('弹窗', 2);
    assertTrue(suggestions.length <= 2, 'Should respect limit parameter');
    console.log('✓ Passed\n');
  }

  console.log('All tests passed! ✓');
}

runTests();
