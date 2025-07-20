<template>
  <GameLayout>
    <div class="story-content">
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

      <!-- 聊天输入框 -->
      <ChatInput
        @send-message="onSendMessage"
        @message-sent="onMessageSent"
        @send-error=""
      />
    </div>
  </GameLayout>
</template>

<script setup lang="ts">
import { useAuthStore, useGameStore } from "../../stores";
import { useChatStore } from "../../stores/chat";
import SceneCard from "../../components/game/SceneCard.vue";
import ChatInput from "../../components/ui/ChatInput.vue";
import GameLayout from "../../components/layout/GameLayout.vue";
import { onMounted, watch, nextTick, computed } from "vue";
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
const messageLists = computed(() => chatStore.messageLists.filter(
  (message) => message.role === "assistant" || message.choiceIndex === -1
));
const currentSessionId = computed(() => chatStore.currentSessionId)
const onSendMessage = async (_text: string) => {};
const onMessageSent = () => {
  // 可以在这里处理消息发送后的UI更新，例如清空AI响应
  const contentWrapper = document.querySelector('.story-content');
  if (contentWrapper) {
    contentWrapper.scrollTo({
      top: contentWrapper.scrollHeight,
      behavior: "smooth",
    });
  }
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
  () => {
    nextTick(() => {
      const contentWrapper = document.querySelector('.story-content');
      if (contentWrapper) {
        contentWrapper.scrollTo({
          top: contentWrapper.scrollHeight,
          behavior: "smooth",
        });
      }
    });
  },
  { immediate: true }
);
</script>

<style scoped>
.story-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  position: relative;
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
  flex: 1;
  overflow-y: auto;
  margin-bottom: 16px;
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
</style>
