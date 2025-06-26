import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginCredentials, RegisterData, ChatSession, ChatMessage } from '../types'
import { authApi, chatApi } from '../api'
import { useChatStore } from './chat'

export const useAuthStore = defineStore('auth', () => {  // 状态
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const chatSessions = ref<ChatSession[]>([])
  const isLoadingSessions = ref(false)

  // 计算属性
  const isAuthenticated = computed(() => !!user.value && !!token.value)
  const isAdmin = computed(() => user.value?.username === 'admin') // 简单的管理员判断

  // 初始化，从本地存储加载token
  const initialize = () => {
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('user_data')

    if (storedToken) {
      token.value = storedToken
      if (storedUser) {
        try {
          user.value = JSON.parse(storedUser)
        } catch {
          // 如果解析失败，清除数据
          clearAuthData()
        }
      }
    }
  }

  // 清除认证数据
  const clearAuthData = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
  }

  // 保存认证数据
  const saveAuthData = (authData: { user: User; access_token: string }) => {
    user.value = authData.user
    token.value = authData.access_token
    
    localStorage.setItem('auth_token', authData.access_token)
    localStorage.setItem('user_data', JSON.stringify(authData.user))
  }
  // 加载用户的聊天会话数据
  const fetchUserSessionsByDocumentId = async (documentId: string, userId: string) => {
    try {
      isLoadingSessions.value = true
      
      console.log('🔧 开始加载用户会话数据:', { documentId })
      
      const sessions = await chatApi.getDocumentSessions(documentId, userId)
      chatSessions.value = sessions
      
      // 提取所有会话ID
      const sessionIds = sessions.map(session => session.id)
      console.log('📋 获取到指定document会话ID:', sessionIds)
      
      return sessions[0]
    } catch (err) {
      console.error('❌ 加载会话数据失败:', err)
      error.value = err instanceof Error ? err.message : '加载会话数据失败'
      throw err
    } finally {
      isLoadingSessions.value = false
    }
  }

  interface LoadUserMessagesBySession {
    (sessionId: string): Promise<ChatMessage[]>
  }

  const loadUserMessagesBySession: LoadUserMessagesBySession = async (sessionId: string) => {
    console.log('🔧 开始加载会话消息数据:', { sessionId })
    const sessionMessages = await chatApi.getSessionMesages(sessionId) as ChatMessage[]
    console.log('📋 获取到会话消息:', sessionMessages)
    return sessionMessages
  }

  // 登录
  const login = async (credentials: LoginCredentials, documentId?: string) => {
    try {
      isLoading.value = true
      error.value = null
      
      console.log('🔧 调试模式：开始模拟登录流程')
      
      const authData = await authApi.login(credentials)
      saveAuthData(authData)
      
      console.log('✅ 模拟登录成功，用户:', authData.user.username)
      
      // 登录成功后，如果提供了documentId，自动加载会话数据
      if (documentId) {
        console.log('🔧 登录成功，开始加载会话数据...')
        try {
          const chatSesseion = await fetchUserSessionsByDocumentId(documentId, authData.user.id.toString())
          useChatStore().setCurrentSessionId(chatSesseion.id)
        } catch (sessionError) {
          console.warn('⚠️ 会话数据加载失败，但登录成功:', sessionError)
          // 不影响登录流程，只是警告
        }
      }
      
      return authData
    } catch (err) {
      console.error('❌ 登录失败:', err)
      error.value = err instanceof Error ? err.message : '登录失败'
      throw err
    } finally {
      isLoading.value = false
    }
  }
  // 注册
  const register = async (data: RegisterData) => {
    try {
      isLoading.value = true
      error.value = null
      
      console.log('🔧 调试模式：开始模拟注册流程')
      
      const authData = await authApi.register(data)
      saveAuthData(authData)
      
      console.log('✅ 模拟注册成功，用户:', authData.user.username)
      
      return authData
    } catch (err) {
      console.error('❌ 注册失败:', err)
      error.value = err instanceof Error ? err.message : '注册失败'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // 登出
  const logout = async () => {
    try {
      if (token.value) {
        await authApi.logout()
      }
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      clearAuthData()
    }
  }
  // 刷新token
  const refreshAuthToken = async () => {
    try {
      const tokens = await authApi.refreshToken()
      token.value = tokens.access_token
      
      localStorage.setItem('auth_token', tokens.access_token)
      
      return tokens
    } catch (err) {
      clearAuthData()
      throw err
    }
  }

  // 获取当前用户信息
  const fetchCurrentUser = async () => {
    try {
      isLoading.value = true
      const userData = await authApi.getCurrentUser()
      user.value = userData
      localStorage.setItem('user_data', JSON.stringify(userData))
      return userData
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取用户信息失败'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // 验证token
  const validateToken = async () => {
    try {
      if (!token.value) return false
      
      const isValid = await authApi.validateToken()
      if (!isValid) {
        clearAuthData()
      }
      return isValid
    } catch {
      clearAuthData()
      return false
    }
  }
  
  return {
    // 状态
    user,
    token,
    isLoading,
    error,
    chatSessions,
    isLoadingSessions,
    
    // 计算属性
    isAuthenticated,
    isAdmin,
    
    // 方法
    initialize,
    login,
    register,
    logout,
    refreshAuthToken,
    fetchCurrentUser,
    validateToken,
    clearAuthData,
    loadUserSessions: fetchUserSessionsByDocumentId,
  }
})
