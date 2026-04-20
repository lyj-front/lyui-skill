/**
 * LRU 缓存模块
 * 用于缓存搜索结果，提升重复查询性能
 */

/** LRU 缓存节点 */
interface CacheNode<K, V> {
  key: K;
  value: V;
  prev: CacheNode<K, V> | null;
  next: CacheNode<K, V> | null;
}

/**
 * LRU (Least Recently Used) 缓存
 * 当缓存满时，淘汰最近最少使用的项
 */
export class LRUCache<K, V> {
  private cache: Map<K, CacheNode<K, V>>;
  private head: CacheNode<K, V>;
  private tail: CacheNode<K, V>;
  private maxSize: number;
  private currentSize: number;

  /**
   * 创建 LRU 缓存
   * @param maxSize 最大缓存大小
   */
  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
    this.currentSize = 0;
    this.cache = new Map();
    
    // 初始化头尾节点（哨兵节点）
    this.head = { key: null as unknown as K, value: null as unknown as V, prev: null, next: null };
    this.tail = { key: null as unknown as K, value: null as unknown as V, prev: null, next: null };
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /**
   * 获取缓存值
   * @param key 键
   * @returns 值，不存在时返回 undefined
   */
  get(key: K): V | undefined {
    const node = this.cache.get(key);
    if (!node) {
      return undefined;
    }

    // 移动到队尾（最近使用）
    this.moveToTail(node);
    return node.value;
  }

  /**
   * 设置缓存值
   * @param key 键
   * @param value 值
   */
  set(key: K, value: V): void {
    const node = this.cache.get(key);
    
    if (node) {
      // 更新已有节点
      node.value = value;
      this.moveToTail(node);
    } else {
      // 创建新节点
      const newNode: CacheNode<K, V> = {
        key,
        value,
        prev: null,
        next: null,
      };
      
      this.cache.set(key, newNode);
      this.addToTail(newNode);
      this.currentSize++;
      
      // 如果超出容量，淘汰队首节点
      if (this.currentSize > this.maxSize) {
        this.removeLRU();
      }
    }
  }

  /**
   * 检查键是否存在
   * @param key 键
   * @returns 是否存在
   */
  has(key: K): boolean {
    return this.cache.has(key);
  }

  /**
   * 删除缓存项
   * @param key 键
   * @returns 是否删除成功
   */
  delete(key: K): boolean {
    const node = this.cache.get(key);
    if (!node) {
      return false;
    }
    
    this.removeNode(node);
    this.cache.delete(key);
    this.currentSize--;
    return true;
  }

  /**
   * 清空缓存
   */
  clear(): void {
    this.cache.clear();
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.currentSize = 0;
  }

  /**
   * 获取当前缓存大小
   */
  get size(): number {
    return this.currentSize;
  }

  /**
   * 获取缓存命中率统计
   */
  getStats(): { size: number; maxSize: number; usage: number } {
    return {
      size: this.currentSize,
      maxSize: this.maxSize,
      usage: this.currentSize / this.maxSize,
    };
  }

  /**
   * 获取所有键（按最近使用顺序）
   */
  keys(): K[] {
    const keys: K[] = [];
    let current = this.head.next;
    while (current && current !== this.tail) {
      keys.push(current.key);
      current = current.next;
    }
    return keys;
  }

  /** 将节点移动到队尾 */
  private moveToTail(node: CacheNode<K, V>): void {
    this.removeNode(node);
    this.addToTail(node);
  }

  /** 从链表中移除节点 */
  private removeNode(node: CacheNode<K, V>): void {
    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }
  }

  /** 添加节点到队尾 */
  private addToTail(node: CacheNode<K, V>): void {
    node.prev = this.tail.prev;
    node.next = this.tail;
    if (this.tail.prev) {
      this.tail.prev.next = node;
    }
    this.tail.prev = node;
  }

  /** 淘汰最近最少使用的节点 */
  private removeLRU(): void {
    const lruNode = this.head.next;
    if (lruNode && lruNode !== this.tail) {
      this.removeNode(lruNode);
      this.cache.delete(lruNode.key);
      this.currentSize--;
    }
  }
}

/** 搜索缓存值 */
export interface SearchCacheValue {
  results: unknown[];
  timestamp: number;
}

/**
 * 创建搜索缓存
 * @param maxSize 最大缓存大小
 * @param ttl 缓存过期时间（毫秒）
 * @returns 缓存实例
 */
export function createSearchCache(
  maxSize: number = 50,
  _ttl: number = 5 * 60 * 1000 // 5分钟，预留参数
): LRUCache<string, SearchCacheValue> {
  return new LRUCache<string, SearchCacheValue>(maxSize);
}

/** 全局搜索缓存实例 */
let globalSearchCache: LRUCache<string, SearchCacheValue> | null = null;

/**
 * 获取全局搜索缓存
 */
export function getSearchCache(): LRUCache<string, SearchCacheValue> {
  if (!globalSearchCache) {
    globalSearchCache = createSearchCache();
  }
  return globalSearchCache;
}

/**
 * 重置全局搜索缓存
 */
export function resetSearchCache(): void {
  globalSearchCache = null;
}
