// 用户相关类型定义
export interface User {
  id: number
  username: string
  email: string
  avatar?: string
  createdAt?: string
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

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  user: {
    id: number
    username: string
    email: string
  }
}

export interface UserProfile {
  id: number
  username: string
  email: string
  avatar?: string
  bio?: string
  level: number
  experience: number
}
