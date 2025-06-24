import { defineStore } from "pinia";
import { ref } from "vue";

export const useChatStore = defineStore('chat',() =>{

    const currentSessionId = ref<string | null>(null);
    const currentDocumentId = ref<string | null>('bo8b695378o1nklsud353mpo');

    return {
        //状态
        currentSessionId,
        currentDocumentId,

        //方法
        setCurrentSessionId(sessionId: string | null) {
            currentSessionId.value = sessionId;
        },
        setCurrentDocumentId(documentId: string | null) {
            currentDocumentId.value = documentId;
        }

    }

})