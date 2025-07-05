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
    <div class="content-wrapper" ref="contentWrapperRef">
      <!-- 加载状态提示 -->
      <div v-if="gameStore.isLoading" class="loading-overlay">
        <a-spin size="large" />
        <p>AI 正在思考...</p>
      </div>

      <div class="autoHeight">
        <!-- AI响应区域 -->
        <transition-group name="scene-card" tag="div" class="message-container">
          <SceneCard
            v-for="message in messageLists"
            :key="message.id"
            :description="message.content"
            :title="message.role === 'user' ? '你的行动' : '守秘人'"
            class="history-card"
            :actions="computeActions(message)"
            @action-button-pressed="onActionButtonPressed"
          >
            <template #description>
              <div class="history-list">
                <div class="history-item" v-if="message.status === 'pending'">
                  <a-skeleton paragraph :rows="3" active  />
                </div>
                <div class="history-item" v-else>
                  <template v-if="message.status === 'completed'">
                    <div class="history-narrative">{{ message.content }}</div>
                  </template>
                  <template v-else-if="message.status === 'need_react'">
                    <span class="history-narrative"
                      >请进行<{{ message.content }}>技能鉴定</span
                    >
                  </template>
                </div>
              </div>
            </template>
          </SceneCard>
        </transition-group>
      </div>
    </div>

    <!-- 聊天输入框 -->
    <ChatInput
      @send-message="onSendMessage"
      @message-sent="onMessageSent"
      @send-error=""
    />

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
import { useAuthStore, useGameStore } from "../../stores";
import { useChatStore } from "../../stores/chat";
import SceneCard from "../../components/game/SceneCard.vue";
import ChatInput from "../../components/ui/ChatInput.vue";
import { EnvironmentOutlined, TeamOutlined } from "@ant-design/icons-vue";
import { ref, onMounted, watch, nextTick, computed } from "vue";
import type { SceneAction } from "@/types";
import type { MessageResponse, SendMessageParams } from "@/api";
import { nanoid } from "nanoid";

const gameStore = useGameStore();
const chatStore = useChatStore();
const user = useAuthStore().user;
//TODO -- 添加skillCheck等相关逻辑
//TODO -- 完善选项点击交互
//TODO -- 添加markdown文本展示效果
// AI响应相关状态
const aiResponse = ref<string>("");
const isWaitingResponse = ref(true);
const messageLists = computed(() => chatStore.messageLists.filter(
  (message) => message.role === "assistant" || message.choiceIndex === -1
));
const contentWrapperRef = ref<HTMLElement | null>(null);
const currentSessionId = computed(() => chatStore.currentSessionId)
const onSendMessage = async (text: string) => {};
const onMessageSent = () => {
  // 可以在这里处理消息发送后的UI更新，例如清空AI响应
  contentWrapperRef.value?.scrollTo({
    top: contentWrapperRef.value.scrollHeight,
    behavior: "smooth",
  });
  console.log("✅ StoryView: 消息发送成功，滚动到最新消息");
};

const onActionButtonPressed = async (actionText: string, index: number) => {
  console.log("✅ StoryView: 执行动作按钮", actionText, index);
  if(!currentSessionId.value) {
    console.error("❌ StoryView: 当前会话ID不存在，请先创建会话");
    return;
  }

  const actionMessage: SendMessageParams = {
    tempId: nanoid(8),
    sessionId: currentSessionId.value,
    role: "user",
    content: actionText,
    choiceIndex: index,
  }
  chatStore.sendMessage(actionMessage)

  }

const computeActions = (message: MessageResponse): SceneAction[] => {
  // 根据消息内容计算可用的动作
  const options = message.metadata?.params?.options || [];
  console.log("✅ StoryView: 计算动作选项", options);
  const sceneAction = [
    ...options?.map((option: string) => ({
      id: `option-${nanoid(2)}`,
      text: option,
      icon: "CheckCircleOutlined",
      type: "default",
      ghost: true,
    })),
  ];

  
  if (message.status === "need_react") {
    sceneAction.push(...[
      {
        id: `option-${nanoid(2)}`,
        text: `进行技能鉴定`,
        icon: "CheckCircleOutlined",
        type: "default",
        ghost: true,
      },
    ]);
  }
  return sceneAction;
};
// 组件挂载时初始化消息列表
onMounted(async () => {
  console.log("✅ StoryView: 组件挂载，开始初始化消息列表");
  if (!user?.id || !chatStore.currentDocumentId)
    throw new Error("用户未登录或ID不存在");
  await chatStore.fetchUserSessionsByDocumentId(
    chatStore.currentDocumentId,
    user.id.toString()
  );
  if (!currentSessionId.value) {
    throw new Error("当前会话ID不存在，请先创建会话");
  }
  await chatStore.getUserMessagesBySession(currentSessionId.value);
});

watch(
  () => chatStore.messageLists.length,
  (newMessages) => {
    nextTick(() => {
      if (contentWrapperRef.value) {
        contentWrapperRef.value.scrollTo({
          top: contentWrapperRef.value.scrollHeight,
          behavior: "smooth",
        });
      }
    });
  },
  { immediate: true }
);
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

:deep(.ant-skeleton-paragraph li) {
  margin-left: 0;
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

.message-container {
  position: relative;
}

.history-card {
  margin-bottom: 16px;
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform: translateZ(0);
}

.history-narrative {
  white-space: pre-wrap;
  word-break: break-word;
}

/* SceneCard 动画样式 */
.scene-card-enter-active {
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.scene-card-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.scene-card-enter-to {
  opacity: 1;
  transform: translateY(0);
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
