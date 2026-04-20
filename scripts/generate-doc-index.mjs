/**
 * 生成文档索引报告
 * 运行: node scripts/generate-doc-index.mjs
 */

import { parseDocFile, generateDocSummary, getComponentQuickInfo } from './doc-parser-impl.mjs';
import { DOC_FILES } from '../dist/src/core/doc-manifest.js';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

function generateIndexReport() {
  const items = [];

  for (const file of DOC_FILES) {
    try {
      const info = getComponentQuickInfo(file);
      items.push(info);
    } catch {
      // 忽略解析失败的文件
    }
  }

  const stats = {
    totalDocs: items.length,
    docsWithExamples: items.filter(i => i.hasExamples).length,
    docsWithApis: items.filter(i => i.hasApiDocs).length,
    totalExamples: items.reduce((sum, i) => sum + i.exampleCount, 0),
  };

  const lines = [];

  lines.push('# LyUI 文档索引报告');
  lines.push('');
  lines.push('## 统计概览');
  lines.push('');
  lines.push(`- **总文档数**: ${stats.totalDocs}`);
  lines.push(`- **有代码示例**: ${stats.docsWithExamples} (${((stats.docsWithExamples / stats.totalDocs) * 100).toFixed(1)}%)`);
  lines.push(`- **有 API 文档**: ${stats.docsWithApis} (${((stats.docsWithApis / stats.totalDocs) * 100).toFixed(1)}%)`);
  lines.push(`- **总示例数**: ${stats.totalExamples}`);
  lines.push('');

  // 按组件类型分组
  const categories = {
    basic: { name: '基础组件', items: [] },
    form: { name: '表单组件', items: [] },
    data: { name: '数据展示', items: [] },
    feedback: { name: '反馈组件', items: [] },
    navigation: { name: '导航组件', items: [] },
    business: { name: '业务组件', items: [] },
    guide: { name: '指南文档', items: [] },
    other: { name: '其他', items: [] },
  };

  for (const item of items) {
    const id = item.id.toLowerCase();
    if (id.includes('table') || id.includes('list') || id.includes('tree') || id.includes('calendar') || id.includes('pagination')) {
      categories.data.items.push(item);
    } else if (id.includes('form') || id.includes('input') || id.includes('select') || id.includes('checkbox') || id.includes('radio') || id.includes('date') || id.includes('time') || id.includes('upload')) {
      categories.form.items.push(item);
    } else if (id.includes('button') || id.includes('icon') || id.includes('layout') || id.includes('card') || id.includes('link') || id.includes('space')) {
      categories.basic.items.push(item);
    } else if (id.includes('dialog') || id.includes('message') || id.includes('notification') || id.includes('loading') || id.includes('popover') || id.includes('tooltip')) {
      categories.feedback.items.push(item);
    } else if (id.includes('menu') || id.includes('nav') || id.includes('tab') || id.includes('breadcrumb') || id.includes('dropdown') || id.includes('steps')) {
      categories.navigation.items.push(item);
    } else if (id.includes('install') || id.includes('quickstart') || id.includes('theme') || id.includes('deploy') || id.includes('design')) {
      categories.guide.items.push(item);
    } else if (id.includes('lyj') || id.includes('emp') || id.includes('ad-') || id.includes('lbg') || id.includes('pdf') || id.includes('rich')) {
      categories.business.items.push(item);
    } else {
      categories.other.items.push(item);
    }
  }

  for (const category of Object.values(categories)) {
    if (category.items.length === 0) continue;

    lines.push(`## ${category.name} (${category.items.length})`);
    lines.push('');

    for (const item of category.items.sort((a, b) => a.id.localeCompare(b.id))) {
      const tags = [];
      if (item.hasExamples) tags.push('示例');
      if (item.hasApiDocs) tags.push('API');

      lines.push(`### ${item.title}`);
      if (item.description) {
        lines.push(`${item.description}`);
      }
      if (tags.length > 0) {
        lines.push(`[${tags.join(', ')}]`);
      }
      lines.push('');
    }
  }

  return lines.join('\n');
}

function main() {
  console.log('Generating documentation index...\n');

  const report = generateIndexReport();

  // 输出到控制台
  console.log(report);

  // 保存到文件
  const outputPath = join(process.cwd(), 'docs-index.md');
  writeFileSync(outputPath, report, 'utf-8');
  console.log(`\n✓ Index saved to: ${outputPath}`);

  // 输出统计
  const items = [];
  for (const file of DOC_FILES) {
    try {
      const info = getComponentQuickInfo(file);
      items.push(info);
    } catch {
      // 忽略
    }
  }

  console.log('\n📊 Statistics:');
  console.log(`  Total documents: ${items.length}`);
  console.log(`  With examples: ${items.filter(i => i.hasExamples).length}`);
  console.log(`  With API docs: ${items.filter(i => i.hasApiDocs).length}`);
  console.log(`  Total examples: ${items.reduce((sum, i) => sum + i.exampleCount, 0)}`);
}

main();
