<template>
  <div class="chat-input-container">
    <div class="chat-input-wrapper">
      <a-input
        v-model:value="inputText"
        placeholder="输入你想要做的事情..."
        class="chat-input"
        @press-enter="handleSend"
        size="large"
      />      <a-button 
        type="primary"
        shape="circle"
        class="send-button"
        @click="handleSend"
        :disabled="!inputText.trim() || isLoading"
        :loading="isLoading"
        size="large"
      >
        <template #icon>
          <SendOutlined class="send-icon" />
        </template>
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { SendOutlined } from '@ant-design/icons-vue'
import { chatApi } from '../../api'
import { useChatStore } from '@/stores/chat'

const inputText = ref('')
const isLoading = ref(false)
const chatStore = useChatStore()

const emit = defineEmits<{
  'send-message': [message: string]
  'message-sent': [response: any]
}>()

const handleSend = async () => {
  if (!inputText.value.trim()) return
  
  const messageContent = inputText.value.trim()
  inputText.value = ''
  
  try {
    isLoading.value = true
    
    // 先触发用户消息发送事件
    emit('send-message', messageContent)
    
    if(!chatStore.currentSessionId) throw new Error('当前会话ID不存在，请先创建会话')
    // 调用API发送消息
    const response = await chatApi.sendMessage({
      sessionId: chatStore.currentSessionId,
      role: 'user',
      content: messageContent,
      metadata: {}
    })
    
    // 触发消息发送完成事件
    emit('message-sent', response)
    
    message.success('消息发送成功！')
  } catch (error) {
    console.error('发送消息失败:', error)
    message.error('发送消息失败，请重试')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.chat-input-container {
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  padding: 16px 20px;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
  flex-shrink: 0;
}

.chat-input-wrapper {
  display: flex;
  gap: 12px;
  align-items: center;
}

.chat-input {
  flex: 1;
}

:deep(.ant-input) {
  border: 1px solid rgba(148, 163, 184, 0.3) !important;
  border-radius: 24px !important;
  font-size: 14px !important;
  background: rgba(30, 41, 59, 0.8) !important;
  color: #e2e8f0 !important;
  padding: 12px 16px !important;
  transition: all 0.2s ease !important;
}

:deep(.ant-input::placeholder) {
  color: #94a3b8 !important;
}

:deep(.ant-input:focus) {
  border-color: #60a5fa !important;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2) !important;
  background: rgba(30, 41, 59, 1) !important;
}

.send-button {
  width: 44px !important;
  height: 44px !important;
  background: #3b82f6 !important;
  border-color: #3b82f6 !important;
  transition: all 0.2s ease !important;
}

.send-button:hover:not(:disabled) {
  background: #2563eb !important;
  border-color: #2563eb !important;
  transform: scale(1.05) !important;
}

.send-button:disabled {
  background: #475569 !important;
  border-color: #475569 !important;
  transform: none !important;
}

.send-icon {
  font-size: 16px;
}
</style>
