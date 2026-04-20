/**
 * 搜索索引模块 - 提供高效的组件搜索能力
 * 使用倒排索引(inverted index)优化搜索性能
 */

import type { ComponentMeta, MatchType, SearchOptions, SearchResult } from './types.js';
import { getPinyin } from './pinyin.js';

/** 倒排索引结构 */
interface InvertedIndex {
  /** 关键词 -> 组件ID集合 */
  keywordToIds: Map<string, Set<string>>;
  /** 组件ID -> 关键词集合 */
  idToKeywords: Map<string, Set<string>>;
}

/** 搜索索引类 */
export class SearchIndex {
  private index: InvertedIndex;
  private components: Map<string, ComponentMeta>;
  private ngramSize: number;

  constructor(components: ComponentMeta[], ngramSize: number = 2) {
    this.components = new Map(components.map(c => [c.id, c]));
    this.ngramSize = ngramSize;
    this.index = this.buildIndex(components);
  }

  /**
   * 构建倒排索引
   */
  private buildIndex(components: ComponentMeta[]): InvertedIndex {
    const keywordToIds = new Map<string, Set<string>>();
    const idToKeywords = new Map<string, Set<string>>();

    for (const comp of components) {
      const keywords = this.extractKeywords(comp);
      idToKeywords.set(comp.id, keywords);

      for (const keyword of keywords) {
        const ids = keywordToIds.get(keyword) || new Set<string>();
        ids.add(comp.id);
        keywordToIds.set(keyword, ids);
      }
    }

    return { keywordToIds, idToKeywords };
  }

  /**
   * 从组件元数据中提取所有关键词
   * 包括：ID、显示名、关键词列表的 n-gram 分解、拼音
   */
  private extractKeywords(comp: ComponentMeta): Set<string> {
    const keywords = new Set<string>();

    // 添加ID的各种形式
    keywords.add(comp.id.toLowerCase());
    keywords.add(comp.id.toLowerCase().replace(/-/g, ''));

    // 添加显示名
    keywords.add(comp.displayName.toLowerCase());
    
    // 添加显示名的拼音
    const displayNamePinyin = getPinyin(comp.displayName);
    if (displayNamePinyin !== comp.displayName.toLowerCase()) {
      keywords.add(displayNamePinyin);
    }

    // 添加原始关键词
    for (const kw of comp.keywords) {
      const lowerKw = kw.toLowerCase();
      keywords.add(lowerKw);

      // 添加 n-gram
      if (lowerKw.length >= this.ngramSize) {
        for (let i = 0; i <= lowerKw.length - this.ngramSize; i++) {
          keywords.add(lowerKw.slice(i, i + this.ngramSize));
        }
      }
      
      // 添加关键词的拼音
      const kwPinyin = getPinyin(kw);
      if (kwPinyin !== lowerKw) {
        keywords.add(kwPinyin);
      }
    }

    // 添加分类名
    keywords.add(comp.category.toLowerCase());

    return keywords;
  }

  /**
   * 搜索组件
   * 使用倒排索引快速定位候选集，再进行精确评分
   */
  search(query: string, options: SearchOptions = {}): SearchResult[] {
    const { limit = 10, fuzzy = true, threshold = 0.1 } = options;
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery) return [];

    // 快速路径：精确ID匹配
    const exactMatch = this.components.get(lowerQuery);
    if (exactMatch) {
      return [{ component: exactMatch, score: 1, matchedBy: ['id'] }];
    }

    // 使用倒排索引获取候选集
    const candidates = this.getCandidates(lowerQuery, fuzzy);

    // 计算每个候选的匹配分数
    const results: SearchResult[] = [];
    for (const [id, matchInfo] of candidates) {
      const comp = this.components.get(id);
      if (!comp) continue;

      const score = this.calculateScore(comp, lowerQuery, matchInfo);
      if (score >= threshold) {
        results.push({
          component: comp,
          score,
          matchedBy: Array.from(matchInfo.matchedBy),
        });
      }
    }

