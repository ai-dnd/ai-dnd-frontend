<template>
  <div class="scene-example">
    <h2>SceneCard 使用示例</h2>
    
    <!-- 基础示例 -->
    <SceneCard 
      description="你站在一个阴暗的地窖中，空气中弥漫着潮湿的味道。远处传来滴水声。"
      :actions="basicActions"
      @action="handleAction"
    />
    
    <!-- 战斗场景示例 -->
    <SceneCard 
      description="一只恶狼挡住了你的去路，龇牙咧嘴地盯着你。"
      :actions="battleActions"
      @action="handleAction"
    />
    
    <!-- 对话场景示例 -->
    <SceneCard 
      description="你遇到了一位神秘的商人，他似乎有些珍贵的物品要出售。"
      :actions="dialogActions"
      @action="handleAction"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SceneCard from '../components/game/SceneCard.vue'
import { 
  SearchOutlined, 
  ExportOutlined,
  ThunderboltOutlined,
  SafetyOutlined,
  MessageOutlined,
  ShoppingOutlined,
  GiftOutlined
} from '@ant-design/icons-vue'
import type { SceneAction } from '../types/game'

// 基础场景动作
const basicActions = ref<SceneAction[]>([
  {
    id: 'examine',
    text: '检查环境',
    icon: SearchOutlined
  },
  {
    id: 'leave',
    text: '离开地窖',
    icon: ExportOutlined
  }
])

// 战斗场景动作
const battleActions = ref<SceneAction[]>([
  {
    id: 'attack',
    text: '攻击',
    icon: ThunderboltOutlined,
    type: 'primary'
  },
  {
    id: 'defend',
    text: '防御',
    icon: SafetyOutlined
  },
  {
    id: 'flee',
    text: '逃跑',
    icon: ExportOutlined,
    type: 'dashed'
  }
])

// 对话场景动作
const dialogActions = ref<SceneAction[]>([
  {
    id: 'talk',
    text: '对话',
    icon: MessageOutlined,
    type: 'primary'
  },
  {
    id: 'trade',
    text: '交易',
    icon: ShoppingOutlined
  },
  {
    id: 'gift',
    text: '赠送礼物',
    icon: GiftOutlined,
    ghost: false
  },
  {
    id: 'leave',
    text: '离开',
    icon: ExportOutlined,
    type: 'text'
  }
])

const handleAction = (action: string) => {
  console.log('用户选择的动作:', action)
  // 这里可以添加具体的业务逻辑
}
</script>

<style scoped>
.scene-example {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.scene-example h2 {
  color: #f1f5f9;
  margin-bottom: 24px;
  text-align: center;
}
</style>
