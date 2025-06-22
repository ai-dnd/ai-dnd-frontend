// 用户相关类型定义
export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  createdAt: string
  lastLoginAt?: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}

export interface UserProfile {
  id: string
  username: string
  email: string
  avatar?: string
  bio?: string
  level: number
  experience: number
}
