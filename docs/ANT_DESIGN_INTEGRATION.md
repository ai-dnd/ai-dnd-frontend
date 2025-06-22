# Ant Design Vue 集成指南

## 概述

已成功将Ant Design Vue组件库集成到AI DND前端项目中，并配置了适合DND游戏风格的暗黑主题。

## 安装的依赖

- `ant-design-vue`: Ant Design Vue组件库
- `@ant-design/icons-vue`: Ant Design图标库

## 主要配置

### 1. 主题配置 (`src/config/theme.ts`)

- 配置了适合DND游戏风格的暗黑主题
- 使用深蓝色系作为主色调
- 定制了背景色、文字色、边框色等
- 提供了游戏专用的颜色变量和渐变色

### 2. 全局配置 (`src/main.ts`)

- 引入Ant Design Vue组件库
- 引入重置样式
- 全局注册组件

### 3. 组件更新

#### App.vue
- 使用`ConfigProvider`包裹整个应用，应用暗黑主题
- 替换Heroicons为Ant Design图标
- 更新图标导入

#### AppHeader.vue
- 使用`a-layout-header`替换原生header
- 使用`a-space`和`a-typography-text`组件
- 使用`EnvironmentOutlined`图标

#### BottomNav.vue
- 使用`a-segmented`组件替换自定义导航按钮
- 支持更好的交互体验
- 保持原有的外观风格

#### SceneCard.vue
- 使用`a-card`组件
- 使用`a-typography`系列组件
- 使用`a-button`替换原生按钮
- 添加了场景动作事件处理

#### ToolsCard.vue
- 使用`a-card`组件包装
- 使用`a-button`替换工具项
- 保持了网格布局和交互效果

#### ChatInput.vue
- 使用`a-input`替换原生input
- 使用`a-button`替换发送按钮
- 支持Enter键发送消息

## 主题特色

### 颜色体系
- **主色调**: `#3b82f6` (蓝色)
- **成功色**: `#10b981` (绿色)
- **警告色**: `#f59e0b` (黄色)
- **错误色**: `#ef4444` (红色)

### 游戏专用颜色
- **魔法紫**: `#8b5cf6`
- **危险红**: `#dc2626`
- **宝藏金**: `#fbbf24`
- **自然绿**: `#059669`

### 背景色系
- **容器背景**: `#1e293b`
- **提升背景**: `#334155`
- **布局背景**: `#0f172a`

## 样式覆盖

使用了`:deep()`伪类来覆盖Ant Design的默认样式，确保组件符合游戏主题：

- 背景色使用半透明效果
- 边框使用微妙的灰色调
- 悬停效果使用蓝色高亮
- 保持了毛玻璃效果（backdrop-filter）

## 使用建议

1. **保持主题一致性**: 所有新组件都应该使用配置的主题变量
2. **图标使用**: 优先使用`@ant-design/icons-vue`中的图标
3. **样式覆盖**: 使用`:deep()`来覆盖Ant Design默认样式
4. **响应式设计**: Ant Design组件已内置响应式支持

## 可扩展性

主题配置文件(`theme.ts`)支持进一步定制：

- 添加更多游戏相关的组件主题
- 定制更多颜色变量
- 添加动画配置
- 支持明暗主题切换

## 开发服务器

项目已成功启动，可在 http://localhost:5173/ 查看效果。
