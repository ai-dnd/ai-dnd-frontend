import { defineStore } from "pinia";
import { ref } from "vue";
import { chatApi, type MessageResponse, type SendMessageParams } from "../api";

export const useChatStore = defineStore("chat", () => {
  const currentSessionId = ref<string | null>(null);
  const currentDocumentId = ref<string | null>("bo8b695378o1nklsud353mpo");

  const messageLists = ref<MessageResponse[]>([]);

  const sendMessage = async (message: SendMessageParams) => {
    try {
      const response = await chatApi.sendMessage(message);
      messageLists.value.push(response)
      return response;
    } catch (error) {
      console.error("❌ Chat Store: 发送消息失败", error);
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

    sendMessage,
  };
});
