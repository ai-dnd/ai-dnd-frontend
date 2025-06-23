import type { 
  LoginCredentials, 
  RegisterData,
  RegisterRequest, 
  AuthResponse, 
  User
} from '../types'
import { httpClient } from './client'

export const authApi = {
  // 用户登录
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse>('/auth/login', credentials)
    
    // 存储 token 和用户信息
    localStorage.setItem('auth_token', response.access_token)
    localStorage.setItem('user_data', JSON.stringify(response.user))
    
    return response
  },
  // 用户注册
  async register(data: RegisterData): Promise<AuthResponse> {
    // 只发送后端需要的参数
    const registerRequest: RegisterRequest = {
      username: data.username,
      email: data.email,
      password: data.password
    }
    
    const response = await httpClient.post<AuthResponse>('/auth/register', registerRequest)
    
    // 存储 token 和用户信息
    localStorage.setItem('auth_token', response.access_token)
    localStorage.setItem('user_data', JSON.stringify(response.user))
    
    return response
  },

  // 刷新token
  async refreshToken(): Promise<{ access_token: string }> {
    const response = await httpClient.post<{ access_token: string }>('/auth/refresh')
    
    // 更新存储的 token
    localStorage.setItem('auth_token', response.access_token)
    
    return response
  },

  // 用户登出
  async logout(): Promise<void> {
    try {
      await httpClient.post('/auth/logout')
    } finally {
      // 清除本地存储
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
    }
  },

  // 获取当前用户信息
  async getCurrentUser(): Promise<User> {
    const response = await httpClient.get<User>('/auth/me')
    
    // 更新本地存储的用户信息
    localStorage.setItem('user_data', JSON.stringify(response))
    
    return response
  },

  // 验证token是否有效
  async validateToken(): Promise<boolean> {
    try {
      await httpClient.get('/auth/validate')
      return true
    } catch (error) {
      // token 无效，清除本地存储
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      return false
    }
  }
}
