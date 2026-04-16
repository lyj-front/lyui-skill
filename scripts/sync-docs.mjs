/**
 * 从 monorepo 的 website/docs/zh-CN 同步 Markdown 到 lyui-skill/docs，
 * 并生成 src/core/doc-manifest.ts（文档清单）。
 * 独立克隆 lyui-skill 仓库时若缺少上游路径，仅跳过复制，仍可根据已有 docs 生成 manifest。
 */
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  writeFileSync,
} from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL_ROOT = join(__dirname, '..');
const DEST_DOCS = join(SKILL_ROOT, 'docs');
const MONOREPO_ZH = join(SKILL_ROOT, '..', 'website', 'docs', 'zh-CN');
const MANIFEST_OUT = join(SKILL_ROOT, 'src', 'core', 'doc-manifest.ts');

function main() {
  mkdirSync(DEST_DOCS, { recursive: true });

  if (existsSync(MONOREPO_ZH)) {
    const names = readdirSync(MONOREPO_ZH).filter((f) => f.endsWith('.md'));
    for (const name of names) {
      copyFileSync(join(MONOREPO_ZH, name), join(DEST_DOCS, name));
    }
    console.log(`sync-docs: copied ${names.length} files from website/docs/zh-CN`);
  } else {
    console.warn(
      'sync-docs: website/docs/zh-CN not found — skip copy (use existing docs/)',
    );
  }

  const files = readdirSync(DEST_DOCS)
    .filter((f) => f.endsWith('.md'))
    .sort((a, b) => a.localeCompare(b));

  const lines = files.map((f) => `  '${f}',`);
  const body = `/**
 * 自动由 scripts/sync-docs.mjs 生成，请勿手改。
 * 运行: npm run sync-docs
 */
export const DOC_FILES: readonly string[] = [
${lines.join('\n')}
] as const;

export type DocFile = (typeof DOC_FILES)[number];
`;

  mkdirSync(dirname(MANIFEST_OUT), { recursive: true });
  writeFileSync(MANIFEST_OUT, body, 'utf8');
  console.log(`sync-docs: wrote ${files.length} entries to src/core/doc-manifest.ts`);
}

main();
