/**
 * Offline usage analyzer for lyui-skill.
 *
 * What it measures (best-effort, no Cursor internal telemetry needed):
 * - Skill "activation" proxy: messages containing any trigger term (from skill.json)
 * - Component usage proxy: ly-* tag mentions (e.g. ly-table, ly-button)
 * - Doc usage proxy: references to docs/*.md filenames
 *
 * Input:
 *   node scripts/analyze-usage.mjs --input "<jsonl_dir_or_file>" [--top 30]
 *
 * Output:
 *   Prints a JSON summary to stdout.
 */

import fs from 'node:fs';
import path from 'node:path';

function parseArgs(argv) {
  const args = { input: null, top: 30 };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--input') args.input = argv[++i];
    else if (a === '--top') args.top = Number(argv[++i] || 30);
  }
  if (!args.input) {
    console.error('Missing --input "<jsonl_dir_or_file>"');
    process.exit(2);
  }
  if (!Number.isFinite(args.top) || args.top <= 0) args.top = 30;
  return args;
}

function readTriggerTerms() {
  const skillJsonPath = path.resolve(process.cwd(), 'skill.json');
  const raw = fs.readFileSync(skillJsonPath, 'utf8');
  const json = JSON.parse(raw);
  const terms = json?.cursorSkill?.triggerTerms || [];
  return Array.from(new Set(terms)).filter(Boolean);
}

function* walkJsonlFiles(inputPath) {
  const p = path.resolve(process.cwd(), inputPath);
  const st = fs.statSync(p);
  if (st.isFile()) {
    yield p;
    return;
  }
  const entries = fs.readdirSync(p, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(p, e.name);
    if (e.isDirectory()) continue;
    if (e.isFile() && e.name.endsWith('.jsonl')) yield full;
  }
}

function safeJsonParse(line) {
  try {
    return JSON.parse(line);
  } catch {
    return null;
  }
}

function extractText(payload) {
  if (!payload) return '';
  // common shapes: { content: "..." } or OpenAI-ish { message: { content: "..." } }
  if (typeof payload.content === 'string') return payload.content;
  if (typeof payload.text === 'string') return payload.text;
  if (payload.message && typeof payload.message.content === 'string') return payload.message.content;
  return '';
}

function inc(map, key, n = 1) {
  map.set(key, (map.get(key) || 0) + n);
}

function topN(map, n) {
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([k, v]) => ({ key: k, count: v }));
}

const args = parseArgs(process.argv);
const triggerTerms = readTriggerTerms();

const counts = {
  files: 0,
  lines: 0,
  messagesWithAnyTriggerTerm: 0,
  triggerTermHits: new Map(),
  lyComponentMentions: new Map(),
  docsFileMentions: new Map(),
};

const termRegexes = triggerTerms.map((t) => ({
  term: t,
  re: new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
}));

// Heuristics:
const lyCompRe = /\bly-([a-z0-9-]+)\b/gi; // ly-table-page, ly-button...
const docsRe = /\bdocs\/([a-z0-9-]+\.md)\b/gi;

for (const file of walkJsonlFiles(args.input)) {
  counts.files++;
  const raw = fs.readFileSync(file, 'utf8');
  const lines = raw.split(/\r?\n/);

  for (const line of lines) {
    if (!line.trim()) continue;
    counts.lines++;
    const obj = safeJsonParse(line);
    const text = extractText(obj) || '';
    if (!text) continue;

    let hitAny = false;
    for (const { term, re } of termRegexes) {
      const m = text.match(re);
      if (m?.length) {
        hitAny = true;
        inc(counts.triggerTermHits, term, m.length);
      }
    }
    if (hitAny) counts.messagesWithAnyTriggerTerm++;

    for (const m of text.matchAll(lyCompRe)) {
      const full = `ly-${m[1]}`.toLowerCase();
      inc(counts.lyComponentMentions, full, 1);
    }
    for (const m of text.matchAll(docsRe)) {
      const doc = m[1].toLowerCase();
      inc(counts.docsFileMentions, doc, 1);
    }
  }
}

const summary = {
  input: args.input,
  triggerTerms,
  totals: {
    files: counts.files,
    jsonlLines: counts.lines,
    messagesWithAnyTriggerTerm: counts.messagesWithAnyTriggerTerm,
  },
  top: {
    triggerTermHits: topN(counts.triggerTermHits, args.top),
    lyComponentMentions: topN(counts.lyComponentMentions, args.top),
    docsFileMentions: topN(counts.docsFileMentions, args.top),
  },
};

process.stdout.write(JSON.stringify(summary, null, 2) + '\n');