    // 按分数降序排序并限制结果数
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  /**
   * 获取搜索候选集
   */
  private getCandidates(query: string, fuzzy: boolean): Map<string, CandidateMatchInfo> {
    const candidates = new Map<string, CandidateMatchInfo>();

    // 1. 精确关键词匹配
    const exactIds = this.index.keywordToIds.get(query);
    if (exactIds) {
      for (const id of exactIds) {
        this.addCandidate(candidates, id, 'keyword', 1);
      }
    }

    // 2. 拼音匹配
    const pinyinIds = this.index.keywordToIds.get(getPinyin(query));
    if (pinyinIds) {
      for (const id of pinyinIds) {
        this.addCandidate(candidates, id, 'keyword', 0.9);
      }
    }

    // 3. n-gram 匹配（用于模糊搜索）
    if (fuzzy && query.length >= this.ngramSize) {
      const queryNgrams = this.getNgrams(query);
      const ngramScores = new Map<string, number>();

      for (const ngram of queryNgrams) {
        const ids = this.index.keywordToIds.get(ngram);
        if (ids) {
          for (const id of ids) {
            ngramScores.set(id, (ngramScores.get(id) || 0) + 1);
          }
        }
      }

      // 根据 n-gram 匹配度添加候选
      for (const [id, matchCount] of ngramScores) {
        const similarity = matchCount / queryNgrams.length;
        if (similarity > 0.3) { // 至少30%的n-gram匹配
          this.addCandidate(candidates, id, 'fuzzy', similarity);
        }
      }
    }

    // 4. 前缀匹配
    for (const [keyword, ids] of this.index.keywordToIds) {
      if (keyword.startsWith(query) || query.startsWith(keyword)) {
        for (const id of ids) {
          this.addCandidate(candidates, id, 'prefix', 0.8);
        }
      }
    }

    // 5. 拼音前缀匹配
    const queryPinyin = getPinyin(query);
    if (queryPinyin !== query) {
      for (const [keyword, ids] of this.index.keywordToIds) {
        if (keyword.startsWith(queryPinyin) || queryPinyin.startsWith(keyword)) {
          for (const id of ids) {
            this.addCandidate(candidates, id, 'prefix', 0.7);
          }
        }
      }
    }

    return candidates;
  }

  /**
   * 获取字符串的 n-gram 集合
   */
  private getNgrams(str: string): string[] {
    const ngrams: string[] = [];
    for (let i = 0; i <= str.length - this.ngramSize; i++) {
      ngrams.push(str.slice(i, i + this.ngramSize));
    }
    return ngrams;
  }

  /**
   * 添加候选
   */
  private addCandidate(
    candidates: Map<string, CandidateMatchInfo>,
    id: string,
    matchType: MatchType,
    score: number
  ): void {
    const existing = candidates.get(id);
    if (existing) {
      existing.matchedBy.add(matchType);
      existing.score = Math.max(existing.score, score);
    } else {
      candidates.set(id, {
        matchedBy: new Set([matchType]),
        score,
      });
    }
  }

  /**
   * 计算组件与查询的匹配分数
   */
  private calculateScore(
    comp: ComponentMeta,
    query: string,
    matchInfo: CandidateMatchInfo
  ): number {
    let score = 0;

    // ID 完全匹配（最高分）
    if (comp.id === query) {
      score += 1.0;
    } else if (comp.id.toLowerCase() === query) {
      score += 0.95;
    } else if (comp.id.toLowerCase().includes(query)) {
      score += 0.7;
    }

    // 显示名匹配
    const displayNameLower = comp.displayName.toLowerCase();
    if (displayNameLower === query) {
      score += 0.9;
    } else if (displayNameLower.includes(query)) {
      score += 0.6;
    }

    // 关键词匹配
    const keywordMatches = comp.keywords.filter(k =>
      k.toLowerCase().includes(query)
    ).length;
    score += Math.min(keywordMatches * 0.15, 0.45);

    // 基于候选匹配类型的基础分数
    if (matchInfo.matchedBy.has('keyword')) {
      score += 0.3;
    }
    if (matchInfo.matchedBy.has('prefix')) {
      score += 0.2;
    }
    if (matchInfo.matchedBy.has('fuzzy')) {
      score += matchInfo.score * 0.15;
    }

    // 复杂度加权（简单组件优先）
    const complexityWeight = {
      simple: 1.0,
      medium: 0.95,
      complex: 0.9,
    }[comp.complexity];
    score *= complexityWeight;

    return Math.min(score, 1.0);
  }

