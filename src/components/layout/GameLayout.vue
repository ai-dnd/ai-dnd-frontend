<template>
  <div class="game-layout">
    <!-- 头部栏 -->
    <div class="header-bar">
      <div class="location-info">
        <EnvironmentOutlined />
        <span>当前地点: {{ currentLocation }}</span>
      </div>
      <div class="world-info">
        <TeamOutlined />
        <span>世界 ({{ worldPlayerCount }})</span>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="content-wrapper">
      <slot />
    </div>

    <!-- 底部导航栏 -->
    <nav class="bottom-nav">
      <router-link to="/story" class="nav-item" :class="{ active: currentRoute === 'story' }">
        <div class="nav-icon story-icon"></div>
        <span class="nav-label">故事</span>
      </router-link>
      <router-link to="/world" class="nav-item" :class="{ active: currentRoute === 'world' }">
        <div class="nav-icon map-icon"></div>
        <span class="nav-label">地图</span>
      </router-link>
      <router-link to="/character" class="nav-item" :class="{ active: currentRoute === 'character' }">
        <div class="nav-icon character-icon"></div>
        <span class="nav-label">角色</span>
      </router-link>
      <router-link to="/world-chat" class="nav-item" :class="{ active: currentRoute === 'world-chat' }">
        <div class="nav-icon chat-icon"></div>
        <span class="nav-label">聊天</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { EnvironmentOutlined, TeamOutlined } from '@ant-design/icons-vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Props
interface Props {
  currentLocation?: string
  worldPlayerCount?: number
}

withDefaults(defineProps<Props>(), {
  currentLocation: '阴森的地窖',
  worldPlayerCount: 127
})

const route = useRoute()
const currentRoute = computed(() => route.name)
</script>

<style scoped>
.game-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background-color: #343a40;
  color: white;
  flex-shrink: 0;
}

.location-info,
.world-info {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 16px;
  background-color: #495057;
  font-size: 14px;
}

.location-info .anticon,
.world-info .anticon {
  margin-right: 8px;
  color: #ffc107;
}

.content-wrapper {
  flex: 1;
  overflow-y: auto;
  background-color: #f9fafb;
}

.bottom-nav {
  height: 64px;
  background: #334155;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 16px;
  flex-shrink: 0;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #94a3b8;
  font-size: 12px;
  flex: 1;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}

.nav-item .nav-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.story-icon {
  background-color: #fbbf24;
}

.map-icon {
  background-color: #60a5fa;
}

.character-icon {
  background-color: #10b981;
}

.chat-icon {
  background-color: #8b5cf6;
}

.nav-item.active .nav-label {
  color: #fbbf24;
  font-weight: 500;
}

.nav-item:not(.active) .nav-icon {
  opacity: 0.6;
}

.nav-item:hover .nav-label {
  color: #e2e8f0;
}
</style>
