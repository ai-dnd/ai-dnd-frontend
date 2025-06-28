import { defineStore } from "pinia";
import { ref } from "vue";
import { chatApi, type MessageResponse, type SendMessageParams } from "../api";
import type { ChatSession, ChatMessage } from "../types";
import { nanoid } from "nanoid";

export const useChatStore = defineStore("chat", () => {
  const currentSessionId = ref<string | null>(null);
  const currentDocumentId = ref<string | null>("bo8b695378o1nklsud353mpo");
  const chatSessions = ref<ChatSession[]>([]);
  const isLoadingSessions = ref(false);

  const messageLists = ref<MessageResponse[]>([]);

  const sendMessage = async (message: SendMessageParams) => {
         const AiMessagetempId = nanoid();
    try {

      // messageLists.value.push({message});

      // 创建乐观更新的消息对象
      const optimisticUserMessage: MessageResponse = {
        id: message.tempId,
        sessionId: message.sessionId,
        role: message.role,
        createdAt: new Date(),
        metadata: message.metadata || {},
        content: message.content,
        tempId: message.tempId,
        status: 'completed', // 标记为待处理状态
        choiceIndex: message.choiceIndex
      };

 
      const optimisticAiMessage: MessageResponse = {
        id: AiMessagetempId, // 临时使用 tempId 作为 id
        sessionId: message.sessionId,
        role: 'assistant',
        createdAt: new Date(),
        metadata: {},
        content: '', // 暂时为空，等待服务器响应
        tempId: AiMessagetempId,
        status: 'pending', // 标记为待处理状态
        choiceIndex: message.choiceIndex
      }

      // 乐观更新：立即添加到消息列表
      messageLists.value.push(...[optimisticUserMessage, optimisticAiMessage]);
      console.log("🔧 Chat Store: 乐观更新添加消息", optimisticUserMessage);

      // 发送消息到服务器
      const response = await chatApi.sendMessage(message);
      
      // 成功后，用服务器响应替换乐观更新的消息
      const messageIndex = messageLists.value.findIndex(msg => msg.tempId === AiMessagetempId && msg.role === 'assistant'  );
      console.log("🔧 Chat Store: 服务器响应消息", response,messageIndex);
      if (messageIndex !== -1) {
        messageLists.value[messageIndex] = {
          ...response
        };
        console.log("✅ Chat Store: 消息发送成功，更新状态", response);
      }
      
      return response;
    } catch (error) {
      console.error("❌ Chat Store: 发送消息失败", error);
      
      // 失败时的处理策略
      const messageIndex = messageLists.value.findIndex(msg => msg.tempId === AiMessagetempId);
      if (messageIndex !== -1) {
        // 策略1: 标记为失败状态，允许用户重试
        messageLists.value[messageIndex] = {
          ...messageLists.value[messageIndex],
          status: 'failed'
        };

        console.log("⚠️ Chat Store: 消息发送失败，已标记为失败状态", { tempId: message.tempId });
        
        setTimeout(() => {
          messageLists.value.splice(messageLists.value.length - 1, 2);
        }, 2000); // 延时1秒，模拟用户可以看到失败状态
        // 策略2: 直接移除失败的消息（取消注释下行，注释上面的代码）
        // messageLists.value.splice(messageIndex, 1);
        // console.log("🗑️ Chat Store: 消息发送失败，已移除", { tempId: message.tempId });
      }
      
      throw error;
    }
  };
  return {
    //状态
    currentSessionId,
    currentDocumentId,
    chatSessions,
    isLoadingSessions,
    messageLists,

    //方法
    setCurrentSessionId(sessionId: string | null) {
      currentSessionId.value = sessionId;
    },
    setCurrentDocumentId(documentId: string | null) {
      currentDocumentId.value = documentId;
    },


    // 清空消息列表
    clearMessagesList() {
      messageLists.value = [];
    },

    // 重试发送失败的消息
    async retryMessage(tempId: string) {
      const messageIndex = messageLists.value.findIndex(msg => msg.tempId === tempId);
      if (messageIndex === -1) {
        console.error("❌ Chat Store: 未找到要重试的消息", { tempId });
        return;
      }

      const failedMessage = messageLists.value[messageIndex];
      const retryParams: SendMessageParams = {
        sessionId: failedMessage.sessionId,
        role: failedMessage.role,
        content: '',
        metadata: failedMessage.metadata,
        tempId: failedMessage.tempId,
        choiceIndex: failedMessage.choiceIndex
      };

      // 重置状态为 pending
      messageLists.value[messageIndex] = {
        ...failedMessage,
        status: 'pending'
      };

      try {
        await sendMessage(retryParams);
      } catch (error) {
        console.error("❌ Chat Store: 重试消息失败", error);
        throw error;
      }
    },

    sendMessage,

    // 移除指定的消息
    removeMessage(tempId: string) {
      const messageIndex = messageLists.value.findIndex(msg => msg.tempId === tempId);
      if (messageIndex !== -1) {
        messageLists.value.splice(messageIndex, 1);
        console.log("🗑️ Chat Store: 已移除消息", { tempId });
      }
    },

    // 获取待处理的消息
    getPendingMessages() {
      return messageLists.value.filter(msg => msg.status === 'pending');
    },

    // 获取失败的消息
    getFailedMessages() {
      return messageLists.value.filter(msg => msg.status === 'failed');
    },

    // 加载用户的聊天会话id
    async fetchUserSessionsByDocumentId(documentId: string, userId: string) {
      try {
        isLoadingSessions.value = true
        
        console.log('🔧 Chat Store: 开始加载用户会话数据:', { documentId })
        
        if(currentSessionId.value) return currentSessionId
        const sessions = await chatApi.getDocumentSessions(documentId, userId)
        chatSessions.value = sessions
        
        // 提取所有会话ID
        const sessionIds = sessions.map(session => session.id)
        console.log('📋 Chat Store: 获取到指定document会话ID:', sessionIds)
        currentSessionId.value = sessionIds[0]
        return sessions[0]
      } catch (err) {
        console.error('❌ Chat Store: 加载会话数据失败:', err)
        throw err
      } finally {
        isLoadingSessions.value = false
      }
    },

    async getUserMessagesBySession(sessionId: string): Promise<ChatMessage[]> {

      if(messageLists.value.length > 0) {
        return messageLists.value.map(msg => ({
          id: msg.id,
          sessionId: msg.sessionId,
          role: msg.role, 
          content: msg.content,
          createdAt: msg.createdAt.toString(),
        }));
      };

      const sessionMessages = await chatApi.getSessionMesages(sessionId)
      messageLists.value = sessionMessages
      return sessionMessages
    },
  };
});
