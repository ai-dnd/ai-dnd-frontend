import { httpClient } from './client'
import type { ChatSession } from '../types'

// 发送消息的接口参数类型
export interface SendMessageParams {
  sessionId: string
  role: 'user' | 'assistant'
  content: string
  metadata?: Record<string, any>
  tempId: string; //临时ID，用于前端临时标识生成乐观更新
  choiceIndex?: number; // 选择的索引
  status?: 'pending' | 'completed' | 'failed'; // 消息状态
}

// 消息响应类型
export interface MessageResponse {
  id: string
  sessionId: string
  role: 'user' | 'assistant'
  createdAt: Date
  metadata: Record<string, any>
  content: string;
  tempId: string; //临时ID，用于前端临时标识生成乐观更新
  status: 'pending' | 'completed' | 'failed'| 'need_react'; // 消息状态
  choiceIndex?: number; // 选择的索引
}

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

  getSessionMesages: async (sessionId: string): Promise<any[]> => {
    console.log('🔧 调试模式：获取会话消息列表', { sessionId })
    
    try {
      const response = await httpClient.get<any[]>(`/chat/sessions/${sessionId}/messages`)
      console.log('✅ 获取会话消息成功:', response)
      
      return response
    } catch (error) {
      console.error('❌ 获取会话消息失败:', error)
      throw error
    }
  },

  // 发送消息接口
  sendMessage: async (params: SendMessageParams): Promise<MessageResponse> => {
    console.log('🔧 调试模式：发送消息', params)
    
    try {
      const response = await httpClient.post<MessageResponse>('/chat/messages', params)
      console.log('✅ 发送消息成功:', response)
      
      return response
    } catch (error) {
      console.error('❌ 发送消息失败:', error)
      throw error
    }
  }
}
