// 导出所有类型定义
export * from './user'
export * from './game'
export * from './common'

// 聊天会话相关类型
export interface ChatSession {
  id: string
  userId: number
  documentId: string
  createdAt: string
  updatedAt: string
  metadata: Record<string, any>
}

export interface ChatMessage {
    id: string
    sessionId: string
    role: 'user' | 'assistant' | 'system'
    content: string
    createdAt: string
    metadata?: Record<string, any>
}