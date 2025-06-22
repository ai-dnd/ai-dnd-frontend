# AI D&D Frontend - 快速启动指南

## 🎯 项目介绍

这是一个现代化的 AI 驱动的龙与地下城（D&D）游戏前端应用，采用了最新的 Web 技术栈构建。

## 🚀 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:5173 查看应用

### 3. 构建生产版本
```bash
npm run build
```

## 📱 功能特性

### ✅ 已实现功能
- 🎨 现代化的移动端 UI 设计
- 🌙 暗色主题
- 👤 用户认证系统架构
- 🎮 游戏状态管理
- 🚀 响应式布局
- 📡 API 服务层封装
- 🛣️ 路由系统和守卫

### 🏗️ 项目架构亮点
- **Vue 3 Composition API** - 现代化的 Vue 开发方式
- **TypeScript** - 类型安全的开发体验
- **Pinia** - 轻量级状态管理
- **Ant Design Vue** - 企业级 UI 组件库
- **Vite** - 极速的构建工具

## 📂 核心目录说明

```
src/
├── api/          # API 接口层
├── stores/       # Pinia 状态管理
├── views/        # 页面组件
├── components/   # 可复用组件
├── types/        # TypeScript 类型定义
├── utils/        # 工具函数
└── router/       # 路由配置
```

## 🔧 开发环境配置

### 环境变量 (`.env`)
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_TITLE=AI D&D
VITE_DEV_MODE=true
```

## 🎮 页面路由

- `/` - 游戏主界面 (需要登录)
- `/login` - 用户登录
- `/register` - 用户注册  
- `/profile` - 用户资料 (需要登录)

## 💾 状态管理

### 认证状态 (`useAuthStore`)
- 用户登录/注册
- Token 管理
- 用户信息存储

### 游戏状态 (`useGameStore`)
- 场景描述
- 工具物品
- 游戏历史

## 🔄 下一步开发计划

### 立即可做的改进
1. **连接后端 API**
   - 替换模拟数据
   - 实现真实的用户认证
   - 连接游戏 AI 接口

2. **完善 UI 组件**
   - 添加加载状态
   - 优化错误处理
   - 增强用户交互

3. **添加新功能**
   - 实时聊天
   - 游戏存档
   - 音效支持

### 技术优化
- 添加单元测试
- 性能优化
- PWA 支持
- 国际化 (i18n)

## 🐛 常见问题

### Q: 如何修改 API 地址？
A: 编辑 `.env` 文件中的 `VITE_API_BASE_URL`

### Q: 如何添加新的页面？
A: 1. 在 `src/views/` 创建组件 2. 在 `src/router/index.ts` 添加路由

### Q: 如何添加新的状态管理？
A: 在 `src/stores/` 创建新的 Pinia store

## 📋 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查
npm run build

# 预览构建结果
npm run preview
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

---

🎉 **恭喜！** 你的 AI D&D 前端项目已经搭建完成，可以开始开发了！

<template>
  <ConfigProvider :theme="darkTheme">
    <!-- 你的应用内容 -->
  </ConfigProvider>
</template>
```

### 3. 常用图标

```vue
<script setup>
import {
  UserOutlined,
  SettingOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue'
</script>

<template>
  <UserOutlined />
  <SettingOutlined />
  <SearchOutlined />
</template>
```

## 自定义样式

### 覆盖Ant Design样式

```vue
<style scoped>
/* 使用 :deep() 覆盖组件内部样式 */
:deep(.ant-btn) {
  background: rgba(30, 41, 59, 0.8) !important;
  border-color: rgba(148, 163, 184, 0.3) !important;
}

:deep(.ant-input) {
  background: rgba(30, 41, 59, 0.8) !important;
  color: #e2e8f0 !important;
}
</style>
```

### 使用主题变量

```vue
<script setup>
import { gameThemeVars } from '@/config/theme'
</script>

<template>
  <div :style="{ 
    background: gameThemeVars.gradients.magic,
    color: gameThemeVars.colors.treasure 
  }">
    使用主题变量
  </div>
</template>
```

## 组件结构

```
src/
├── config/
│   └── theme.ts          # 主题配置
├── components/
│   ├── layout/
│   │   ├── AppHeader.vue # 应用头部
│   │   └── BottomNav.vue # 底部导航
│   ├── game/
│   │   ├── SceneCard.vue # 场景卡片
│   │   └── ToolsCard.vue # 工具卡片
│   └── ui/
│       └── ChatInput.vue # 聊天输入
└── main.ts              # 入口文件
```

## 开发建议

1. **组件命名**: 使用`a-`前缀的Ant Design组件
2. **图标导入**: 从`@ant-design/icons-vue`导入所需图标
3. **主题定制**: 修改`src/config/theme.ts`中的配置
4. **样式覆盖**: 使用`:deep()`伪类和`!important`
5. **响应式**: Ant Design组件内置响应式支持
