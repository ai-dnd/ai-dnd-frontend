<template>
  <div class="chat-input-container">
    <div class="chat-input-wrapper">
      <input
        v-model="inputText"
        type="text"
        placeholder="输入你想要做的事情..."
        class="chat-input"
        @keyup.enter="handleSend"
      />
      <button 
        class="send-button"
        @click="handleSend"
        :disabled="!inputText.trim()"
      >
        <PaperAirplaneIcon class="send-icon" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PaperAirplaneIcon } from '@heroicons/vue/24/solid'

const inputText = ref('')

const emit = defineEmits<{
  'send-message': [message: string]
}>()

const handleSend = () => {
  if (inputText.value.trim()) {
    emit('send-message', inputText.value.trim())
    inputText.value = ''
  }
}
</script>

<style scoped>
.chat-input-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
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
  padding: 12px 16px;
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 24px;
  font-size: 14px;
  background: rgba(30, 41, 59, 0.8);
  color: #e2e8f0;
  outline: none;
  transition: all 0.2s ease;
}

.chat-input::placeholder {
  color: #94a3b8;
}

.chat-input:focus {
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
  background: rgba(30, 41, 59, 1);
}

.send-button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #3b82f6;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.send-button:hover:not(:disabled) {
  background: #2563eb;
  transform: scale(1.05);
}

.send-button:disabled {
  background: #475569;
  cursor: not-allowed;
  transform: none;
}

.send-icon {
  width: 18px;
  height: 18px;
}
</style>
