<template>
  <div class="schedule-view">
    <div class="header">
      <h1>预约</h1>
    </div>
    
    <div class="content">
      <p>预约页面 - 开发中</p>
    </div>

    <BottomNav 
      :active-tab="'schedule'"
      @tab-change="handleTabChange"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import BottomNav from '../components/layout/BottomNav.vue'

const router = useRouter()

const handleTabChange = (tabId: string) => {
  const routeMap: Record<string, string> = {
    'home': '/',
    'discover': '/discover',
    'schedule': '/schedule',
    'profile': '/profile'
  }
  
  if (routeMap[tabId]) {
    router.push(routeMap[tabId])
  }
}
</script>

<style scoped>
.schedule-view {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 80px;
}

.header {
  padding: 20px;
  background: white;
  text-align: center;
  border-bottom: 1px solid #e8e8e8;
}

.content {
  padding: 20px;
}
</style>
