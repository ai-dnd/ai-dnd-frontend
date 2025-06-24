<template>
  <div class="game-view">
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

      <!-- 游戏历史记录 -->
      <!-- <a-card v-if="gameStore.gameHistory.length > 0" title="冒险日志" class="history-card">
        <div class="history-list">
          <div 
            v-for="(record, index) in gameStore.gameHistory.slice(-5)" 
            :key="index"
            class="history-item"
          >
            {{ record }}
          </div>
        </div>
      </a-card> -->
    </div>

    <!-- 聊天输入框 -->
    <ChatInput @send-message="onSendMessage" @message-sent="onMessageSent" />
  </div>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import { useGameStore } from "../stores";
import SceneCard from "../components/game/SceneCard.vue";
import ChatInput from "../components/ui/ChatInput.vue";
// import ToolsCard from '../components/game/ToolsCard.vue'
import type { SceneAction } from "../types";
import { ExportOutlined, SearchOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";

const gameStore = useGameStore();

// AI响应相关状态
const aiResponse = ref<string>("");
const isWaitingResponse = ref(false);

const basicActions = ref<SceneAction[]>([
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
]);

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
    console.error("执行动作失败:", error);
  }
};

const onSendMessage = (messageContent: string) => {
  console.log("用户发送消息:", messageContent);
  // 开始等待响应状态
  isWaitingResponse.value = true;
  aiResponse.value = ""; // 清空之前的响应
};

const onMessageSent = (response: any) => {
  console.log("消息发送完成，收到响应:", response);
  // 结束等待状态，显示AI响应
  isWaitingResponse.value = false;
  aiResponse.value = response.content || "收到您的消息，正在处理中...";
};
</script>

<style scoped>
.game-view {
  display: flex;

  flex: 1;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  position: relative;
  display: flex;
  flex: 1;
  height: 0;
  overflow-y: auto;

  scrollbar-width: none;
  -ms-overflow-style: none;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-overlay p {
  color: #fff;
  margin-top: 16px;
  font-size: 16px;
}

.autoHeight {
  position: absolute;
  inset: 0;

  padding: 16px;
  overflow-y: auto;
}
.ai-response-card {
  margin-top: 16px;
}

.ai-response-card :deep(.ant-card) {
  background: rgba(30, 41, 59, 0.9);
  border: 1px solid rgba(96, 165, 250, 0.3);
}

.ai-response-card :deep(.ant-card-head-title) {
  color: #60a5fa;
}

.history-card {
  margin-top: 16px;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.2);
}

:deep(.ant-card-head-title) {
  color: #f8fafc;
}

.history-list {
  max-height: 150px;
  overflow-y: auto;
}

.history-item {
  color: #94a3b8;
  font-size: 12px;
  padding: 4px 0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
}

.history-item:last-child {
  border-bottom: none;
}
</style>
