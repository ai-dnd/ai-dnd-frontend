<template>
  <div class="game-view">
    <div class="content-wrapper">
      <!-- 加载状态提示 -->
      <div v-if="gameStore.isLoading" class="loading-overlay">
        <a-spin size="large" />
        <p>AI 正在思考...</p>
      </div>
      
      <SceneCard 
        :description="gameStore.gameState.sceneDescription" 
        @action="onSceneAction"
        :actions="basicActions"
        title="场景描述"
      />
      
      <!-- 游戏历史记录 -->
      <a-card v-if="gameStore.gameHistory.length > 0" title="冒险日志" class="history-card">
        <div class="history-list">
          <div 
            v-for="(record, index) in gameStore.gameHistory.slice(-5)" 
            :key="index"
            class="history-item"
          >
            {{ record }}
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'
import { useGameStore } from '../stores'
import SceneCard from '../components/game/SceneCard.vue'
// import ToolsCard from '../components/game/ToolsCard.vue'
import type { SceneAction, Tool } from '../types'
import { ExportOutlined, SearchOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'

const gameStore = useGameStore()

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
  },{
    id: 'attack',
    text: '攻击',
    icon: ExportOutlined,
    type: 'primary'
  },{
    id: 'defend',
    text: '防御',
    icon: ExportOutlined,
    type: 'default'
  }
])


const onSceneAction = async (action: string) => {
  try {
    await gameStore.executeAction({
      id: Date.now().toString(),
      type: 'interact',
      description: action
    })
    message.success('动作执行成功！')
  } catch (error) {
    message.error('执行动作失败')
    console.error('执行动作失败:', error)
  }
}
</script>

<style scoped>
.game-view {
  flex: 1;
  overflow-y: auto;
  position: relative;
}

.content-wrapper {
  padding: 16px;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-overlay p {
  color: #fff;
  margin-top: 16px;
  font-size: 16px;
}

.history-card {
  margin-top: 16px;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.2);
}

:deep(.ant-card-head-title) {
  color: #f8fafc;
}

.history-list {
  max-height: 150px;
  overflow-y: auto;
}

.history-item {
  color: #94a3b8;
  font-size: 12px;
  padding: 4px 0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
}

.history-item:last-child {
  border-bottom: none;
}
</style>
