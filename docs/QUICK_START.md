# 快速开始指南

## 启动应用

```bash
cd "d:\document\development\ai-dnd-frontend"
npm run dev
```

应用将在 http://localhost:5173/ 启动

## Ant Design 组件使用示例

### 1. 基础组件

```vue
<template>
  <!-- 按钮 -->
  <a-button type="primary" @click="handleClick">
    <template #icon>
      <StarOutlined />
    </template>
    主要按钮
  </a-button>

  <!-- 输入框 -->
  <a-input 
    v-model:value="inputValue" 
    placeholder="请输入内容"
    @press-enter="handleEnter"
  />

  <!-- 卡片 -->
  <a-card title="卡片标题" :bordered="false">
    <p>卡片内容</p>
    <template #actions>
      <a-button>操作1</a-button>
      <a-button>操作2</a-button>
    </template>
  </a-card>
</template>
```

### 2. 使用主题配置

```vue
<script setup>
import { ConfigProvider } from 'ant-design-vue'
import { darkTheme } from '@/config/theme'
</script>

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
