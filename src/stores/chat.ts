import { defineStore } from "pinia";
import { ref } from "vue";
import { chatApi, type MessageResponse, type SendMessageParams } from "../api";
import { nanoid } from "nanoid";

export const useChatStore = defineStore("chat", () => {
  const currentSessionId = ref<string | null>(null);
  const currentDocumentId = ref<string | null>("bo8b695378o1nklsud353mpo");

  const messageLists = ref<MessageResponse[]>([]);

  const sendMessage = async (message: SendMessageParams) => {
    try {

      // messageLists.value.push({message});

      // 创建乐观更新的消息对象
      const optimisticUserMessage: MessageResponse = {
        id: nanoid(8), // 临时使用 tempId 作为 id
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
        id: message.tempId, // 临时使用 tempId 作为 id
        sessionId: message.sessionId,
        role: 'assistant',
        createdAt: new Date(),
        metadata: {},
        content: '', // 暂时为空，等待服务器响应
        tempId: message.tempId,
        status: 'pending', // 标记为待处理状态
        choiceIndex: message.choiceIndex
      }

      // 乐观更新：立即添加到消息列表
      messageLists.value.push(...[optimisticUserMessage, optimisticAiMessage]);
      console.log("🔧 Chat Store: 乐观更新添加消息", optimisticUserMessage);

      // 发送消息到服务器
      const response = await chatApi.sendMessage(message);
      
      // 成功后，用服务器响应替换乐观更新的消息
      const messageIndex = messageLists.value.findIndex(msg => msg.tempId === message.tempId && msg.role === 'assistant'  );
      console.log("🔧 Chat Store: 服务器响应消息", response);
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
      const messageIndex = messageLists.value.findIndex(msg => msg.tempId === message.tempId);
      if (messageIndex !== -1) {
        // 策略1: 标记为失败状态，允许用户重试
        messageLists.value[messageIndex] = {
          ...messageLists.value[messageIndex],
          status: 'failed'
        };
        console.log("⚠️ Chat Store: 消息发送失败，已标记为失败状态", { tempId: message.tempId });
        
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
    messageLists,

    //方法
    setCurrentSessionId(sessionId: string | null) {
      currentSessionId.value = sessionId;
    },
    setCurrentDocumentId(documentId: string | null) {
      currentDocumentId.value = documentId;
    },

    // 初始化消息列表
    async initializeMessagesList(sessionId: string) {
      try {
        console.log("🔧 Chat Store: 开始初始化消息列表", { sessionId });
        const messages = await chatApi.getSessionMesages(sessionId);
        messageLists.value = messages;
        console.log("✅ Chat Store: 消息列表初始化完成", messages);
        return messages;
      } catch (error) {
        console.error("❌ Chat Store: 初始化消息列表失败", error);
        messageLists.value = [];
        throw error;
      }
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
  };
});
