import { httpClient } from './client'
import type { ChatSession } from '../types'

export const chatApi = {
  // 获取文档的聊天会话列表记录
  getDocumentSessions: async (documentId: string, userId: string): Promise<ChatSession[]> => {
    console.log('🔧 调试模式：获取文档会话列表', { documentId })
    
    try {
      const response = await httpClient.get<ChatSession[]>(`/chat/sessions/document/${documentId}?userId=${userId}`)
      console.log('✅ 获取文档会话成功:', response)
      
      // 提取所有会话的ID
      const chatSessionIds = response.map(session => session.id)
      console.log('📋 会话ID列表:', chatSessionIds)
      
      return response
    } catch (error) {
      console.error('❌ 获取文档会话失败:', error)
      throw error
    }
  },

  getDocumentMesages: async (sessionId: string): Promise<any[]> => {
    console.log('🔧 调试模式：获取会话消息列表', { sessionId })
    
    try {
      const response = await httpClient.get<any[]>(`/chat/sessions/${sessionId}/messages`)
      console.log('✅ 获取会话消息成功:', response)
      
      return response
    } catch (error) {
      console.error('❌ 获取会话消息失败:', error)
      throw error
    }
  }
}
