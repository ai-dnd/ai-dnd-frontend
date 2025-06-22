import type { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  User, 
  UserProfile
} from '../types'

// 模拟延迟函数
const mockDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms))

// 模拟用户数据
const mockUser: User = {
  id: '1',
  username: 'testuser',
  email: 'test@example.com',
  avatar: '',
  createdAt: new Date().toISOString(),
  lastLoginAt: new Date().toISOString()
}

export const authApi = {
  // 用户登录 - 模拟接口
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await mockDelay(800) // 模拟网络延迟
    
    // 任何用户名和密码都可以登录
    console.log('模拟登录，用户名:', credentials.username)
    
    return {
      user: {
        ...mockUser,
        username: credentials.username
      },
      token: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now()
    }
  },

  // 用户注册 - 模拟接口
  async register(data: RegisterData): Promise<AuthResponse> {
    await mockDelay(1000) // 模拟网络延迟
    
    console.log('模拟注册，用户名:', data.username)
    
    return {
      user: {
        ...mockUser,
        username: data.username,
        email: data.email
      },
      token: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now()
    }
  },

  // 刷新token - 模拟接口
  async refreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
    await mockDelay(300)
    
    console.log('模拟刷新token:', refreshToken)
    
    return {
      token: 'mock-new-jwt-token-' + Date.now(),
      refreshToken: 'mock-new-refresh-token-' + Date.now()
    }
  },

  // 用户登出 - 模拟接口
  async logout(): Promise<void> {
    await mockDelay(200)
    console.log('模拟用户登出')
  },

  // 获取当前用户信息 - 模拟接口
  async getCurrentUser(): Promise<User> {
    await mockDelay(300)
    
    // 从本地存储获取用户信息
    const storedUser = localStorage.getItem('user_data')
    if (storedUser) {
      return JSON.parse(storedUser)
    }
    
    return mockUser
  },

  // 更新用户资料 - 模拟接口
  async updateProfile(profile: Partial<UserProfile>): Promise<User> {
    await mockDelay(600)
    
    console.log('模拟更新用户资料:', profile)
    
    const updatedUser = {
      ...mockUser,
      ...profile
    }
    
    return updatedUser
  },
  // 修改密码 - 模拟接口
  async changePassword(_oldPassword: string, _newPassword: string): Promise<void> {
    await mockDelay(500)
    console.log('模拟修改密码')
  },

  // 验证token是否有效 - 模拟接口
  async validateToken(): Promise<boolean> {
    await mockDelay(200)
    
    // 简单检查是否有token
    const token = localStorage.getItem('auth_token')
    const isValid = !!token
    
    console.log('模拟验证token:', isValid)
    return isValid
  }
}
