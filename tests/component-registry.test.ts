/**
 * Component Registry 单元测试
 */
import {
  COMPONENT_REGISTRY,
  COMPONENT_MAP,
  COMPONENTS_BY_CATEGORY,
  getComponentMeta,
  getRelatedComponents,
  getComponentsByCategory,
  getStandalonePackages,
} from '../dist/src/core/component-registry.js';
import type { ComponentCategory } from '../dist/src/core/types.js';

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
  console.log('Running Component Registry tests...\n');

  // Test 1: COMPONENT_REGISTRY 不为空
  console.log('Test 1: COMPONENT_REGISTRY 不为空');
  {
    assertGreaterThan(COMPONENT_REGISTRY.length, 0, 'Should have components');
    console.log('✓ Passed\n');
  }

  // Test 2: 每个组件有必需字段
  console.log('Test 2: 每个组件有必需字段');
  {
    for (const comp of COMPONENT_REGISTRY) {
      assertTrue(comp.id !== undefined, 'Component should have id');
      assertTrue(comp.displayName !== undefined, 'Component should have displayName');
      assertTrue(comp.category !== undefined, 'Component should have category');
      assertTrue(Array.isArray(comp.keywords), 'Component should have keywords array');
      assertTrue(Array.isArray(comp.related), 'Component should have related array');
      assertTrue(['simple', 'medium', 'complex'].includes(comp.complexity), 'Component should have valid complexity');
      assertTrue(comp.docPath !== undefined, 'Component should have docPath');
    }
    console.log('✓ Passed\n');
  }

  // Test 3: 组件ID唯一
  console.log('Test 3: 组件ID唯一');
  {
    const ids = COMPONENT_REGISTRY.map(c => c.id);
    const uniqueIds = new Set(ids);
    assertEqual(uniqueIds.size, ids.length, 'All component IDs should be unique');
    console.log('✓ Passed\n');
  }

  // Test 4: COMPONENT_MAP 包含所有组件
  console.log('Test 4: COMPONENT_MAP 包含所有组件');
  {
    assertEqual(COMPONENT_MAP.size, COMPONENT_REGISTRY.length, 'Map should contain all components');
    console.log('✓ Passed\n');
  }

  // Test 5: 可以通过ID快速查找
  console.log('Test 5: 可以通过ID快速查找');
  {
    const button = COMPONENT_MAP.get('button');
    assertTrue(button !== undefined, 'Should find button');
    assertEqual(button?.displayName, '按钮');
    console.log('✓ Passed\n');
  }

  // Test 6: 包含所有分类
  console.log('Test 6: 包含所有分类');
  {
    const categories = Object.keys(COMPONENTS_BY_CATEGORY) as ComponentCategory[];
    assertTrue(categories.includes('basic'), 'Should have basic category');
    assertTrue(categories.includes('form'), 'Should have form category');
    assertTrue(categories.includes('data'), 'Should have data category');
    assertTrue(categories.includes('feedback'), 'Should have feedback category');
    assertTrue(categories.includes('navigation'), 'Should have navigation category');
    assertTrue(categories.includes('business'), 'Should have business category');
    assertTrue(categories.includes('guide'), 'Should have guide category');
    console.log('✓ Passed\n');
  }

  // Test 7: 分类组件数量之和等于总数
  console.log('Test 7: 分类组件数量之和等于总数');
  {
    const totalByCategory = Object.values(COMPONENTS_BY_CATEGORY).reduce(
      (sum, comps) => sum + comps.length,
      0
    );
    assertEqual(totalByCategory, COMPONENT_REGISTRY.length, 'Sum of categories should equal total');
    console.log('✓ Passed\n');
  }

  // Test 8: getComponentMeta 返回正确数据
  console.log('Test 8: getComponentMeta 返回正确数据');
  {
    const meta = getComponentMeta('button');
    assertTrue(meta !== undefined, 'Should return meta for button');
    assertEqual(meta?.id, 'button');
    console.log('✓ Passed\n');
  }

  // Test 9: getComponentMeta 返回 undefined 对于不存在的组件
  console.log('Test 9: getComponentMeta 返回 undefined 对于不存在的组件');
  {
    const meta = getComponentMeta('non-existent-component');
    assertEqual(meta, undefined, 'Should return undefined for non-existent component');
    console.log('✓ Passed\n');
  }

  // Test 10: getRelatedComponents 返回关联组件
  console.log('Test 10: getRelatedComponents 返回关联组件');
  {
    const related = getRelatedComponents('form');
    assertGreaterThan(related.length, 0, 'Should return related components');
    console.log('✓ Passed\n');
  }

  // Test 11: getRelatedComponents 返回空数组对于不存在的组件
  console.log('Test 11: getRelatedComponents 返回空数组对于不存在的组件');
  {
    const related = getRelatedComponents('non-existent');
    assertEqual(related.length, 0, 'Should return empty array for non-existent component');
    console.log('✓ Passed\n');
  }

  // Test 12: getComponentsByCategory 返回正确分类的组件
  console.log('Test 12: getComponentsByCategory 返回正确分类的组件');
  {
    const basicComponents = getComponentsByCategory('basic');
    assertGreaterThan(basicComponents.length, 0, 'Should have basic components');
    for (const comp of basicComponents) {
      assertEqual(comp.category, 'basic', 'All components should be in basic category');
    }
    console.log('✓ Passed\n');
  }

  // Test 13: getStandalonePackages 返回有独立包的组件
  console.log('Test 13: getStandalonePackages 返回有独立包的组件');
  {
    const standalone = getStandalonePackages();
    for (const comp of standalone) {
      assertTrue(comp.hasStandalonePackage === true, 'Should have standalone package flag');
      assertTrue(comp.packageName !== undefined, 'Should have package name');
    }
    console.log('✓ Passed\n');
  }

  // Test 14: ad-dialog 是独立包
  console.log('Test 14: ad-dialog 是独立包');
  {
    const standalone = getStandalonePackages();
    const adDialog = standalone.find(c => c.id === 'ad-dialog');
    assertTrue(adDialog !== undefined, 'ad-dialog should be a standalone package');
    assertEqual(adDialog?.packageName, 'ad-dialog');
    console.log('✓ Passed\n');
  }

  console.log('All tests passed! ✓');
}

runTests();
