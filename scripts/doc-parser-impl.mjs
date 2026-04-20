/**
 * 文档解析器实现 - 用于脚本
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * 解析单个文档文件
 */
export function parseDocFile(filePath, docRoot = 'docs') {
  const fullPath = join(process.cwd(), docRoot, filePath);
  const content = readFileSync(fullPath, 'utf-8');
  const lines = content.split('\n');

  const id = filePath.replace(/\.md$/i, '');
  const sections = [];
  const codeExamples = [];

  // 解析标题和描述
  let title = '';
  let description = '';
  let currentSection = null;
  let inDemo = false;
  let demoBuffer = [];
  let demoTitle = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // 提取主标题
    if (!title && trimmed.startsWith('# ')) {
      title = trimmed.replace(/^#\s*/, '').trim();
      continue;
    }

    // 提取副标题作为描述
    if (!description && trimmed.startsWith('## ') && !trimmed.includes('Attributes') && !trimmed.includes('Events') && !trimmed.includes('Slots') && !trimmed.includes('Methods')) {
      description = trimmed.replace(/^##\s*/, '').trim();
      continue;
    }

    // 检测 demo 开始
    if (trimmed === ':::demo') {
      inDemo = true;
      demoBuffer = [];
      // 尝试获取 demo 标题（前一行）
      demoTitle = '';
      if (i > 0) {
        const prevLine = lines[i - 1].trim();
        if (prevLine.startsWith('### ')) {
          demoTitle = prevLine.replace(/^###\s*/, '');
        }
      }
      continue;
    }

    // 检测 demo 结束
    if (trimmed === ':::' && inDemo) {
      inDemo = false;
      const demoContent = demoBuffer.join('\n');
      const codeMatch = demoContent.match(/```html\n([\s\S]*?)```/);
      const jsMatch = demoContent.match(/```js\n([\s\S]*?)```/) || demoContent.match(/<script>([\s\S]*?)<\/script>/);

      if (codeMatch) {
        codeExamples.push({
          title: demoTitle || '示例',
          html: codeMatch[1]?.trim(),
          js: jsMatch ? (jsMatch[1]?.trim() || undefined) : undefined,
          fullCode: codeMatch[1]?.trim() || demoContent,
        });
      }
      continue;
    }

    // 收集 demo 内容
    if (inDemo) {
      demoBuffer.push(line);
      continue;
    }

    // 检测章节标题
    if (trimmed.startsWith('## ') || trimmed.startsWith('### ')) {
      if (currentSection) {
        currentSection.lineEnd = i - 1;
        sections.push(currentSection);
      }

      const sectionTitle = trimmed.replace(/^#+\s*/, '');
      let sectionType = 'other';

      if (sectionTitle.includes('Attributes') || sectionTitle.includes('Props')) {
        sectionType = 'api';
      } else if (sectionTitle.includes('Events')) {
        sectionType = 'api';
      } else if (sectionTitle.includes('Slots')) {
        sectionType = 'api';
      } else if (sectionTitle.includes('Methods')) {
        sectionType = 'api';
      } else if (sectionTitle.includes('示例') || sectionTitle.toLowerCase().includes('example')) {
        sectionType = 'example';
      }

      currentSection = {
        type: sectionType,
        title: sectionTitle,
        content: '',
        lineStart: i,
        lineEnd: i,
      };
      continue;
    }

    // 收集章节内容
    if (currentSection && trimmed) {
      currentSection.content += trimmed + '\n';
    }
  }

  // 关闭最后一个章节
  if (currentSection) {
    currentSection.lineEnd = lines.length - 1;
    sections.push(currentSection);
  }

  return {
    id,
    title: title || id,
    description: description || '',
    sections,
    codeExamples,
    totalLines: lines.length,
  };
}

/**
 * 生成文档摘要
 */
export function generateDocSummary(parsedDoc) {
  const lines = [];

  lines.push(`# ${parsedDoc.title}`);
  lines.push('');

  if (parsedDoc.description) {
    lines.push(`**描述**: ${parsedDoc.description}`);
    lines.push('');
  }

  if (parsedDoc.codeExamples.length > 0) {
    lines.push(`**代码示例**: ${parsedDoc.codeExamples.length} 个`);
    for (const example of parsedDoc.codeExamples.slice(0, 3)) {
      lines.push(`  - ${example.title}`);
    }
    if (parsedDoc.codeExamples.length > 3) {
      lines.push(`  ... 还有 ${parsedDoc.codeExamples.length - 3} 个示例`);
    }
    lines.push('');
  }

  const apiSections = parsedDoc.sections.filter(s => s.type === 'api');
  if (apiSections.length > 0) {
    lines.push(`**API 章节**: ${apiSections.length} 个`);
    for (const section of apiSections) {
      lines.push(`  - ${section.title}`);
    }
    lines.push('');
  }

  lines.push(`**文档长度**: ${parsedDoc.totalLines} 行`);

  return lines.join('\n');
}

/**
 * 快速获取组件关键信息
 */
export function getComponentQuickInfo(filePath, docRoot = 'docs') {
  try {
    const parsed = parseDocFile(filePath, docRoot);
    return {
      file: filePath,
      id: parsed.id,
      title: parsed.title,
      description: parsed.description,
      hasExamples: parsed.codeExamples.length > 0,
      hasApiDocs: parsed.sections.some(s => s.type === 'api'),
      exampleCount: parsed.codeExamples.length,
      lineCount: parsed.totalLines,
    };
  } catch {
    return {
      file: filePath,
      id: filePath.replace(/\.md$/i, ''),
      title: filePath.replace(/\.md$/i, ''),
      description: '',
      hasExamples: false,
      hasApiDocs: false,
      exampleCount: 0,
      lineCount: 0,
    };
  }
}
