/**
 * SearchIndex 单元测试
 */
import { SearchIndex, suggestComponentsByUseCase } from '../dist/src/core/search-index.js';
import type { ComponentMeta } from '../dist/src/core/types.js';

const mockComponents: ComponentMeta[] = [
  {
    id: 'button',
    displayName: '按钮',
    category: 'basic',
    keywords: ['button', 'btn', '按钮', '提交', '确认'],
    related: [],
    complexity: 'simple',
    docPath: 'docs/button.md',
  },
  {
    id: 'input',
    displayName: '输入框',
    category: 'form',
    keywords: ['input', '输入框', '文本框', '表单'],
    related: ['form'],
    complexity: 'simple',
    docPath: 'docs/input.md',
  },
  {
    id: 'form',
    displayName: '表单',
    category: 'form',
    keywords: ['form', '表单', '提交', '验证'],
    related: ['input', 'button'],
    complexity: 'complex',
    docPath: 'docs/form.md',
  },
  {
    id: 'table',
    displayName: '表格',
    category: 'data',
    keywords: ['table', '表格', '列表', '数据展示'],
    related: ['pagination'],
    complexity: 'complex',
    docPath: 'docs/table.md',
  },
  {
    id: 'dialog',
    displayName: '对话框',
    category: 'feedback',
    keywords: ['dialog', '对话框', '弹窗', 'modal'],
    related: ['message-box'],
    complexity: 'medium',
    docPath: 'docs/dialog.md',
  },
];

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
  console.log('Running SearchIndex tests...\n');

  // Test 1: 精确ID匹配
  console.log('Test 1: 精确ID匹配');
  {
    const index = new SearchIndex(mockComponents);
    const results = index.search('button');
    assertEqual(results.length, 1, 'Should find exactly one button');
    assertEqual(results[0].component.id, 'button');
    assertTrue(results[0].score > 0.9, 'Score should be high for exact match');
    console.log('✓ Passed\n');
  }

  // Test 2: 显示名匹配
  console.log('Test 2: 显示名匹配');
  {
    const index = new SearchIndex(mockComponents);
    const results = index.search('输入框');
    assertGreaterThan(results.length, 0, 'Should find at least one result');
    assertEqual(results[0].component.id, 'input');
    console.log('✓ Passed\n');
  }

  // Test 3: 关键词模糊匹配
  console.log('Test 3: 关键词模糊匹配');
  {
    const index = new SearchIndex(mockComponents);
    const results = index.search('提交', { fuzzy: true });
    assertGreaterThan(results.length, 0, 'Should find results');
    const ids = results.map(r => r.component.id);
    assertTrue(ids.includes('button'), 'Should include button');
    assertTrue(ids.includes('form'), 'Should include form');
    console.log('✓ Passed\n');
  }

  // Test 4: limit参数
  console.log('Test 4: limit参数');
  {
    const index = new SearchIndex(mockComponents);
    const results = index.search('框', { limit: 2 });
    assertTrue(results.length <= 2, 'Should respect limit');
    console.log('✓ Passed\n');
  }

  // Test 5: 空查询
  console.log('Test 5: 空查询');
  {
    const index = new SearchIndex(mockComponents);
    const results = index.search('');
    assertEqual(results.length, 0, 'Empty query should return empty array');
    console.log('✓ Passed\n');
  }

  // Test 6: suggestComponentsByUseCase
  console.log('Test 6: suggestComponentsByUseCase');
  {
    const index = new SearchIndex(mockComponents);
    const suggestions = suggestComponentsByUseCase('需要一个表单来提交数据', index);
    assertGreaterThan(suggestions.length, 0, 'Should suggest components');
    const ids = suggestions.map(s => s.component.id);
    assertTrue(ids.includes('form'), 'Should suggest form');
    console.log('✓ Passed\n');
  }

  console.log('All tests passed! ✓');
}

runTests();
