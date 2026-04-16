/**
 * LyUI 组件注册表 - 增强版
 * 包含组件分类、关键词、关联组件等元数据，用于智能检索
 */

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
  complexity: 'simple' | 'medium' | 'complex';
  /** 文档路径 */
  docPath: string;
  /** 是否有独立包 */
  hasStandalonePackage?: boolean;
  /** 包名（如果有独立包） */
  packageName?: string;
}

export type ComponentCategory =
  | 'basic'           // 基础组件
  | 'form'            // 表单组件
  | 'data'            // 数据展示
  | 'feedback'        // 反馈组件
  | 'navigation'      // 导航组件
  | 'business'        // 业务组件
  | 'guide'           // 指南文档
  | 'other';          // 其他

export const CATEGORY_NAMES: Record<ComponentCategory, string> = {
  basic: '基础组件',
  form: '表单组件',
  data: '数据展示',
  feedback: '反馈组件',
  navigation: '导航组件',
  business: '业务组件',
  guide: '指南文档',
  other: '其他',
};

/**
 * 组件元数据注册表
 * 按字母顺序排列，方便维护
 */
export const COMPONENT_REGISTRY: ComponentMeta[] = [
  // ==================== 基础组件 ====================
  {
    id: 'button',
    displayName: '按钮',
    category: 'basic',
    keywords: ['button', 'ly-button', 'btn', '按钮', '提交', '确认', '取消', '点击', '操作', 'click', 'submit', 'confirm'],
    related: ['button-group', 'dropdown', 'dialog', 'popconfirm'],
    complexity: 'simple',
    docPath: 'docs/button.md',
  },
  {
    id: 'border',
    displayName: '边框',
    category: 'basic',
    keywords: ['border', 'ly-border', '边框', '线', '分割线', 'divider'],
    related: ['divider'],
    complexity: 'simple',
    docPath: 'docs/border.md',
  },
  {
    id: 'card',
    displayName: '卡片',
    category: 'basic',
    keywords: ['card', 'ly-card', '卡片', '容器', '面板', 'panel', 'box'],
    related: ['container', 'layout'],
    complexity: 'simple',
    docPath: 'docs/card.md',
  },
  {
    id: 'color',
    displayName: '色彩',
    category: 'basic',
    keywords: ['color', 'ly-color', '色彩', '颜色', '主题', 'theme', '配色'],
    related: ['custom-theme', 'color-picker'],
    complexity: 'simple',
    docPath: 'docs/color.md',
  },
  {
    id: 'container',
    displayName: '布局容器',
    category: 'basic',
    keywords: ['container', 'ly-container', '布局', '容器', 'layout', 'wrapper'],
    related: ['layout', 'card'],
    complexity: 'simple',
    docPath: 'docs/container.md',
  },
  {
    id: 'divider',
    displayName: '分割线',
    category: 'basic',
    keywords: ['divider', 'ly-divider', '分割线', '分隔线', '横线', 'border', 'separator'],
    related: ['border'],
    complexity: 'simple',
    docPath: 'docs/divider.md',
  },
  {
    id: 'icon',
    displayName: '图标',
    category: 'basic',
    keywords: ['icon', 'ly-icon', '图标', 'iconfont', 'svg', 'symbol', 'font-awesome'],
    related: ['button', 'avatar'],
    complexity: 'simple',
    docPath: 'docs/icon.md',
  },
  {
    id: 'layout',
    displayName: '布局',
    category: 'basic',
    keywords: ['layout', 'ly-layout', '布局', '栅格', 'grid', 'row', 'col', 'column', 'flex'],
    related: ['container', 'space'],
    complexity: 'medium',
    docPath: 'docs/layout.md',
  },
  {
    id: 'link',
    displayName: '文字链接',
    category: 'basic',
    keywords: ['link', 'ly-link', '链接', '文字链接', '超链接', 'a', 'href', 'anchor'],
    related: ['button', 'breadcrumb'],
    complexity: 'simple',
    docPath: 'docs/link.md',
  },
  {
    id: 'space',
    displayName: '间距',
    category: 'basic',
    keywords: ['space', 'ly-space', '间距', '间隔', 'gap', 'margin', 'padding'],
    related: ['layout'],
    complexity: 'simple',
    docPath: 'docs/space.md',
  },
  {
    id: 'typography',
    displayName: '排版',
    category: 'basic',
    keywords: ['typography', 'ly-typography', '排版', '文字', '字体', '标题', 'paragraph', 'text'],
    related: [],
    complexity: 'simple',
    docPath: 'docs/typography.md',
  },

  // ==================== 表单组件 ====================
  {
    id: 'checkbox',
    displayName: '多选框',
    category: 'form',
    keywords: ['checkbox', 'ly-checkbox', '多选', '多选框', '勾选', 'check', '多选项', '复选框'],
    related: ['radio', 'switch', 'select', 'form'],
    complexity: 'simple',
    docPath: 'docs/checkbox.md',
  },
  {
    id: 'color-picker',
    displayName: '颜色选择器',
    category: 'form',
    keywords: ['color-picker', 'ly-color-picker', '颜色选择器', '取色器', 'color', '颜色'],
    related: ['form', 'color'],
    complexity: 'medium',
    docPath: 'docs/color-picker.md',
  },
  {
    id: 'date-picker',
    displayName: '日期选择器',
    category: 'form',
    keywords: ['date-picker', 'ly-date-picker', '日期选择器', '日期', 'date', 'calendar', '日历', 'datepicker'],
    related: ['datetime-picker', 'time-picker', 'form', 'calendar'],
    complexity: 'medium',
    docPath: 'docs/date-picker.md',
  },
  {
    id: 'datetime-picker',
    displayName: '日期时间选择器',
    category: 'form',
    keywords: ['datetime-picker', 'ly-datetime-picker', '日期时间选择器', '日期时间', 'datetime', '时间日期'],
    related: ['date-picker', 'time-picker', 'form'],
    complexity: 'medium',
    docPath: 'docs/datetime-picker.md',
  },
  {
    id: 'form',
    displayName: '表单',
    category: 'form',
    keywords: ['form', 'ly-form', '表单', '提交', '验证', '校验', 'validate', 'input', 'field'],
    related: ['input', 'select', 'checkbox', 'radio', 'switch', 'date-picker', 'table'],
    complexity: 'complex',
    docPath: 'docs/form.md',
  },
  {
    id: 'input',
    displayName: '输入框',
    category: 'form',
    keywords: ['input', 'ly-input', '输入框', '文本框', 'text', '输入', '表单', 'textarea'],
    related: ['input-number', 'form', 'select'],
    complexity: 'simple',
    docPath: 'docs/input.md',
  },
  {
    id: 'input-number',
    displayName: '数字输入框',
    category: 'form',
    keywords: ['input-number', 'ly-input-number', '数字输入框', '数字', 'number', '计数器', 'spinner'],
    related: ['input', 'form', 'slider'],
    complexity: 'simple',
    docPath: 'docs/input-number.md',
  },
  {
    id: 'radio',
    displayName: '单选框',
    category: 'form',
    keywords: ['radio', 'ly-radio', '单选', '单选框', 'radio-button', '选项', '选择'],
    related: ['checkbox', 'select', 'switch', 'form'],
    complexity: 'simple',
    docPath: 'docs/radio.md',
  },
  {
    id: 'rate',
    displayName: '评分',
    category: 'form',
    keywords: ['rate', 'ly-rate', '评分', '星级', '星星', 'star', 'rating'],
    related: ['form', 'slider'],
    complexity: 'simple',
    docPath: 'docs/rate.md',
  },
  {
    id: 'select',
    displayName: '选择器',
    category: 'form',
    keywords: ['select', 'ly-select', '选择器', '下拉', '下拉框', 'dropdown', 'option', '选择'],
    related: ['cascader', 'tree-select', 'form', 'radio', 'checkbox'],
    complexity: 'medium',
    docPath: 'docs/select.md',
  },
  {
    id: 'slider',
    displayName: '滑块',
    category: 'form',
    keywords: ['slider', 'ly-slider', '滑块', '滑动', 'range', '范围', '进度'],
    related: ['input-number', 'progress', 'form'],
    complexity: 'simple',
    docPath: 'docs/slider.md',
  },
  {
    id: 'switch',
    displayName: '开关',
    category: 'form',
    keywords: ['switch', 'ly-switch', '开关', '切换', 'toggle', 'on-off', '布尔'],
    related: ['checkbox', 'radio', 'form'],
    complexity: 'simple',
    docPath: 'docs/switch.md',
  },
  {
    id: 'time-picker',
    displayName: '时间选择器',
    category: 'form',
    keywords: ['time-picker', 'ly-time-picker', '时间选择器', '时间', 'time', '时钟'],
    related: ['date-picker', 'datetime-picker', 'form'],
    complexity: 'medium',
    docPath: 'docs/time-picker.md',
  },
  {
    id: 'time-select',
    displayName: '时间选择',
    category: 'form',
    keywords: ['time-select', 'ly-time-select', '时间选择', '固定时间', 'time'],
    related: ['time-picker', 'select'],
    complexity: 'simple',
    docPath: 'docs/time-select.md',
  },
  {
    id: 'transfer',
    displayName: '穿梭框',
    category: 'form',
    keywords: ['transfer', 'ly-transfer', '穿梭框', '转移', '移动', '左右选择', 'shuttle'],
    related: ['select', 'tree', 'table'],
    complexity: 'medium',
    docPath: 'docs/transfer.md',
  },
  {
    id: 'upload',
    displayName: '上传',
    category: 'form',
    keywords: ['upload', 'ly-upload', '上传', '文件上传', '图片上传', 'file', 'image', '附件'],
    related: ['form'],
    complexity: 'medium',
    docPath: 'docs/upload.md',
  },
  {
    id: 'cascader',
    displayName: '级联选择器',
    category: 'form',
    keywords: ['cascader', 'ly-cascader', '级联', '级联选择器', '多级选择', '省市区', '树形选择'],
    related: ['select', 'tree', 'form'],
    complexity: 'medium',
    docPath: 'docs/cascader.md',
  },

  // ==================== 数据展示 ====================
  {
    id: 'avatar',
    displayName: '头像',
    category: 'data',
    keywords: ['avatar', 'ly-avatar', '头像', '用户头像', '图片', 'photo', 'user'],
    related: ['image', 'badge'],
    complexity: 'simple',
    docPath: 'docs/avatar.md',
  },
  {
    id: 'badge',
    displayName: '徽标数',
    category: 'data',
    keywords: ['badge', 'ly-badge', '徽标', '红点', '角标', '标记', '未读', 'count', 'dot'],
    related: ['avatar', 'button', 'tabs'],
    complexity: 'simple',
    docPath: 'docs/badge.md',
  },
  {
    id: 'calendar',
    displayName: '日历',
    category: 'data',
    keywords: ['calendar', 'ly-calendar', '日历', '日期', 'date', '日程', '月份'],
    related: ['date-picker', 'date-table'],
    complexity: 'medium',
    docPath: 'docs/calendar.md',
  },
  {
    id: 'carousel',
    displayName: '走马灯',
    category: 'data',
    keywords: ['carousel', 'ly-carousel', '走马灯', '轮播', '轮播图', 'swiper', 'slider', 'banner'],
    related: ['image'],
    complexity: 'medium',
    docPath: 'docs/carousel.md',
  },
  {
    id: 'collapse',
    displayName: '折叠面板',
    category: 'data',
    keywords: ['collapse', 'ly-collapse', '折叠', '折叠面板', '手风琴', 'accordion', '展开', '收起'],
    related: ['card'],
    complexity: 'simple',
    docPath: 'docs/collapse.md',
  },
  {
    id: 'descriptions',
    displayName: '描述列表',
    category: 'data',
    keywords: ['descriptions', 'ly-descriptions', '描述列表', '详情', 'description', '信息展示'],
    related: ['table', 'form'],
    complexity: 'simple',
    docPath: 'docs/descriptions.md',
  },
  {
    id: 'empty',
    displayName: '空状态',
    category: 'data',
    keywords: ['empty', 'ly-empty', '空状态', '暂无数据', '空白', 'no-data', 'placeholder'],
    related: ['table', 'image'],
    complexity: 'simple',
    docPath: 'docs/empty.md',
  },
  {
    id: 'image',
    displayName: '图片',
    category: 'data',
    keywords: ['image', 'ly-image', '图片', 'img', '照片', '预览', 'preview', '大图'],
    related: ['avatar', 'carousel', 'upload'],
    complexity: 'simple',
    docPath: 'docs/image.md',
  },
  {
    id: 'infiniteScroll',
    displayName: '无限滚动',
    category: 'data',
    keywords: ['infiniteScroll', 'ly-infiniteScroll', '无限滚动', '滚动加载', 'load-more', '下拉加载', '虚拟滚动'],
    related: ['table', 'list'],
    complexity: 'medium',
    docPath: 'docs/infiniteScroll.md',
  },
  {
    id: 'pagination',
    displayName: '分页',
    category: 'data',
    keywords: ['pagination', 'ly-pagination', '分页', '页码', 'page', '翻页', 'table-page'],
    related: ['table', 'table-page'],
    complexity: 'simple',
    docPath: 'docs/pagination.md',
  },
  {
    id: 'progress',
    displayName: '进度条',
    category: 'data',
    keywords: ['progress', 'ly-progress', '进度条', '进度', 'progress-bar', 'loading', '百分比'],
    related: ['slider', 'loading'],
    complexity: 'simple',
    docPath: 'docs/progress.md',
  },
  {
    id: 'result',
    displayName: '结果',
    category: 'data',
    keywords: ['result', 'ly-result', '结果', '成功', '失败', '404', '403', '500', '状态页'],
    related: ['empty', 'message'],
    complexity: 'simple',
    docPath: 'docs/result.md',
  },
  {
    id: 'skeleton',
    displayName: '骨架屏',
    category: 'data',
    keywords: ['skeleton', 'ly-skeleton', '骨架屏', '加载占位', 'loading', 'placeholder', 'shimmer'],
    related: ['loading', 'empty'],
    complexity: 'simple',
    docPath: 'docs/skeleton.md',
  },
  {
    id: 'table',
    displayName: '表格',
    category: 'data',
    keywords: ['table', 'ly-table', '表格', '列表', 'list', 'grid', '数据表格', 'table-view', 'table-page'],
    related: ['table-page', 'table-config', 'table-view', 'pagination', 'form'],
    complexity: 'complex',
    docPath: 'docs/table.md',
  },
  {
    id: 'table-config',
    displayName: '配置表格',
    category: 'data',
    keywords: ['table-config', 'ly-table-config', '配置表格', '配置化表格', '动态表格', 'JSON表格'],
    related: ['table', 'table-page'],
    complexity: 'complex',
    docPath: 'docs/table-config.md',
  },
  {
    id: 'table-page',
    displayName: '分页表格',
    category: 'data',
    keywords: ['table-page', 'ly-table-page', '分页表格', '分页查询', '带分页的表格', '自动分页'],
    related: ['table', 'pagination', 'table-config'],
    complexity: 'complex',
    docPath: 'docs/table-page.md',
  },
  {
    id: 'table-page-virtual',
    displayName: '虚拟滚动分页表格',
    category: 'data',
    keywords: ['table-page-virtual', 'ly-table-page-virtual', '虚拟滚动', '大数据表格', '性能优化', 'virtual-scroll'],
    related: ['table-page', 'table', 'infiniteScroll'],
    complexity: 'complex',
    docPath: 'docs/table-page-virtual.md',
  },
  {
    id: 'table-view',
    displayName: '视图表格',
    category: 'data',
    keywords: ['table-view', 'ly-table-view', '视图表格', '只读表格', '展示表格'],
    related: ['table', 'descriptions'],
    complexity: 'medium',
    docPath: 'docs/table-view.md',
  },
  {
    id: 'tag',
    displayName: '标签',
    category: 'data',
    keywords: ['tag', 'ly-tag', '标签', '标记', 'label', 'badge', '分类'],
    related: ['badge'],
    complexity: 'simple',
    docPath: 'docs/tag.md',
  },
  {
    id: 'timeline',
    displayName: '时间线',
    category: 'data',
    keywords: ['timeline', 'ly-timeline', '时间线', '时间轴', '步骤', '历史', '流程'],
    related: ['steps'],
    complexity: 'simple',
    docPath: 'docs/timeline.md',
  },
  {
    id: 'tree',
    displayName: '树形控件',
    category: 'data',
    keywords: ['tree', 'ly-tree', '树', '树形控件', '树形选择', '层级', '目录', 'folder'],
    related: ['cascader', 'table', 'menu'],
    complexity: 'complex',
    docPath: 'docs/tree.md',
  },
  {
    id: 'statistic',
    displayName: '统计数值',
    category: 'data',
    keywords: ['statistic', 'ly-statistic', '统计', '数值', '数字', 'count', 'number', 'dashboard'],
    related: ['descriptions', 'card'],
    complexity: 'simple',
    docPath: 'docs/statistic.md',
  },

  // ==================== 反馈组件 ====================
  {
    id: 'alert',
    displayName: '警告',
    category: 'feedback',
    keywords: ['alert', 'ly-alert', '警告', '提示', '通知', 'warning', 'info', 'message'],
    related: ['message', 'notification'],
    complexity: 'simple',
    docPath: 'docs/alert.md',
  },
  {
    id: 'dialog',
    displayName: '对话框',
    category: 'feedback',
    keywords: ['dialog', 'ly-dialog', '对话框', '弹窗', '弹框', 'modal', 'popup', '窗口', '确认框'],
    related: ['message-box', 'drawer', 'popover', 'table'],
    complexity: 'medium',
    docPath: 'docs/dialog.md',
  },
  {
    id: 'drawer',
    displayName: '抽屉',
    category: 'feedback',
    keywords: ['drawer', 'ly-drawer', '抽屉', '侧滑', 'sidebar', 'panel', '滑出'],
    related: ['dialog', 'modal'],
    complexity: 'medium',
    docPath: 'docs/drawer.md',
  },
  {
    id: 'loading',
    displayName: '加载',
    category: 'feedback',
    keywords: ['loading', 'ly-loading', '加载', 'loading-bar', 'spinner', '转圈', '等待', 'v-loading'],
    related: ['skeleton', 'progress', 'button'],
    complexity: 'simple',
    docPath: 'docs/loading.md',
  },
  {
    id: 'message',
    displayName: '消息提示',
    category: 'feedback',
    keywords: ['message', 'ly-message', '消息', '提示', 'toast', '通知', '轻提示', 'message-box'],
    related: ['notification', 'alert', 'message-box'],
    complexity: 'simple',
    docPath: 'docs/message.md',
  },
  {
    id: 'message-box',
    displayName: '消息弹框',
    category: 'feedback',
    keywords: ['message-box', 'ly-message-box', '消息弹框', '确认框', 'alert', 'confirm', 'prompt', '对话框'],
    related: ['dialog', 'message', 'notification'],
    complexity: 'medium',
    docPath: 'docs/message-box.md',
  },
  {
    id: 'notification',
    displayName: '通知',
    category: 'feedback',
    keywords: ['notification', 'ly-notification', '通知', '通知框', 'notice', '提醒', '右下角通知'],
    related: ['message', 'alert'],
    complexity: 'simple',
    docPath: 'docs/notification.md',
  },
  {
    id: 'popconfirm',
    displayName: '气泡确认框',
    category: 'feedback',
    keywords: ['popconfirm', 'ly-popconfirm', '气泡确认', '确认气泡', '二次确认', 'popover', 'tooltip'],
    related: ['popover', 'tooltip', 'message-box'],
    complexity: 'simple',
    docPath: 'docs/popconfirm.md',
  },
  {
    id: 'popover',
    displayName: '气泡卡片',
    category: 'feedback',
    keywords: ['popover', 'ly-popover', '气泡卡片', '弹出层', '悬浮卡片', 'popup', 'dropdown'],
    related: ['tooltip', 'popconfirm', 'dropdown'],
    complexity: 'simple',
    docPath: 'docs/popover.md',
  },
  {
    id: 'tooltip',
    displayName: '文字提示',
    category: 'feedback',
    keywords: ['tooltip', 'ly-tooltip', '文字提示', '提示', '悬浮提示', 'title', 'hint'],
    related: ['popover', 'popconfirm'],
    complexity: 'simple',
    docPath: 'docs/tooltip.md',
  },

  // ==================== 导航组件 ====================
  {
    id: 'affix',
    displayName: '固钉',
    category: 'navigation',
    keywords: ['affix', 'ly-affix', '固钉', '固定', '吸顶', 'sticky', 'fixed'],
    related: ['backtop', 'anchor'],
    complexity: 'simple',
    docPath: 'docs/affix.md',
  },
  {
    id: 'backtop',
    displayName: '回到顶部',
    category: 'navigation',
    keywords: ['backtop', 'ly-backtop', '回到顶部', '返回顶部', 'scroll-to-top', '置顶'],
    related: ['affix', 'anchor'],
    complexity: 'simple',
    docPath: 'docs/backtop.md',
  },
  {
    id: 'breadcrumb',
    displayName: '面包屑',
    category: 'navigation',
    keywords: ['breadcrumb', 'ly-breadcrumb', '面包屑', '导航', '路径', 'path', '导航栏'],
    related: ['menu', 'tabs', 'page-header'],
    complexity: 'simple',
    docPath: 'docs/breadcrumb.md',
  },
  {
    id: 'dropdown',
    displayName: '下拉菜单',
    category: 'navigation',
    keywords: ['dropdown', 'ly-dropdown', '下拉菜单', '下拉', '菜单', 'menu', 'select'],
    related: ['select', 'menu', 'popover'],
    complexity: 'medium',
    docPath: 'docs/dropdown.md',
  },
  {
    id: 'menu',
    displayName: '导航菜单',
    category: 'navigation',
    keywords: ['menu', 'ly-menu', '菜单', '导航', '导航菜单', 'sidebar', 'nav', '侧边栏'],
    related: ['tabs', 'breadcrumb', 'dropdown'],
    complexity: 'medium',
    docPath: 'docs/menu.md',
  },
  {
    id: 'page-header',
    displayName: '页头',
    category: 'navigation',
    keywords: ['page-header', 'ly-page-header', '页头', '页面标题', 'header', 'title', '返回'],
    related: ['breadcrumb', 'tabs'],
    complexity: 'simple',
    docPath: 'docs/page-header.md',
  },
  {
    id: 'steps',
    displayName: '步骤条',
    category: 'navigation',
    keywords: ['steps', 'ly-steps', '步骤条', '步骤', '流程', 'step', 'wizard', 'progress'],
    related: ['timeline', 'form'],
    complexity: 'medium',
    docPath: 'docs/steps.md',
  },
  {
    id: 'tabs',
    displayName: '标签页',
    category: 'navigation',
    keywords: ['tabs', 'ly-tabs', '标签页', '标签', 'tab', '选项卡', '切换'],
    related: ['menu', 'card', 'breadcrumb'],
    complexity: 'medium',
    docPath: 'docs/tabs.md',
  },
  {
    id: 'anchor',
    displayName: '锚点',
    category: 'navigation',
    keywords: ['anchor', 'ly-anchor', '锚点', '目录', '快速导航', 'scroll-spy'],
    related: ['affix', 'backtop'],
    complexity: 'simple',
    docPath: 'docs/anchor.md',
  },

  // ==================== 业务组件 ====================
  {
    id: 'ad-dialog',
    displayName: '广告弹窗',
    category: 'business',
    keywords: ['ad-dialog', 'ly-ad-dialog', '广告弹窗', '广告', '弹窗', 'dialog', 'modal'],
    related: ['dialog'],
    complexity: 'medium',
    docPath: 'docs/ad-dialog-doc.md',
    hasStandalonePackage: true,
    packageName: 'ad-dialog',
  },
  {
    id: 'emp-search',
    displayName: '员工搜索',
    category: 'business',
    keywords: ['emp-search', 'ly-emp-search', '员工搜索', '人员搜索', '员工选择', 'user-search'],
    related: ['select', 'table'],
    complexity: 'medium',
    docPath: 'docs/emp-search.md',
  },
  {
    id: 'lbg-upload',
    displayName: '大文件上传',
    category: 'business',
    keywords: ['lbg-upload', 'ly-lbg-upload', '大文件上传', '分片上传', '断点续传', 'big-file'],
    related: ['upload'],
    complexity: 'complex',
    docPath: 'docs/lbg-upload.md',
  },
  {
    id: 'lyj-datepicker',
    displayName: '日期选择器(业务)',
    category: 'business',
    keywords: ['lyj-datepicker', 'ly-lyj-datepicker', '日期选择', '业务日期', 'datepicker'],
    related: ['date-picker'],
    complexity: 'medium',
    docPath: 'docs/lyj-datepicker.md',
  },
  {
    id: 'lyj-oa',
    displayName: 'OA组件',
    category: 'business',
    keywords: ['lyj-oa', 'ly-lyj-oa', 'OA', '审批', '流程'],
    related: [],
    complexity: 'complex',
    docPath: 'docs/lyj-oa.md',
  },
  {
    id: 'lyj-public-sdk',
    displayName: '公共SDK',
    category: 'business',
    keywords: ['lyj-public-sdk', 'ly-lyj-public-sdk', 'SDK', '公共组件', '工具'],
    related: [],
    complexity: 'medium',
    docPath: 'docs/lyj-public-sdk.md',
  },
  {
    id: 'lyj-refresh',
    displayName: '刷新组件',
    category: 'business',
    keywords: ['lyj-refresh', 'ly-lyj-refresh', '刷新', '下拉刷新', 'pull-refresh'],
    related: [],
    complexity: 'simple',
    docPath: 'docs/lyj-refresh.md',
  },
  {
    id: 'lyj-xlsx',
    displayName: 'Excel处理',
    category: 'business',
    keywords: ['lyj-xlsx', 'ly-lyj-xlsx', 'excel', 'xlsx', '导入', '导出', '表格导出'],
    related: ['table', 'upload'],
    complexity: 'medium',
    docPath: 'docs/lyj-xlsx.md',
  },
  {
    id: 'mini-nav',
    displayName: '迷你导航',
    category: 'business',
    keywords: ['mini-nav', 'ly-mini-nav', '迷你导航', '快捷导航', '悬浮导航'],
    related: ['menu', 'anchor'],
    complexity: 'simple',
    docPath: 'docs/mini-nav.md',
  },
  {
    id: 'params-editor',
    displayName: '参数编辑器',
    category: 'business',
    keywords: ['params-editor', 'ly-params-editor', '参数编辑', 'JSON编辑', 'key-value'],
    related: ['form', 'input'],
    complexity: 'medium',
    docPath: 'docs/params-editor.md',
  },
  {
    id: 'pdf-img-convert',
    displayName: 'PDF图片转换',
    category: 'business',
    keywords: ['pdf-img-convert', 'ly-pdf-img-convert', 'PDF', '图片', '转换', '预览'],
    related: ['pdf-img-preview'],
    complexity: 'medium',
    docPath: 'docs/pdf-img-convert.md',
  },
  {
    id: 'pdf-img-preview',
    displayName: 'PDF图片预览',
    category: 'business',
    keywords: ['pdf-img-preview', 'ly-pdf-img-preview', 'PDF预览', '图片预览', '预览'],
    related: ['pdf-img-convert', 'image'],
    complexity: 'medium',
    docPath: 'docs/pdf-img-preview.md',
  },
  {
    id: 'rich-text',
    displayName: '富文本编辑器',
    category: 'business',
    keywords: ['rich-text', 'ly-rich-text', '富文本', '编辑器', 'editor', 'wysiwyg', 'markdown'],
    related: ['input', 'form'],
    complexity: 'complex',
    docPath: 'docs/rich-text.md',
  },
  {
    id: 'select-user-grouping',
    displayName: '用户分组选择',
    category: 'business',
    keywords: ['select-user-grouping', 'ly-select-user-grouping', '用户分组', '人员选择', '组织架构'],
    related: ['select', 'tree', 'emp-search'],
    complexity: 'medium',
    docPath: 'docs/select-user-grouping.md',
  },
  {
    id: 'set-poster',
    displayName: '设置海报',
    category: 'business',
    keywords: ['set-poster', 'ly-set-poster', '海报', '设置', '图片编辑'],
    related: ['image', 'upload'],
    complexity: 'medium',
    docPath: 'docs/set-poster.md',
  },
  {
    id: 'viewer-pc',
    displayName: 'PC图片查看器',
    category: 'business',
    keywords: ['viewer-pc', 'ly-viewer-pc', '图片查看器', '预览', 'gallery', 'lightbox'],
    related: ['image'],
    complexity: 'medium',
    docPath: 'docs/viewer-pc.md',
  },
  {
    id: 'wx-canvas-img',
    displayName: '微信canvas图片',
    category: 'business',
    keywords: ['wx-canvas-img', 'ly-wx-canvas-img', '微信', 'canvas', '图片生成', '分享图'],
    related: ['image'],
    complexity: 'complex',
    docPath: 'docs/wx-canvas-img.md',
  },
  {
    id: 'calculator',
    displayName: '计算器',
    category: 'business',
    keywords: ['calculator', 'ly-calculator', '计算器', '计算', 'calc'],
    related: ['input-number'],
    complexity: 'simple',
    docPath: 'docs/calculator.md',
  },
  {
    id: 'control',
    displayName: '控制器',
    category: 'business',
    keywords: ['control', 'ly-control', '控制器', '控制面板', '设置'],
    related: ['form'],
    complexity: 'medium',
    docPath: 'docs/control.md',
  },
  {
    id: 'evaluate',
    displayName: '评价组件',
    category: 'business',
    keywords: ['evaluate', 'ly-evaluate', '评价', '评分', '评论', 'rate'],
    related: ['rate'],
    complexity: 'medium',
    docPath: 'docs/evaluate.md',
  },
  {
    id: 'lazy-img-plugin',
    displayName: '图片懒加载插件',
    category: 'business',
    keywords: ['lazy-img-plugin', 'ly-lazy-img-plugin', '懒加载', '图片懒加载', 'lazy-load', '性能优化'],
    related: ['image', 'infiniteScroll'],
    complexity: 'medium',
    docPath: 'docs/lazy-img-plugin.md',
  },
  {
    id: 'scrollbar',
    displayName: '滚动条',
    category: 'business',
    keywords: ['scrollbar', 'ly-scrollbar', '滚动条', '自定义滚动条', '滚动'],
    related: [],
    complexity: 'simple',
    docPath: 'docs/scrollbar.md',
  },
  {
    id: 'andor',
    displayName: '与或组件',
    category: 'business',
    keywords: ['andor', 'ly-andor', '与或', '逻辑', '条件', 'query-builder'],
    related: ['form', 'select'],
    complexity: 'complex',
    docPath: 'docs/andor.md',
  },

  // ==================== 指南文档 ====================
  {
    id: 'installation',
    displayName: '安装',
    category: 'guide',
    keywords: ['installation', 'ly-installation', '安装', 'install', 'npm', 'yarn', '快速开始', 'getting-started'],
    related: ['quickstart'],
    complexity: 'simple',
    docPath: 'docs/installation.md',
  },
  {
    id: 'quickstart',
    displayName: '快速开始',
    category: 'guide',
    keywords: ['quickstart', 'ly-quickstart', '快速开始', '入门', 'hello-world', '开始使用'],
    related: ['installation', 'custom-theme'],
    complexity: 'simple',
    docPath: 'docs/quickstart.md',
  },
  {
    id: 'custom-theme',
    displayName: '自定义主题',
    category: 'guide',
    keywords: ['custom-theme', 'ly-custom-theme', '主题', '自定义', '样式', 'scss', 'css变量', 'theme'],
    related: ['color', 'quickstart'],
    complexity: 'medium',
    docPath: 'docs/custom-theme.md',
  },
  {
    id: 'design',
    displayName: '设计原则',
    category: 'guide',
    keywords: ['design', 'ly-design', '设计', '原则', '规范', 'design-system'],
    related: [],
    complexity: 'simple',
    docPath: 'docs/design.md',
  },
  {
    id: 'beCareful',
    displayName: '注意事项',
    category: 'guide',
    keywords: ['beCareful', 'ly-beCareful', '注意事项', '注意', '警告', 'caveats', '陷阱'],
    related: [],
    complexity: 'simple',
    docPath: 'docs/beCareful.md',
  },
  {
    id: 'deploy',
    displayName: '部署',
    category: 'guide',
    keywords: ['deploy', 'ly-deploy', '部署', '发布', 'production', 'build'],
    related: [],
    complexity: 'medium',
    docPath: 'docs/deploy.md',
  },
  {
    id: 'framework',
    displayName: '框架说明',
    category: 'guide',
    keywords: ['framework', 'ly-framework', '框架', 'vue', 'react', 'angular'],
    related: [],
    complexity: 'simple',
    docPath: 'docs/framework.md',
  },
  {
    id: 'jsError',
    displayName: 'JS错误处理',
    category: 'guide',
    keywords: ['jsError', 'ly-jsError', '错误', 'error', '异常', 'bug', '调试'],
    related: [],
    complexity: 'medium',
    docPath: 'docs/jsError.md',
  },
  {
    id: 'nuxt',
    displayName: 'Nuxt集成',
    category: 'guide',
    keywords: ['nuxt', 'ly-nuxt', 'nuxt.js', 'ssr', '服务端渲染', 'nuxt3'],
    related: ['installation', 'quickstart'],
    complexity: 'medium',
    docPath: 'docs/nuxt.md',
  },
  {
    id: 'zjCli',
    displayName: '脚手架',
    category: 'guide',
    keywords: ['zjCli', 'ly-zjCli', '脚手架', 'cli', '命令行', '工具'],
    related: [],
    complexity: 'simple',
    docPath: 'docs/zjCli.md',
  },
  {
    id: 'transition',
    displayName: '过渡动画',
    category: 'guide',
    keywords: ['transition', 'ly-transition', '过渡', '动画', 'animation', 'fade', 'collapse'],
    related: [],
    complexity: 'medium',
    docPath: 'docs/transition.md',
  },
];

