/**
 * Vue 3 适配说明：LyUI 主库（ly-ui）面向 Vue 3。
 * 具体 props / 事件 / 示例以 docs/*.md 为准。
 */
import { docRelativePath } from '../utils/paths.js';
export const LY_UI_PACKAGE = 'ly-ui';
export function vueDocPath(markdownFile) {
    return docRelativePath(markdownFile);
}
