/**
 * 性能基准测试
 * 测试搜索算法的性能表现
 */

import { SearchIndex } from '../dist/src/core/search-index.js';
import { COMPONENT_REGISTRY } from '../dist/src/core/component-registry.js';

/**
 * 简单的性能测试工具
 */
function benchmark(name: string, fn: () => void, iterations: number = 1000): number {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();
  const avgTime = (end - start) / iterations;
  console.log(`  ${name}: ${avgTime.toFixed(3)}ms/op (avg of ${iterations} runs)`);
  return avgTime;
}

/**
 * 运行所有基准测试
 */
function runBenchmarks() {
  console.log('Running Performance Benchmarks...\n');
  
  const index = new SearchIndex(COMPONENT_REGISTRY);
  
  // 测试 1: 精确ID查找
  console.log('Test 1: Exact ID Lookup');
  benchmark('Exact ID "button"', () => {
    index.search('button', { limit: 10 });
  }, 1000);
  
  // 测试 2: 中文搜索
  console.log('\nTest 2: Chinese Search');
  benchmark('Chinese "按钮"', () => {
    index.search('按钮', { limit: 10 });
  }, 1000);
  
  // 测试 3: 拼音搜索
  console.log('\nTest 3: Pinyin Search');
  benchmark('Pinyin "anniu"', () => {
    index.search('anniu', { limit: 10 });
  }, 1000);
  
  // 测试 4: 模糊搜索
  console.log('\nTest 4: Fuzzy Search');
  benchmark('Fuzzy "but"', () => {
    index.search('but', { limit: 10, fuzzy: true });
  }, 1000);
  
  // 测试 5: 复杂查询
  console.log('\nTest 5: Complex Query');
  benchmark('Complex "table page"', () => {
    index.search('table page', { limit: 10, fuzzy: true });
  }, 1000);
  
  // 测试 6: 索引构建时间
  console.log('\nTest 6: Index Building');
  benchmark('Build Index', () => {
    new SearchIndex(COMPONENT_REGISTRY);
  }, 100);
  
  console.log('\n✓ All benchmarks completed!');
}

// 运行测试
runBenchmarks();
