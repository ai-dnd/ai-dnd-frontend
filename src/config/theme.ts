import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'

// 暗黑主题配置，适配DND游戏风格
export const darkTheme: ThemeConfig = {
  token: {
    // 主色调 - 深蓝色系
    colorPrimary: '#3b82f6',
    colorInfo: '#3b82f6',
    colorSuccess: '#10b981',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',
    
    // 背景色
    colorBgContainer: '#1e293b',
    colorBgElevated: '#334155',
    colorBgLayout: '#0f172a',
    
    // 文字色
    colorText: '#f1f5f9',
    colorTextSecondary: '#cbd5e1',
    colorTextTertiary: '#94a3b8',
    colorTextQuaternary: '#64748b',
    
    // 边框色
    colorBorder: '#334155',
    colorBorderSecondary: '#475569',
    
    // 圆角
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 6,
    
    // 字体
    fontSize: 14,
    fontSizeLG: 16,
    fontSizeSM: 12,
    
    // 阴影 - 增强游戏氛围
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    boxShadowSecondary: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  components: {
    // Button 组件定制
    Button: {
      colorPrimary: '#3b82f6',
      algorithm: true,
      primaryShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
    },
    // Card 组件定制
    Card: {
      colorBgContainer: '#1e293b',
      colorBorderSecondary: '#334155',
    },
    // Input 组件定制
    Input: {
      colorBgContainer: '#334155',
      colorBorder: '#475569',
      activeBorderColor: '#3b82f6',
    },
    // Menu 组件定制
    Menu: {
      colorBgContainer: '#1e293b',
      colorItemBg: 'transparent',
      colorItemBgHover: '#334155',
      colorItemBgSelected: '#1e40af',
      colorItemText: '#f1f5f9',
      colorItemTextSelected: '#ffffff',
    },
  },
}

// 组件样式变量
export const gameThemeVars = {
  // 游戏专用颜色
  colors: {
    magic: '#8b5cf6',      // 魔法紫
    danger: '#dc2626',     // 危险红
    treasure: '#fbbf24',   // 宝藏金
    nature: '#059669',     // 自然绿
    shadow: '#374151',     // 阴影灰
  },
  
  // 渐变色
  gradients: {
    primary: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
    magic: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
    danger: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
  },
  
  // 动画时长
  animation: {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
  },
}
