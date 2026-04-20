/**
 * 拼音支持模块 - 简版
 * 支持常用组件词汇的拼音搜索
 */

/** 常用组件词汇拼音映射 */
const PINYIN_DICT: Record<string, string> = {
  // 基础组件
  '按钮': 'anniu',
  '输入': 'shuru',
  '输入框': 'shurukuang',
  '选择': 'xuanze',
  '选择器': 'xuanzeqi',
  '下拉': 'xiala',
  '下拉框': 'xialakuang',
  '表单': 'biaodan',
  '表格': 'biaoge',
  '列表': 'liebiao',
  '树': 'shu',
  '树形': 'shuxing',
  '弹窗': 'tanchuang',
  '对话框': 'duihuakuang',
  '提示': 'tishi',
  '消息': 'xiaoxi',
  '通知': 'tongzhi',
  '警告': 'jinggao',
  '加载': 'jiazai',
  '进度': 'jindu',
  '分页': 'fenye',
  '导航': 'daohang',
  '菜单': 'caidan',
  '标签': 'biaoqian',
  '标签页': 'biaoqianye',
  '步骤': 'buzhou',
  '面包屑': 'mianbaoxie',
  '卡片': 'kapian',
  '布局': 'buju',
  '图标': 'tubiao',
  '链接': 'lianjie',
  '文字': 'wenzi',
  '字体': 'ziti',
  '颜色': 'yanse',
  '主题': 'zhuti',
  // 表单相关
  '多选': 'duoxuan',
  '多选框': 'duoxuankuang',
  '单选': 'danxuan',
  '单选框': 'danxuankuang',
  '开关': 'kaiguan',
  '滑块': 'huakuai',
  '评分': 'pingfen',
  '日期': 'riqi',
  '时间': 'shijian',
  '日历': 'rili',
  '上传': 'shangchuan',
  '文件': 'wenjian',
  '图片': 'tupian',
  '级联': 'jilian',
  '穿梭': 'chuansuo',
  '穿梭框': 'chuansuokuang',
  // 数据展示
  '头像': 'touxiang',
  '徽标': 'huibiao',
  '徽标数': 'huibiaoshu',
  '走马灯': 'zoumadeng',
  '轮播': 'lunbo',
  '折叠': 'zhedie',
  '折叠面板': 'zhediemianban',
  '描述': 'miaoshu',
  '描述列表': 'miaoshuliebiao',
  '空状态': 'kongzhuangtai',
  '暂无数据': 'zanwushuju',
  '骨架屏': 'gujiaping',
  '无限滚动': 'wuxiangundong',
  '虚拟滚动': 'xunigundong',
  '结果': 'jieguo',
  '成功': 'chenggong',
  '失败': 'shibai',
  '时间线': 'shijianxian',
  '时间轴': 'shijianzhou',
  '统计': 'tongji',
  '数值': 'shuzhi',
  // 反馈组件
  '气泡': 'qipao',
  '气泡确认': 'qipaoqueren',
  '气泡卡片': 'qipaokapian',
  '文字提示': 'wenzitishi',
  '抽屉': 'chouti',
  '抽屉弹窗': 'choutitanchuang',
  '侧滑': 'cehua',
  '消息提示': 'xiaoxitishi',
  '消息弹框': 'xiaoxidankuang',
  '确认框': 'querenkuang',
  '轻提示': 'qingtishi',
  '通知框': 'tongzhikuang',
  '提醒': 'tixing',
  // 导航组件
  '固钉': 'guding',
  '固定': 'guding',
  '吸顶': 'xiding',
  '回到顶部': 'huidaodingbu',
  '返回顶部': 'fanhuidingbu',
  '页头': 'yetou',
  '页面标题': 'yemianbiaoti',
  '锚点': 'maodian',
  '快速导航': 'kuaisudaohang',
  '目录': 'mulu',
  // 业务组件
  '员工搜索': 'yuangongsousuo',
  '人员搜索': 'renyuansousuo',
  '大文件': 'dawenjian',
  '分片上传': 'fenpianshangchuan',
  '断点续传': 'duandianxuchuan',
  '广告弹窗': 'guanggaotanchuang',
  '富文本': 'fuwenben',
  '编辑器': 'bianjiqi',
  'excel': 'excel',
  'xlsx': 'xlsx',
  'pdf': 'pdf',
  '预览': 'yulan',
  '懒加载': 'lanjiazai',
  '滚动条': 'gundongtiao',
  '计算器': 'jisuanqi',
  '评价': 'pingjia',
  '评分组件': 'pingfenfenzujian',
};

/**
 * 获取中文的拼音
 * @param text 中文文本
 * @returns 拼音字符串
 */
export function getPinyin(text: string): string {
  // 直接匹配完整词汇
  if (PINYIN_DICT[text]) {
    return PINYIN_DICT[text];
  }

  // 尝试匹配包含的词汇
  let result = text;
  for (const [cn, py] of Object.entries(PINYIN_DICT)) {
    if (text.includes(cn)) {
      result = result.replace(cn, py);
    }
  }

  // 如果没有匹配到，返回原文本的小写
  return result.toLowerCase();
}

/**
 * 检查拼音是否匹配
 * @param text 原文本
 * @param pinyinQuery 拼音查询
 * @returns 是否匹配
 */
export function matchPinyin(text: string, pinyinQuery: string): boolean {
  const textPinyin = getPinyin(text);
  const lowerQuery = pinyinQuery.toLowerCase();

  // 完全匹配
  if (textPinyin === lowerQuery) {
    return true;
  }

  // 包含匹配
  if (textPinyin.includes(lowerQuery)) {
    return true;
  }

  // 首字母匹配
  const firstLetters = textPinyin
    .split(' ')
    .map(word => word[0])
    .join('');
  if (firstLetters.includes(lowerQuery)) {
    return true;
  }

  return false;
}

/**
 * 生成文本的多种搜索形式
 * @param text 原文本
 * @returns 搜索形式数组
 */
export function generateSearchVariants(text: string): string[] {
  const variants = new Set<string>();

  // 原文本
  variants.add(text.toLowerCase());

  // 拼音
  const pinyin = getPinyin(text);
  variants.add(pinyin);

  // 首字母
  const firstLetters = pinyin
    .split(/[\s\-]/)
    .map(word => word[0])
    .join('');
  variants.add(firstLetters);

  return Array.from(variants);
}
