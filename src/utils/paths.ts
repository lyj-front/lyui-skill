/** Skill 包根目录下的 API 文档目录名 */
export const DOCS_DIR_NAME = 'docs';

export function docRelativePath(markdownFile: string): string {
  return `${DOCS_DIR_NAME}/${markdownFile}`;
}
