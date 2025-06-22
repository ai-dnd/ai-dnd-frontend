<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from './components/layout/AppHeader.vue'
import BottomNav from './components/layout/BottomNav.vue'
import SceneCard from './components/game/SceneCard.vue'
import ToolsCard, { type Tool } from './components/game/ToolsCard.vue'
import ChatInput from './components/ui/ChatInput.vue'
import { 
  WrenchIcon,
  ShieldCheckIcon,
  SparklesIcon
} from '@heroicons/vue/24/outline'

// 游戏状态
const currentLocation = ref('明亮的地窖')
const activeTab = ref('story')

const sceneDescription = ref('你踏入地窖，空气中弥漫着尘土和霉败的气息。角落里有一个生锈的铁箱，看起来已经在这里很久了。')

const availableTools = ref<Tool[]>([
  { id: 'sword', name: '钢钩', icon: WrenchIcon },
  { id: 'shield', name: '铁链', icon: ShieldCheckIcon },
  { id: 'magic', name: '开锁器', icon: SparklesIcon }
])

// 事件处理
const onToolSelected = (tool: Tool) => {
  console.log('选择了工具:', tool.name)
  // 这里可以添加工具选择的逻辑
}

const onTabChange = (tabId: string) => {
  activeTab.value = tabId
  console.log('切换到标签:', tabId)
}

const onSendMessage = (message: string) => {
  console.log('发送消息:', message)
  // 这里可以添加消息发送的逻辑
}
</script>

<template>
  <div id="app-container">
    <div class="mobile-container">
      <AppHeader :current-location="currentLocation" />
      
      <main class="main-content">
        <div class="content-wrapper">
          <SceneCard :description="sceneDescription" />
          <ToolsCard 
            :tools="availableTools" 
            @tool-selected="onToolSelected"
          />
        </div>
      </main>

      <BottomNav 
        :active-tab="activeTab" 
        @tab-change="onTabChange"
      />
      
      <ChatInput @send-message="onSendMessage" />
    </div>
  </div>
</template>

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

.main-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.main-content::-webkit-scrollbar {
  display: none;
}

.content-wrapper {
  padding: 16px;
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
