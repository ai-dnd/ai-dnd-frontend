<template>
  <a-card class="scene-card" :bordered="false">
    <template #title>
      <a-space :size="12" class="scene-header">
        <MessageOutlined class="scene-icon" />
        <a-typography-title :level="4" class="scene-title">
          场景描述
        </a-typography-title>
      </a-space>
    </template>
    
    <div class="scene-content">
      <a-typography-paragraph class="scene-description">
        {{ description }}
      </a-typography-paragraph>
    </div>
    
    <template #actions>
      <a-button 
        type="default" 
        ghost 
        class="action-btn"
        @click="handleAction('examine')"
      >
        <template #icon>
          <SearchOutlined />
        </template>
        检查环境
      </a-button>
      
      <a-button 
        type="default" 
        ghost 
        class="action-btn"
        @click="handleAction('leave')"
      >
        <template #icon>
          <ExportOutlined />
        </template>
        离开地窖
      </a-button>
    </template>
  </a-card>
</template>

<script setup lang="ts">
import { 
  MessageOutlined,
  SearchOutlined,
  ExportOutlined
} from '@ant-design/icons-vue'

defineProps<{
  description: string
}>()

const emit = defineEmits<{
  'action': [action: string]
}>()

const handleAction = (action: string) => {
  console.log('执行动作:', action)
  emit('action', action)
}
</script>

<style scoped>
.scene-card {
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

:deep(.ant-card-actions) {
  background: transparent !important;
  border-top: 1px solid rgba(148, 163, 184, 0.2) !important;
}

:deep(.ant-card-actions > li) {
  margin: 8px 0 !important;
}

.scene-header {
  display: flex;
  align-items: center;
}

.scene-icon {
  color: #60a5fa;
  font-size: 20px;
}

.scene-title {
  color: #f1f5f9 !important;
  margin: 0 !important;
  font-size: 18px !important;
  font-weight: 600 !important;
}

.scene-content {
  margin-bottom: 0;
}

.scene-description {
  color: #cbd5e1 !important;
  line-height: 1.6 !important;
  font-size: 14px !important;
  margin-bottom: 0 !important;
}

.action-btn {
  color: #e2e8f0 !important;
  background: rgba(71, 85, 105, 0.6) !important;
  border-color: rgba(148, 163, 184, 0.3) !important;
  font-size: 14px !important;
}

.action-btn:hover {
  background: rgba(100, 116, 139, 0.8) !important;
  color: #f8fafc !important;
  border-color: rgba(148, 163, 184, 0.5) !important;
}
</style>
