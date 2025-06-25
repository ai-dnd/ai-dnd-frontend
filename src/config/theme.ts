// antd-theme.js

/**
 * Ant Design Vue 主题配置文件
 * 根据提供的UI设计稿定制
 */
const themeConfig = {
  // 全局算法和Token配置
  token: {
    // 主题色，提取自顶部的定位图标、世界图标和发送按钮
    // 这是一个柔和、略带灰度的蓝色，显得沉稳且不刺眼
    colorPrimary: '#5295E2',

    // --- 基础颜色体系 ---

    // 基础文字色，用于正文，使用深灰色而不是纯黑，可提升阅读舒适度
    colorText: '#303133',
    // 次要文字色，用于辅助性、提示性文字，如NPC对话
    colorTextSecondary: '#606266',
    // 禁用颜色
    colorTextDisabled: '#C0C4CC',
    
    // --- 背景色体系 ---
    
    // 整体布局背景色，对应设计稿中页面最底层的浅灰色
    colorBgLayout: '#F7F8FA',
    // 组件容器背景色，如卡片、弹窗、菜单等，对应设计稿中的白色卡片
    colorBgContainer: '#FFFFFF',
    // 浮层容器背景色，例如 Select 下拉菜单等
    colorBgElevated: '#FFFFFF',

    // --- 边框与圆角 ---
    
    // 基础边框色，用于输入框、按钮等元素的边框
    borderColor: '#E4E7ED',
    // 基础圆角，设计稿中卡片和按钮的圆角较大，显得更柔和
    borderRadius: 8, // 单位 px
  },

  // 针对特定组件的定制
  components: {
    // 卡片组件
    Card: {
      // 设计稿中的卡片有非常细微的阴影来营造立体感
      boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.05)',
      // 卡片内边距
      padding: 20, // 单位 px
    },
    // 按钮组件
    Button: {
      // 默认按钮（白色背景）的文字颜色，确保其与主题色一致
      colorText: '#303133',
      // 默认按钮的背景色，使其与页面背景色区分开
      defaultBg: '#FFFFFF',
      // 默认按钮的边框色
      defaultBorderColor: '#E4E7ED'
    },
    // 输入框组件
    Input: {
      // 对应设计稿中底部输入框的背景色
      colorBgContainer: '#F7F8FA',
    }
  },
};

export default themeConfig;