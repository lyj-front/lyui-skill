#!/usr/bin/env node
/**
 * 查看 LyUI Skill 触发日志
 * 
 * 使用: node scripts/view-logs.mjs [options]
 * 
 * Options:
 *   --today     查看今天的日志
 *   --tail n    查看最后 n 条
 *   --json      以 JSON 格式输出
 *   --stats     显示统计信息
 */

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const LOG_FILE = join(process.cwd(), 'logs', 'lyui-trigger.log');

function parseArgs() {
  const args = { today: false, tail: 0, json: false, stats: false };
  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg === '--today') args.today = true;
    else if (arg === '--tail') args.tail = parseInt(process.argv[++i]) || 10;
    else if (arg === '--json') args.json = true;
    else if (arg === '--stats') args.stats = true;
  }
  return args;
}

function loadLogs() {
  if (!existsSync(LOG_FILE)) {
    console.log('暂无日志文件');
    return [];
  }
  
  const content = readFileSync(LOG_FILE, 'utf-8');
  return content
    .trim()
    .split('\n')
    .filter(line => line.trim())
    .map(line => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

function formatLog(log) {
  const time = new Date(log.timestamp).toLocaleTimeString('zh-CN');
  const func = log.function.padEnd(20);
  const query = log.query ? `「${log.query}」` : '';
  const results = log.results !== undefined ? `→ ${log.results} 个结果` : '';
  const duration = log.duration ? `(${log.duration.toFixed(2)}ms)` : '';
  
  return `[${time}] ${func} ${query} ${results} ${duration}`.trim();
}

function showStats(logs) {
  const total = logs.length;
  const searches = logs.filter(l => l.function === 'searchComponents').length;
  const suggests = logs.filter(l => l.function === 'suggestComponents').length;
  const errors = logs.filter(l => l.error).length;
  
  // 按小时统计
  const hourly = {};
  logs.forEach(log => {
    const hour = new Date(log.timestamp).toISOString().slice(0, 13);
    hourly[hour] = (hourly[hour] || 0) + 1;
  });
  
  console.log('\n========== 统计信息 ==========');
  console.log(`总调用次数: ${total}`);
  console.log(`搜索调用: ${searches}`);
  console.log(`推荐调用: ${suggests}`);
  console.log(`错误次数: ${errors}`);
  console.log('\n按小时分布:');
  Object.entries(hourly)
    .sort()
    .slice(-10)
    .forEach(([hour, count]) => {
      console.log(`  ${hour}:00 - ${count} 次`);
    });
  console.log('==============================\n');
}

function main() {
  const args = parseArgs();
  let logs = loadLogs();
  
  if (logs.length === 0) return;
  
  // 过滤今天的日志
  if (args.today) {
    const today = new Date().toISOString().slice(0, 10);
    logs = logs.filter(log => log.timestamp.startsWith(today));
  }
  
  // 取最后 n 条
  if (args.tail > 0) {
    logs = logs.slice(-args.tail);
  }
  
  // 显示统计
  if (args.stats) {
    showStats(logs);
    return;
  }
  
  // 输出日志
  console.log(`\n========== LyUI Skill 触发日志 (${logs.length} 条) ==========\n`);
  
  logs.forEach(log => {
    if (args.json) {
      console.log(JSON.stringify(log));
    } else {
      console.log(formatLog(log));
    }
  });
  
  console.log('\n==============================================\n');
}

main();
