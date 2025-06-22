<template>
  <ConfigProvider :theme="darkTheme">
    <div id="app-container">
      <!-- 移动端布局 -->
      <div v-if="showMobileLayout" class="mobile-container">
        <AppHeader :current-location="gameStore.gameState.currentLocation" />
        
        <main class="main-content">
          <router-view />
        </main>

        <BottomNav 
          :active-tab="activeTab" 
          @tab-change="onTabChange"
        />
        
        <ChatInput @send-message="onSendMessage" />
      </div>
      
      <!-- 全屏布局（登录、注册页面） -->
      <div v-else class="fullscreen-container">
        <router-view />
      </div>
    </div>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import { darkTheme } from './config/theme'
import AppHeader from './components/layout/AppHeader.vue'
import BottomNav from './components/layout/BottomNav.vue'
import ChatInput from './components/ui/ChatInput.vue'
import { useGameStore } from './stores'

const route = useRoute()
const gameStore = useGameStore()

// UI状态
const activeTab = ref('story')
const showMobileLayout = ref(true)

// 检查是否显示移动端布局
const checkMobileLayout = () => {
  // 对于登录、注册页面，不显示移动端布局
  showMobileLayout.value = !['login', 'register'].includes(route.name as string)
}

// 事件处理
const onTabChange = (tabId: string) => {
  activeTab.value = tabId
  console.log('切换到标签:', tabId)
}

const onSendMessage = (message: string) => {
  console.log('发送消息:', message)
  // 这里可以添加消息发送的逻辑
}

// 监听路由变化
watch(() => route.name, () => {
  checkMobileLayout()
})

onMounted(() => {
  checkMobileLayout()
})
</script>

<style scoped>
#app-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
  padding: 20px;
}

.mobile-container {
  width: 375px;
  max-width: 100%;
  height: 667px;
  max-height: 100vh;
  background: #0f172a;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(148, 163, 184, 0.2);
  display: flex;
  flex-direction: column;
  position: relative;
}

.fullscreen-container {
  width: 100%;
  height: 100%;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.main-content::-webkit-scrollbar {
  display: none;
}

@media (max-width: 425px) {
  #app-container {
    padding: 0;
  }
  
  .mobile-container {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    max-height: none;
  }
}
</style>