  /**
   * 获取所有组件（用于遍历）
   */
  getAllComponents(): ComponentMeta[] {
    return Array.from(this.components.values());
  }

  /**
   * 根据ID获取组件
   */
  getComponent(id: string): ComponentMeta | undefined {
    return this.components.get(id);
  }
}

/** 候选匹配信息 */
interface CandidateMatchInfo {
  matchedBy: Set<MatchType>;
  score: number;
}

/** 使用场景模式 */
interface UseCasePattern {
  keywords: string[];
  components: string[];
  weight: number;
}

/** 预定义的使用场景模式 */
const USE_CASE_PATTERNS: UseCasePattern[] = [
  {
    keywords: ['表单', '输入', '提交', '验证', 'form', 'input', 'submit', 'validate'],
    components: ['form', 'input', 'select', 'checkbox', 'radio', 'switch', 'button'],
    weight: 1.0,
  },
  {
    keywords: ['表格', '列表', '数据展示', '分页', 'table', 'list', 'data', 'page'],
    components: ['table', 'table-page', 'pagination', 'list', 'infiniteScroll'],
    weight: 1.0,
  },
  {
    keywords: ['弹窗', '对话框', '提示', '确认', 'dialog', 'modal', 'popup', 'confirm'],
    components: ['dialog', 'message-box', 'message', 'notification', 'drawer'],
    weight: 1.0,
  },
  {
    keywords: ['导航', '菜单', '路由', 'nav', 'menu', 'route'],
    components: ['menu', 'tabs', 'breadcrumb', 'dropdown', 'page-header'],
    weight: 1.0,
  },
  {
    keywords: ['加载', '等待', '进度', 'loading', 'wait', 'progress'],
    components: ['loading', 'skeleton', 'progress'],
    weight: 1.0,
  },
  {
    keywords: ['选择', '下拉', '级联', 'select', 'dropdown', 'cascade'],
    components: ['select', 'cascader', 'tree', 'radio', 'checkbox', 'tree-select'],
    weight: 1.0,
  },
  {
    keywords: ['时间', '日期', '日历', 'time', 'date', 'calendar'],
    components: ['date-picker', 'time-picker', 'calendar', 'datetime-picker'],
    weight: 1.0,
  },
  {
    keywords: ['上传', '文件', '图片', 'upload', 'file', 'image'],
    components: ['upload', 'image', 'lbg-upload'],
    weight: 1.0,
  },
  {
    keywords: ['搜索', '查询', '过滤', 'search', 'query', 'filter'],
    components: ['input', 'select', 'emp-search', 'table', 'andor'],
    weight: 1.0,
  },
  {
    keywords: ['树', '层级', '目录', 'tree', 'hierarchy', 'folder'],
    components: ['tree', 'cascader', 'menu'],
    weight: 1.0,
  },
];

/**
 * 根据使用场景推荐组件
 */
export function suggestComponentsByUseCase(
  useCase: string,
  index: SearchIndex,
  limit: number = 5
): Array<{ component: ComponentMeta; relevance: number }> {
  const useCaseLower = useCase.toLowerCase();
  const scores = new Map<string, number>();

  for (const pattern of USE_CASE_PATTERNS) {
    let matchCount = 0;
    for (const keyword of pattern.keywords) {
      if (useCaseLower.includes(keyword.toLowerCase())) {
        matchCount++;
      }
    }

    if (matchCount > 0) {
      const relevance = (matchCount / pattern.keywords.length) * pattern.weight;
      for (const compId of pattern.components) {
        scores.set(compId, (scores.get(compId) || 0) + relevance);
      }
    }
  }

  // 如果没有匹配到模式，使用搜索索引
  if (scores.size === 0) {
    const searchResults = index.search(useCase, { limit: limit * 2, fuzzy: true });
    for (const result of searchResults) {
      scores.set(result.component.id, result.score);
    }
  }

  // 排序并返回
  return Array.from(scores.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id, relevance]) => {
      const comp = index.getComponent(id);
      return comp ? { component: comp, relevance } : null;
    })
    .filter((item): item is { component: ComponentMeta; relevance: number } => item !== null);
}

export type { SearchOptions, SearchResult };
