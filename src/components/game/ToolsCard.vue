<template>
  <div class="tools-card">
    <div class="tools-header">
      <WrenchScrewdriverIcon class="tools-icon" />
      <h2 class="tools-title">可用道具</h2>
    </div>
    <div class="tools-grid">
      <div 
        v-for="tool in tools" 
        :key="tool.id"
        class="tool-item"
        @click="$emit('tool-selected', tool)"
      >
        <component :is="tool.icon" class="tool-icon" />
        <span class="tool-name">{{ tool.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  WrenchScrewdriverIcon
} from '@heroicons/vue/24/outline'

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
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  margin-bottom: 16px;
}

.tools-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.tools-icon {
  width: 24px;
  height: 24px;
  color: #60a5fa;
}

.tools-title {
  font-size: 18px;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.tool-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 8px;
  border-radius: 12px;
  background: rgba(51, 65, 85, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.2);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tool-item:hover {
  background: rgba(71, 85, 105, 0.8);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.tool-icon {
  width: 28px;
  height: 28px;
  color: #60a5fa;
}

.tool-name {
  font-size: 12px;
  font-weight: 500;
  color: #cbd5e1;
  text-align: center;
}
</style>
