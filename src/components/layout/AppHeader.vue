<template>
  <header class="app-header">
    <div class="header-content">
      <div class="location-info">
        <MapPinIcon class="location-icon" />
        <span>当前地点: {{ currentLocation }}</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { MapPinIcon } from '@heroicons/vue/24/outline'

defineProps<{
  currentLocation: string
}>()
</script>

<style scoped>
.app-header {
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
  padding: 16px 20px;
  flex-shrink: 0;
}

.header-content {
  width: 100%;
}

.location-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #cbd5e1;
  font-size: 14px;
  font-weight: 500;
}

.location-icon {
  width: 20px;
  height: 20px;
  color: #60a5fa;
}
</style>
