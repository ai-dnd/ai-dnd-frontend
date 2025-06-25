<template>
  <div class="game-view">
    <div class="header-bar">
      <div class="location-info">
        <EnvironmentOutlined />
        <span>当前地点: 阴森的地窖</span>
      </div>
      <div class="world-info">
        <TeamOutlined />
        <span>世界 (127)</span>
      </div>
    </div>
    <div class="content-wrapper">
      <!-- 加载状态提示 -->
      <div v-if="gameStore.isLoading" class="loading-overlay">
        <a-spin size="large" />
        <p>AI 正在思考...</p>
      </div>

      <div class="autoHeight">
        <SceneCard
          :description="gameStore.gameState.sceneDescription"
          @action="onSceneAction"
          :actions="basicActions"
          title="场景描述"
        />

        <!-- AI响应区域 -->
        <SceneCard
          v-if="aiResponse || isWaitingResponse"
          :description="aiResponse"
          title="AI 响应"
          class="ai-response-card"
        >
          <template v-if="isWaitingResponse">
            <a-skeleton active :paragraph="{ rows: 3 }" />
          </template>
        </SceneCard>
      </div>

    </div>

    <!-- 聊天输入框 -->
    <ChatInput @send-message="onSendMessage" @message-sent="onMessageSent" />

    <!-- 底部导航栏 -->
    <nav class="bottom-nav">
      <div class="nav-item active">
        <div class="nav-icon story-icon"></div>
        <span class="nav-label">故事</span>
      </div>
      <div class="nav-item">
        <div class="nav-icon map-icon"></div>
        <span class="nav-label">地图</span>
      </div>
      <div class="nav-item">
        <div class="nav-icon character-icon"></div>
        <span class="nav-label">角色</span>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import { useGameStore } from "../../stores";
import SceneCard from "../../components/game/SceneCard.vue";
import ChatInput from "../../components/ui/ChatInput.vue";
// import ToolsCard from '../../components/game/ToolsCard.vue'
import type { SceneAction } from "../../types";
import {
  ExportOutlined,
  SearchOutlined,
  EnvironmentOutlined,
  TeamOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";

const gameStore = useGameStore();

// AI响应相关状态
const aiResponse = ref<string>("");
const isWaitingResponse = ref(false);

const basicActions = ref<SceneAction[]>(
  [
    {
      id: "examine",
      text: "检查环境",
      icon: SearchOutlined,
    },
    {
      id: "leave",
      text: "离开地窖",
      icon: ExportOutlined,
    },
    {
      id: "attack",
      text: "攻击",
      icon: ExportOutlined,
      type: "primary",
    },
    {
      id: "defend",
      text: "防御",
      icon: ExportOutlined,
      type: "default",
    },
  ]
);

const onSceneAction = async (action: string) => {
  try {
    await gameStore.executeAction({
      id: Date.now().toString(),
      type: "interact",
      description: action,
    });
    message.success("动作执行成功！");
  } catch (error) {
    message.error("执行动作失败");
  }
};

const onSendMessage = async (text: string) => {
  isWaitingResponse.value = true;
  aiResponse.value = "";
  try {
    const response = await gameStore.sendChatMessage(text);
    aiResponse.value = response;
  } catch (error) {
    message.error("发送消息失败");
  } finally {
    isWaitingResponse.value = false;
  }
};

const onMessageSent = () => {
  // 可以在这里处理消息发送后的UI更新，例如清空AI响应
  aiResponse.value = "";
};
</script>

<style scoped>
.game-view {
  display: flex;
  flex-direction: column;
  height: 100%;
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
  padding: 16px;
  background-color: #f9fafb;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.loading-overlay p {
  margin-top: 16px;
  font-size: 16px;
}

.autoHeight {
  height: auto;
}

.ai-response-card {
  margin-top: 16px;
}

.history-card {
  margin-top: 16px;
}

.history-list {
  max-height: 150px;
  overflow-y: auto;
}

.history-item {
  padding: 4px 0;
  border-bottom: 1px solid #f0f0f0;
}

.bottom-nav {
  height: 64px;
  background: #334155;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 16px;
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
