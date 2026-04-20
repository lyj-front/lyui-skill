/**
 * 文档解析器类型定义
 * 实际的解析逻辑在脚本中实现
 */

/** 文档片段类型 */
export type DocSectionType = 'title' | 'description' | 'demo' | 'api' | 'example' | 'other';

/** 文档片段 */
export interface DocSection {
  type: DocSectionType;
  title?: string;
  content: string;
  code?: string;
  lineStart: number;
  lineEnd: number;
}

/** 解析后的文档 */
export interface ParsedDoc {
  /** 组件ID */
  id: string;
  /** 组件显示名 */
  title: string;
  /** 简短描述 */
  description: string;
  /** 文档片段 */
  sections: DocSection[];
  /** API 表格（如果存在） */
  apis?: ApiDefinition[];
  /** 代码示例 */
  codeExamples: CodeExample[];
  /** 文档总行数 */
  totalLines: number;
}

/** API 定义 */
export interface ApiDefinition {
  /** 属性/事件名 */
  name: string;
  /** 说明 */
  description: string;
  /** 类型 */
  type: string;
  /** 可选值 */
  options?: string;
  /** 默认值 */
  default?: string;
}

/** 代码示例 */
export interface CodeExample {
  /** 示例标题 */
  title: string;
  /** 示例描述 */
  description?: string;
  /** HTML 代码 */
  html?: string;
  /** JavaScript 代码 */
  js?: string;
  /** 完整代码 */
  fullCode: string;
}

/** 文档索引项 */
export interface DocIndexItem {
  /** 文件名 */
  file: string;
  /** 组件ID */
  id: string;
  /** 组件标题 */
  title: string;
  /** 简短描述 */
  description: string;
  /** 是否有代码示例 */
  hasExamples: boolean;
  /** 是否有 API 文档 */
  hasApiDocs: boolean;
  /** 示例数量 */
  exampleCount: number;
  /** 文档大小（行数） */
  lineCount: number;
  /** 分类 */
  category?: string;
}
