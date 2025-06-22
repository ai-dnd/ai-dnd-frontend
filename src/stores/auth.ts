import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginCredentials, RegisterData } from '../types'
import { authApi } from '../api'

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // 计算属性
  const isAuthenticated = computed(() => !!user.value && !!token.value)
  const isAdmin = computed(() => user.value?.username === 'admin') // 简单的管理员判断

  // 初始化，从本地存储加载token
  const initialize = () => {
    const storedToken = localStorage.getItem('auth_token')
    const storedRefreshToken = localStorage.getItem('refresh_token')
    const storedUser = localStorage.getItem('user_data')

    if (storedToken) {
      token.value = storedToken
      refreshToken.value = storedRefreshToken
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
    refreshToken.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user_data')
  }

  // 保存认证数据
  const saveAuthData = (authData: { user: User; token: string; refreshToken: string }) => {
    user.value = authData.user
    token.value = authData.token
    refreshToken.value = authData.refreshToken
    
    localStorage.setItem('auth_token', authData.token)
    localStorage.setItem('refresh_token', authData.refreshToken)
    localStorage.setItem('user_data', JSON.stringify(authData.user))
  }
  // 登录
  const login = async (credentials: LoginCredentials) => {
    try {
      isLoading.value = true
      error.value = null
      
      console.log('🔧 调试模式：开始模拟登录流程')
      
      const authData = await authApi.login(credentials)
      saveAuthData(authData)
      
      console.log('✅ 模拟登录成功，用户:', authData.user.username)
      
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
      if (!refreshToken.value) {
        throw new Error('No refresh token available')
      }

      const tokens = await authApi.refreshToken(refreshToken.value)
      token.value = tokens.token
      refreshToken.value = tokens.refreshToken
      
      localStorage.setItem('auth_token', tokens.token)
      localStorage.setItem('refresh_token', tokens.refreshToken)
      
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
    refreshToken,
    isLoading,
    error,
    
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
  }
})
