<template>
  <a-card class="tools-card" :bordered="false">
    <template #title>
      <a-space :size="12" class="tools-header">
        <ToolOutlined class="tools-icon" />
        <a-typography-title :level="4" class="tools-title">
          可用道具
        </a-typography-title>
      </a-space>
    </template>
    
    <div class="tools-grid">
      <a-button 
        v-for="tool in tools" 
        :key="tool.id"
        class="tool-item"
        @click="$emit('tool-selected', tool)"
        ghost
        size="large"
      >
        <template #icon>
          <component :is="tool.icon" class="tool-icon" />
        </template>
        <div class="tool-content">
          <span class="tool-name">{{ tool.name }}</span>
        </div>
      </a-button>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { 
  ToolOutlined
} from '@ant-design/icons-vue'

export interface Tool {
  id: string
  name: string
  icon: any
}

defineProps<{
  tools: Tool[]
}>()

defineEmits<{
  'tool-selected': [tool: Tool]
}>()
</script>

<style scoped>
.tools-card {
  background: rgba(30, 41, 59, 0.8) !important;
  backdrop-filter: blur(20px);
  border-radius: 16px !important;
  border: 1px solid rgba(148, 163, 184, 0.2) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
  margin-bottom: 16px;
}

:deep(.ant-card-head) {
  background: transparent !important;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2) !important;
  padding: 16px 20px !important;
}

:deep(.ant-card-body) {
  padding: 20px !important;
}

.tools-header {
  display: flex;
  align-items: center;
}

.tools-icon {
  color: #60a5fa;
  font-size: 20px;
}

.tools-title {
  color: #f1f5f9 !important;
  margin: 0 !important;
  font-size: 18px !important;
  font-weight: 600 !important;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.tool-item {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  gap: 8px !important;
  padding: 16px 8px !important;
  height: auto !important;
  border-radius: 12px !important;
  background: rgba(51, 65, 85, 0.6) !important;
  border: 1px solid rgba(148, 163, 184, 0.2) !important;
  color: #cbd5e1 !important;
  transition: all 0.2s ease !important;
}

.tool-item:hover {
  background: rgba(71, 85, 105, 0.8) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
  border-color: rgba(148, 163, 184, 0.4) !important;
  color: #f1f5f9 !important;
}

.tool-icon {
  font-size: 24px !important;
  color: #60a5fa !important;
}

.tool-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tool-name {
  font-size: 12px;
  font-weight: 500;
  color: inherit;
  text-align: center;
  margin-top: 4px;
}
</style>
