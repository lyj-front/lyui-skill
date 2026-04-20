/**
 * 与框架无关的文档索引类型（Skill 侧元数据，非运行时 UI）。
 */

/** 基础文档索引条目 */
export interface DocIndexEntry {
  /** 文档文件名，如 button.md */
  file: string;
  /** 不含扩展名的 id，如 button */
  id: string;
}

/** 支持的框架适配器 */
export type SupportedAdapter = 'vue' | 'react' | 'angular';

/** 组件分类 */
export type ComponentCategory =
  | 'basic'           // 基础组件
  | 'form'            // 表单组件
  | 'data'            // 数据展示
  | 'feedback'        // 反馈组件
  | 'navigation'      // 导航组件
  | 'business'        // 业务组件
  | 'guide'           // 指南文档
  | 'other';          // 其他

/** 组件复杂度 */
export type ComponentComplexity = 'simple' | 'medium' | 'complex';

/** 匹配类型 */
export type MatchType = 'id' | 'displayName' | 'keyword' | 'category' | 'prefix' | 'fuzzy';

/** 组件元数据 */
export interface ComponentMeta {
  /** 组件 ID（文件名不含扩展名） */
  id: string;
  /** 显示名称 */
  displayName: string;
  /** 分类 */
  category: ComponentCategory;
  /** 关键词（用于模糊匹配） */
  keywords: string[];
  /** 关联组件 */
  related: string[];
  /** 复杂度 */
  complexity: ComponentComplexity;
  /** 文档路径 */
  docPath: string;
  /** 是否有独立包 */
  hasStandalonePackage?: boolean;
  /** 包名（如果有独立包） */
  packageName?: string;
}

/** 分类名称映射 */
export interface CategoryInfo {
  id: ComponentCategory;
  name: string;
  description?: string;
}

/** 搜索结果 */
export interface SearchResult {
  component: ComponentMeta;
  /** 匹配分数（越高越相关） */
  score: number;
  /** 匹配来源 */
  matchedBy: MatchType[];
}

/** 搜索选项 */
export interface SearchOptions {
  /** 返回结果数量限制 */
  limit?: number;
  /** 是否启用模糊匹配 */
  fuzzy?: boolean;
  /** 最低匹配分数阈值 */
  threshold?: number;
}

/** 组件使用模式 */
export interface ComponentPattern {
  id: string;
  name: string;
  description: string;
  components: string[];
  codeExample?: string;
  useCases: string[];
}
