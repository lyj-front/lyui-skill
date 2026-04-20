/**
 * 文档索引系统 - 为 AI 提供结构化的文档访问能力
 */

import { DOC_FILES } from './doc-manifest.js';
import type { ParsedDoc, DocIndexItem } from './doc-parser.js';

// 重新导出类型
export type {
  ParsedDoc,
  DocSection,
  DocSectionType,
  ApiDefinition,
  CodeExample,
} from './doc-parser.js';

/** 文档索引 */
export class DocIndex {
  private items: Map<string, DocIndexItem> = new Map();
  private parsedCache: Map<string, ParsedDoc> = new Map();
  private initialized = false;

  /**
   * 初始化索引
   */
  initialize(): void {
    if (this.initialized) return;

    for (const file of DOC_FILES) {
      const id = file.replace(/\.md$/i, '');
      this.items.set(id, {
        file,
        id,
        title: id,
        description: '',
        hasExamples: false,
        hasApiDocs: false,
        exampleCount: 0,
        lineCount: 0,
      });
    }

    this.initialized = true;
  }

  /**
   * 获取所有文档索引
   */
  getAllItems(): DocIndexItem[] {
    this.initialize();
    return Array.from(this.items.values());
  }

  /**
   * 根据ID获取文档索引
   */
  getItem(id: string): DocIndexItem | undefined {
    this.initialize();
    return this.items.get(id);
  }

  /**
   * 根据文件名获取文档索引
   */
  getItemByFile(file: string): DocIndexItem | undefined {
    this.initialize();
    return Array.from(this.items.values()).find(item => item.file === file);
  }

  /**
   * 搜索文档
   */
  search(query: string): DocIndexItem[] {
    this.initialize();
    const lowerQuery = query.toLowerCase();

    return Array.from(this.items.values()).filter(item =>
      item.id.toLowerCase().includes(lowerQuery) ||
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * 获取有示例的文档列表
   */
  getDocsWithExamples(): DocIndexItem[] {
    this.initialize();
    return Array.from(this.items.values()).filter(item => item.hasExamples);
  }

  /**
   * 获取有 API 文档的组件列表
   */
  getDocsWithApis(): DocIndexItem[] {
    this.initialize();
    return Array.from(this.items.values()).filter(item => item.hasApiDocs);
  }

  /**
   * 获取文档统计信息
   */
  getStats(): {
    totalDocs: number;
    docsWithExamples: number;
    docsWithApis: number;
    totalExamples: number;
    averageDocSize: number;
  } {
    this.initialize();
    const items = Array.from(this.items.values());

    return {
      totalDocs: items.length,
      docsWithExamples: items.filter(i => i.hasExamples).length,
      docsWithApis: items.filter(i => i.hasApiDocs).length,
      totalExamples: items.reduce((sum, i) => sum + i.exampleCount, 0),
      averageDocSize: items.reduce((sum, i) => sum + i.lineCount, 0) / items.length || 0,
    };
  }

  /**
   * 清除缓存
   */
  clearCache(): void {
    this.parsedCache.clear();
  }
}

// 单例实例
let globalIndex: DocIndex | null = null;

/**
 * 获取全局文档索引实例
 */
export function getDocIndex(): DocIndex {
  if (!globalIndex) {
    globalIndex = new DocIndex();
  }
  return globalIndex;
}

/**
 * 重置全局文档索引
 */
export function resetDocIndex(): void {
  globalIndex = null;
}

/**
 * 生成完整的文档索引报告
 * 适合 AI 快速了解整个文档库
 */
export function generateIndexReport(): string {
  const index = getDocIndex();
  const items = index.getAllItems();
  const stats = index.getStats();

  const lines: string[] = [];

  lines.push('# LyUI 文档索引报告');
  lines.push('');
  lines.push('## 统计概览');
  lines.push('');
  lines.push(`- **总文档数**: ${stats.totalDocs}`);
  lines.push(`- **有代码示例**: ${stats.docsWithExamples} (${((stats.docsWithExamples / stats.totalDocs) * 100).toFixed(1)}%)`);
  lines.push(`- **有 API 文档**: ${stats.docsWithApis} (${((stats.docsWithApis / stats.totalDocs) * 100).toFixed(1)}%)`);
  lines.push(`- **总示例数**: ${stats.totalExamples}`);
  lines.push(`- **平均每文档行数**: ${stats.averageDocSize.toFixed(0)}`);
  lines.push('');

  // 按组件类型分组
  const categories = {
    basic: { name: '基础组件', items: [] as DocIndexItem[] },
    form: { name: '表单组件', items: [] as DocIndexItem[] },
    data: { name: '数据展示', items: [] as DocIndexItem[] },
    feedback: { name: '反馈组件', items: [] as DocIndexItem[] },
    navigation: { name: '导航组件', items: [] as DocIndexItem[] },
    business: { name: '业务组件', items: [] as DocIndexItem[] },
    guide: { name: '指南文档', items: [] as DocIndexItem[] },
    other: { name: '其他', items: [] as DocIndexItem[] },
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
      const tags: string[] = [];
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

export type { DocIndexItem };
