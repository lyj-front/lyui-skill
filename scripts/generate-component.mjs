/**
 * 组件生成器
 * 快速创建新组件的模板文件
 * 
 * 使用: node scripts/generate-component.mjs --name my-component --category form
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

function parseArgs(argv) {
  const args = { name: '', category: 'other', displayName: '', description: '' };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--name') args.name = argv[++i];
    else if (a === '--category') args.category = argv[++i];
    else if (a === '--display-name') args.displayName = argv[++i];
    else if (a === '--description') args.description = argv[++i];
  }
  return args;
}

function validateArgs(args) {
  if (!args.name) {
    console.error('Error: --name is required');
    process.exit(1);
  }
  
  if (!/^[a-z0-9-]+$/.test(args.name)) {
    console.error('Error: --name must contain only lowercase letters, numbers, and hyphens');
    process.exit(1);
  }
  
  const validCategories = ['basic', 'form', 'data', 'feedback', 'navigation', 'business', 'guide', 'other'];
  if (!validCategories.includes(args.category)) {
    console.error(`Error: --category must be one of: ${validCategories.join(', ')}`);
    process.exit(1);
  }
}

function generateDocTemplate(name, displayName, category) {
  const upperName = name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
  
  return `## ${upperName} ${displayName}

${displayName}组件的简要描述。

### 基础用法

:::demo ${displayName}的基础用法示例。

\`\`\`html
<template>
  <ly-${name}></ly-${name}>
</template>

<script>
  export default {
    data() {
      return {};
    },
  };
<\/script>
\`\`\`

:::

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| - | - | - | - | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| - | - | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| - | - |
`;
}

function generateRegistryEntry(name, displayName, category, description) {
  const keywords = [name, `ly-${name}`, displayName];
  
  return `  {
    id: '${name}',
    displayName: '${displayName}',
    category: '${category}',
    keywords: ${JSON.stringify(keywords)},
    related: [],
    complexity: 'simple',
    docPath: 'docs/${name}.md',
  },`;
}

function main() {
  const args = parseArgs(process.argv);
  validateArgs(args);
  
  const displayName = args.displayName || args.name.split('-').map(s => 
    s.charAt(0).toUpperCase() + s.slice(1)
  ).join('');
  
  console.log(`Generating component: ${args.name}`);
  console.log(`  Display Name: ${displayName}`);
  console.log(`  Category: ${args.category}`);
  
  // 创建文档文件
  const docPath = join(process.cwd(), 'docs', `${args.name}.md`);
  const docContent = generateDocTemplate(args.name, displayName, args.category);
  
  try {
    writeFileSync(docPath, docContent, 'utf-8');
    console.log(`\n✓ Created: ${docPath}`);
  } catch (error) {
    console.error(`\n✗ Failed to create doc: ${error.message}`);
    process.exit(1);
  }
  
  // 输出生成的注册表条目
  console.log('\n--- Add this to component-registry.ts ---');
  console.log(generateRegistryEntry(args.name, displayName, args.category, args.description));
  console.log('\n--- Then run: npm run sync-docs ---');
  
  console.log('\n✓ Component generated successfully!');
}

main();