/**
 * 组件 ID 到元数据的映射
 */
export const COMPONENT_MAP: Map<string, ComponentMeta> = new Map(
  COMPONENT_REGISTRY.map(c => [c.id, c])
);

/**
 * 按分类分组的组件
 */
export const COMPONENTS_BY_CATEGORY: Record<ComponentCategory, ComponentMeta[]> = {
  basic: COMPONENT_REGISTRY.filter(c => c.category === 'basic'),
  form: COMPONENT_REGISTRY.filter(c => c.category === 'form'),
  data: COMPONENT_REGISTRY.filter(c => c.category === 'data'),
  feedback: COMPONENT_REGISTRY.filter(c => c.category === 'feedback'),
  navigation: COMPONENT_REGISTRY.filter(c => c.category === 'navigation'),
  business: COMPONENT_REGISTRY.filter(c => c.category === 'business'),
  guide: COMPONENT_REGISTRY.filter(c => c.category === 'guide'),
  other: COMPONENT_REGISTRY.filter(c => c.category === 'other'),
};

/**
 * 获取组件元数据
 */
export function getComponentMeta(id: string): ComponentMeta | undefined {
  return COMPONENT_MAP.get(id);
}

/**
 * 根据关键词搜索组件
 * 支持模糊匹配组件名、关键词、ID
 */
export function searchComponents(keyword: string): ComponentMeta[] {
  const lowerKeyword = keyword.toLowerCase();
  return COMPONENT_REGISTRY.filter(c =>
    c.id.toLowerCase().includes(lowerKeyword) ||
    c.displayName.toLowerCase().includes(lowerKeyword) ||
    c.keywords.some(k => k.toLowerCase().includes(lowerKeyword))
  );
}

/**
 * 获取相关组件
 */
export function getRelatedComponents(id: string): ComponentMeta[] {
  const meta = getComponentMeta(id);
  if (!meta) return [];
  return meta.related.map(rid => getComponentMeta(rid)).filter((c): c is ComponentMeta => !!c);
}

/**
 * 获取指定分类的所有组件
 */
export function getComponentsByCategory(category: ComponentCategory): ComponentMeta[] {
  return COMPONENTS_BY_CATEGORY[category] || [];
}

/**
 * 获取独立包组件列表
 */
export function getStandalonePackages(): ComponentMeta[] {
  return COMPONENT_REGISTRY.filter(c => c.hasStandalonePackage);
}
