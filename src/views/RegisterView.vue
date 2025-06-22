<template>
  <div class="register-view">
    <div class="register-container">      <div class="register-header">
        <h1>创建账号</h1>
        <p>开始你的冒险之旅</p>
        <div class="debug-notice">
          <small>🔧 调试模式：任意信息都可注册</small>
        </div>
      </div>
      
      <a-form
        :model="form"
        :rules="rules"
        @finish="onSubmit"
        layout="vertical"
        class="register-form"
      >
        <a-form-item label="用户名" name="username">
          <a-input 
            v-model:value="form.username" 
            placeholder="请输入用户名"
            :disabled="authStore.isLoading"
          />
        </a-form-item>
        
        <a-form-item label="邮箱" name="email">
          <a-input 
            v-model:value="form.email" 
            placeholder="请输入邮箱地址"
            :disabled="authStore.isLoading"
          />
        </a-form-item>
        
        <a-form-item label="密码" name="password">
          <a-input-password 
            v-model:value="form.password" 
            placeholder="请输入密码"
            :disabled="authStore.isLoading"
          />
        </a-form-item>
        
        <a-form-item label="确认密码" name="confirmPassword">
          <a-input-password 
            v-model:value="form.confirmPassword" 
            placeholder="请再次输入密码"
            :disabled="authStore.isLoading"
          />
        </a-form-item>
        
        <a-form-item>
          <a-button 
            type="primary" 
            html-type="submit" 
            :loading="authStore.isLoading"
            block
          >
            注册
          </a-button>
        </a-form-item>
      </a-form>
      
      <div class="register-footer">
        <p>已有账号？</p>
        <router-link to="/login">立即登录</router-link>
      </div>
      
      <a-alert
        v-if="authStore.error"
        :message="authStore.error"
        type="error"
        show-icon
        closable
        @close="clearError"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { useAuthStore } from '../stores'
import type { RegisterData } from '../types'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive<RegisterData>({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const validateConfirmPassword = () => {
  return form.password === form.confirmPassword ? Promise.resolve() : Promise.reject('两次输入的密码不一致')
}

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度应为3-20个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为6个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
}

const onSubmit = async () => {
  try {
    await authStore.register(form)
    message.success('注册成功')
    router.push('/')
  } catch (error) {
    console.error('注册失败:', error)
  }
}

const clearError = () => {
  authStore.error = null
}
</script>

<style scoped>
.register-view {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
  padding: 20px;
}

.register-container {
  width: 100%;
  max-width: 400px;
  background: rgba(15, 23, 42, 0.9);
  border-radius: 12px;
  padding: 32px;
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.register-header {
  text-align: center;
  margin-bottom: 32px;
}

.register-header h1 {
  color: #f8fafc;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 8px;
}

.register-header p {
  color: #94a3b8;
  font-size: 16px;
}

.debug-notice {
  margin-top: 12px;
  padding: 8px 12px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 6px;
}

.debug-notice small {
  color: #60a5fa;
  font-size: 12px;
}

.register-form {
  margin-bottom: 24px;
}

.register-footer {
  text-align: center;
  margin-bottom: 16px;
}

.register-footer p {
  color: #94a3b8;
  margin-bottom: 8px;
}

.register-footer a {
  color: #3b82f6;
  text-decoration: none;
}

.register-footer a:hover {
  color: #60a5fa;
}
</style>
