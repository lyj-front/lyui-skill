/**
 * 错误处理模块
 * 提供统一的错误类型和处理工具
 */

/** 基础错误类 */
export class LyUIError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'LyUIError';
  }
}

/** 搜索错误 */
export class SearchError extends LyUIError {
  constructor(message: string) {
    super(message, 'SEARCH_ERROR');
    this.name = 'SearchError';
  }
}

/** 文档解析错误 */
export class DocParseError extends LyUIError {
  constructor(message: string, public file?: string) {
    super(message, 'DOC_PARSE_ERROR');
    this.name = 'DocParseError';
  }
}

/** 组件未找到错误 */
export class ComponentNotFoundError extends LyUIError {
  constructor(public componentId: string) {
    super(`Component "${componentId}" not found`, 'COMPONENT_NOT_FOUND');
    this.name = 'ComponentNotFoundError';
  }
}

/** 验证错误 */
export class ValidationError extends LyUIError {
  constructor(message: string, public field?: string) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

/**
 * 安全执行函数包装器
 * @param fn 要执行的函数
 * @param errorHandler 错误处理函数
 * @returns 执行结果或默认值
 */
export function safeExecute<T>(
  fn: () => T,
  errorHandler?: (error: Error) => void
): T | undefined {
  try {
    return fn();
  } catch (error) {
    if (errorHandler && error instanceof Error) {
      errorHandler(error);
    }
    return undefined;
  }
}

/**
 * 异步安全执行函数包装器
 * @param fn 要执行的异步函数
 * @param errorHandler 错误处理函数
 * @returns 执行结果或默认值
 */
export async function safeExecuteAsync<T>(
  fn: () => Promise<T>,
  errorHandler?: (error: Error) => void
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (error) {
    if (errorHandler && error instanceof Error) {
      errorHandler(error);
    }
    return undefined;
  }
}

/**
 * 验证组件ID
 * @param id 组件ID
 * @throws ValidationError 验证失败时抛出
 */
export function validateComponentId(id: string): void {
  if (!id || typeof id !== 'string') {
    throw new ValidationError('Component ID must be a non-empty string', 'id');
  }
  
  if (!/^[a-z0-9-]+$/i.test(id)) {
    throw new ValidationError(
      'Component ID must contain only letters, numbers, and hyphens',
      'id'
    );
  }
}

/**
 * 验证搜索查询
 * @param query 搜索查询
 * @throws ValidationError 验证失败时抛出
 */
export function validateSearchQuery(query: string): void {
  if (typeof query !== 'string') {
    throw new ValidationError('Search query must be a string', 'query');
  }
  
  if (query.length > 100) {
    throw new ValidationError(
      'Search query must not exceed 100 characters',
      'query'
    );
  }
}

/**
 * 验证选项对象
 * @param options 选项对象
 * @throws ValidationError 验证失败时抛出
 */
export function validateSearchOptions(options: Record<string, unknown>): void {
  if (options.limit !== undefined) {
    const limit = Number(options.limit);
    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      throw new ValidationError(
        'Option "limit" must be an integer between 1 and 100',
        'limit'
      );
    }
  }
  
  if (options.threshold !== undefined) {
    const threshold = Number(options.threshold);
    if (typeof threshold !== 'number' || threshold < 0 || threshold > 1) {
      throw new ValidationError(
        'Option "threshold" must be a number between 0 and 1',
        'threshold'
      );
    }
  }
}
