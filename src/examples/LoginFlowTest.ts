// 测试登录后加载会话数据的流程
// 这个文件演示了如何使用新的登录流程

import { useAuthStore } from '../stores/auth'
import type { ChatSession } from '../types'

async function testLoginFlow() {
  const authStore = useAuthStore()
  
  console.log('🚀 开始测试登录后加载会话数据流程')
  
  try {
    // 模拟登录凭据
    const credentials = {
      username: 'testuser',
      password: 'password123'
    }
    
    // 指定要加载会话的文档ID
    const documentId = 'doc_12345'
    
    console.log('🔐 开始登录...')
    
    // 登录并自动加载会话数据
    const result = await authStore.login(credentials, documentId)
    
    console.log('✅ 登录成功!')
    console.log('用户信息:', result.user.username)
    console.log('Token:', result.access_token)
    
    // 检查会话数据是否已加载
    console.log('📋 加载的会话数据:')
    console.log('会话数量:', authStore.chatSessions.length)
    
    authStore.chatSessions.forEach((session, index) => {
      console.log(`会话 ${index + 1}:`, {
        id: session.id,
        documentId: session.documentId,
        userId: session.userId,
        createdAt: session.createdAt
      })
    })
    
    // 提取所有会话ID
    const sessionIds = authStore.chatSessions.map(session => session.id)
    console.log('🆔 所有会话ID:', sessionIds)
    
    return {
      success: true,
      sessionIds,
      sessionCount: authStore.chatSessions.length
    }
      } catch (error) {
    console.error('❌ 测试失败:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '未知错误'
    }
  }
}

// 导出测试函数
export { testLoginFlow }
