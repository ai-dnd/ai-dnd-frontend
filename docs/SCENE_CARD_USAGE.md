# SceneCard 组件使用指南

## 概述

`SceneCard` 组件已经升级，现在支持通过外部传参来动态配置按钮的文案和图标。

## 属性定义

### Props

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| `description` | `string` | 是 | - | 场景描述文本 |
| `actions` | `SceneAction[]` | 否 | `[]` | 动作按钮配置数组 |

### SceneAction 类型定义

```typescript
export interface SceneAction {
  id: string              // 动作唯一标识
  text: string           // 按钮显示文本
  icon?: any             // 按钮图标组件（可选）
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text'  // 按钮类型（可选）
  ghost?: boolean        // 是否为幽灵按钮（可选，默认为 true）
}
```

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `action` | `action: string` | 用户点击按钮时触发，参数为按钮的 id |

## 使用示例

### 基础用法

```vue
<template>
  <SceneCard 
    description="你站在一个阴暗的地窖中..."
    :actions="sceneActions"
    @action="handleAction"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SceneCard from '@/components/game/SceneCard.vue'
import { SearchOutlined, ExportOutlined } from '@ant-design/icons-vue'
import type { SceneAction } from '@/types/game'

const sceneActions = ref<SceneAction[]>([
  {
    id: 'examine',
    text: '检查环境',
    icon: SearchOutlined
  },
  {
    id: 'leave',
    text: '离开',
    icon: ExportOutlined
  }
])

const handleAction = (actionId: string) => {
  console.log('用户选择:', actionId)
  // 处理对应的业务逻辑
}
</script>
```

### 高级用法 - 不同类型的按钮

```vue
<script setup lang="ts">
const battleActions = ref<SceneAction[]>([
  {
    id: 'attack',
    text: '攻击',
    icon: ThunderboltOutlined,
    type: 'primary'  // 主要按钮
  },
  {
    id: 'defend',
    text: '防御',
    icon: SafetyOutlined,
    type: 'default'  // 默认按钮
  },
  {
    id: 'flee',
    text: '逃跑',
    icon: ExportOutlined,
    type: 'dashed',  // 虚线按钮
    ghost: false     // 非幽灵按钮
  }
])
</script>
```

### 无图标按钮

```vue
<script setup lang="ts">
const simpleActions = ref<SceneAction[]>([
  {
    id: 'continue',
    text: '继续前进'
    // 没有 icon 属性，不会显示图标
  },
  {
    id: 'rest',
    text: '休息',
    type: 'text'  // 文本按钮
  }
])
</script>
```

## 迁移指南

### 从旧版本迁移

**旧版本（硬编码）:**
```vue
<SceneCard description="场景描述" @action="handleAction" />
```

**新版本（灵活配置）:**
```vue
<SceneCard 
  description="场景描述" 
  :actions="dynamicActions"
  @action="handleAction" 
/>
```

### 注意事项

1. `actions` 参数是可选的，如果不传递将不显示任何按钮
2. 图标需要从 `@ant-design/icons-vue` 导入，并作为组件传递
3. `ghost` 属性默认为 `true`，如需实心按钮请设置为 `false`
4. 事件回调参数从硬编码的动作名改为动态的 `action.id`

### 常用图标推荐

- `SearchOutlined` - 搜索/检查
- `ExportOutlined` - 离开/退出
- `ThunderboltOutlined` - 攻击/战斗
- `SafetyOutlined` - 防御/保护
- `MessageOutlined` - 对话/交流
- `ShoppingOutlined` - 交易/购买
- `GiftOutlined` - 赠送/给予
- `EyeOutlined` - 观察/查看
- `ToolOutlined` - 使用工具
- `HeartOutlined` - 治疗/恢复
