<template>
  <a-card class="scene-card" :bordered="false">
    <template #title>
      <a-space :size="12" class="scene-header">
        <div class="scene-icon-wrapper">
          <MessageOutlined class="scene-icon" />
        </div>
        <h2 class="scene-title">
          {{ title }}
        </h2>
      </a-space>
    </template>

    <div class="scene-content">
      <a-typography-paragraph class="scene-description">
        <slot name="description">{{ description }}</slot>
      </a-typography-paragraph>
    </div>
    <a-divider v-if="actions && actions.length > 0" />
    <div class="scene-actions">
      <a-button
        v-for="(action, index) in actions"
        :key="action.id"
        :type="action.type || 'default'"
        :ghost="action.ghost !== false"
        class="action-btn"
        @click="handleAction(action.text, index)"
      >
        <template #icon v-if="action.icon">
          <component :is="action.icon" />
        </template>
        {{ action.text }}
      </a-button>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { MessageOutlined } from "@ant-design/icons-vue";
import type { SceneAction } from "../../types/game";

defineProps<{
  description: string;
  actions?: SceneAction[];
  title: string;
}>();

const emit = defineEmits<{
  actionButtonPressed: [action: string, index: number];
}>();

const handleAction = (action: string, index: number) => {
  console.log("执行动作:", action);
  emit("actionButtonPressed", action, index);
};
</script>

<style scoped>
.scene-card {
  color: #2c3e50;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1),
    0px 2px 4px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  /* margin-bottom: 16px; */
}

.scene-actions {
  color: #2c3e50;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.scene-header {
  display: flex;
  align-items: center;
}

.scene-icon-wrapper {
  background-color: #4a5568;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.scene-icon {
  color: #ffffff;
  font-size: 16px;
}

.scene-title {
  color: #2c3e50;
  margin-bottom: 0;
  font-weight: 600;
}

.scene-content {
  margin-bottom: 0;
}

.scene-description {
  color: #475569;
  line-height: 1.6 !important;
  font-size: 14px !important;
  margin-bottom: 0 !important;
}

.action-btn {
  flex: 1;
  border-radius: 8px;
  font-weight: 500;
  height: 40px;
}

.action-btn.ant-btn-default {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  color: #334155;
}

.action-btn.ant-btn-primary {
  background-color: #334155;
  color: #ffffff;
  border: none;
}

.action-btn:hover {
  opacity: 0.9;
}
</style>
