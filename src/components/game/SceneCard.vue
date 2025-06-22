<template>
  <div class="scene-card">
    <div class="scene-header">
      <ChatBubbleLeftEllipsisIcon class="scene-icon" />
      <h2 class="scene-title">场景描述</h2>
    </div>
    <div class="scene-content">
      <p class="scene-description">{{ description }}</p>
    </div>
    <div class="scene-actions">
      <button class="btn-secondary action-btn">
        <MagnifyingGlassIcon class="btn-icon" />
        检查环境
      </button>
      <button class="btn-secondary action-btn">
        <BookOpenIcon class="btn-icon" />
        离开地窖
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  ChatBubbleLeftEllipsisIcon, 
  MagnifyingGlassIcon, 
  BookOpenIcon 
} from '@heroicons/vue/24/outline'

defineProps<{
  description: string
}>()
</script>

<style scoped>
.scene-card {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  margin-bottom: 16px;
}

.scene-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.scene-icon {
  width: 24px;
  height: 24px;
  color: #60a5fa;
}

.scene-title {
  font-size: 18px;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0;
}

.scene-content {
  margin-bottom: 20px;
}

.scene-description {
  color: #cbd5e1;
  line-height: 1.6;
  font-size: 14px;
  margin: 0;
}

.scene-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #e2e8f0;
  background: rgba(71, 85, 105, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  font-size: 14px;
  padding: 10px 16px;
}

.action-btn:hover {
  background: rgba(100, 116, 139, 0.8);
  color: #f8fafc;
}

.btn-icon {
  width: 16px;
  height: 16px;
}
</style>
