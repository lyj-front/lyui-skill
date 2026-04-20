/**
 * 简单的调用日志记录模块
 * 用于追踪 AI 触发 Skill 的情况
 */

import { appendFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

export interface LogEntry {
  timestamp: string;
  function: string;
  query?: string;
  options?: unknown;
  results?: number;
  duration?: number;
  error?: string;
}

const LOG_DIR = process.env.LYUI_LOG_DIR || join(process.cwd(), 'logs');
const LOG_FILE = join(LOG_DIR, 'lyui-trigger.log');

// 确保日志目录存在
function ensureLogDir(): void {
  if (!existsSync(LOG_DIR)) {
    mkdirSync(LOG_DIR, { recursive: true });
  }
}

/**
 * 记录调用日志
 */
export function logTrigger(entry: Omit<LogEntry, 'timestamp'>): void {
  ensureLogDir();
  
  const logEntry: LogEntry = {
    timestamp: new Date().toISOString(),
    ...entry,
  };
  
  const logLine = JSON.stringify(logEntry) + '\n';
  
  try {
    appendFileSync(LOG_FILE, logLine, 'utf-8');
  } catch (error) {
    // 静默失败，不影响主功能
    console.error('[LyUI Logger] Failed to write log:', error);
  }
}

/**
 * 记录搜索调用
 */
export function logSearch(query: string, options: unknown, results: number, duration: number): void {
  logTrigger({
    function: 'searchComponents',
    query,
    options,
    results,
    duration,
  });
}

/**
 * 记录场景推荐
 */
export function logSuggest(useCase: string, results: number, duration: number): void {
  logTrigger({
    function: 'suggestComponents',
    query: useCase,
    results,
    duration,
  });
}

/**
 * 记录错误
 */
export function logError(functionName: string, error: Error, query?: string): void {
  logTrigger({
    function: functionName,
    query,
    error: error.message,
  });
}

/**
 * 获取日志文件路径
 */
export function getLogPath(): string {
  return LOG_FILE;
}
