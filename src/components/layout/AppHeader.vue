<template>
  <a-layout-header class="app-header">
    <div class="header-content">
      <a-space class="location-info" :size="8">
        <EnvironmentOutlined class="location-icon" />
        <a-typography-text class="location-text">
          当前地点: {{ currentLocation }}
        </a-typography-text>
      </a-space>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { EnvironmentOutlined } from '@ant-design/icons-vue'

defineProps<{
  currentLocation: string
}>()
</script>

<style scoped>
.app-header {
  background: rgba(15, 23, 42, 0.95) !important;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
  padding: 16px 20px !important;
  height: auto !important;
  line-height: normal !important;
}

.header-content {
  width: 100%;
}

.location-info {
  display: flex;
  align-items: center;
}

.location-icon {
  color: #60a5fa;
  font-size: 18px;
}

.location-text {
  color: #cbd5e1 !important;
  font-size: 14px;
  font-weight: 500;
}
</style>
