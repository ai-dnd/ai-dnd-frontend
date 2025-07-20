<template>
 
  <div class="login-view">
    <div class="login-container">      <div class="login-header">
        <h1>Chronicle Zero: 零号编年史</h1>
        <p>欢迎回到冒险世界</p>
        <div class="debug-notice">
          <small>🔧 调试模式：任意用户名密码都可登录</small>
        </div>
      </div>
      
      <a-form
        :model="form"
        :rules="rules"
        @finish="onSubmit"
        layout="vertical"
        class="login-form"
      >
        <a-form-item label="用户名" name="username">
          <a-input 
            v-model:value="form.username" 
            placeholder="请输入用户名"
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
        
        <a-form-item>
          <a-button 
            type="primary" 
            html-type="submit" 
            :loading="authStore.isLoading"
            block
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
      
      <div class="login-footer">
        <p>还没有账号？</p>
        <router-link to="/register">立即注册</router-link>
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
import type { LoginCredentials } from '../types'
import { useChatStore } from '@/stores/chat'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive<LoginCredentials>({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度应为3-20个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为6个字符', trigger: 'blur' }
  ]
}

const onSubmit = async () => {
  try {
    const documentID = useChatStore().currentDocumentId
    if (!documentID) {
      return
    }
    await authStore.login(form,documentID)
    message.success('登录成功')
    router.push('/story')
  } catch (error) {
    console.error('登录失败:', error)
  }
}

const clearError = () => {
  authStore.error = null
}
</script>

<style scoped>
.login-view {
  height: 100vh;
  width: 425px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.login-container {
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 32px;
  border: 1px solid rgba(229, 231, 235, 0.8);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-header h1 {
  color: #1e293b;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 8px;
}

.login-header p {
  color: #64748b;
  font-size: 16px;
}

.debug-notice {
  margin-top: 12px;
  padding: 8px 12px;
  background: rgba(219, 234, 254, 0.8);
  border: 1px solid rgba(59, 130, 246, 0.4);
  border-radius: 6px;
}

.debug-notice small {
  color: #2563eb;
  font-size: 12px;
}

.login-form {
  margin-bottom: 24px;
}

.login-footer {
  text-align: center;
  margin-bottom: 16px;
}

.login-footer p {
  color: #64748b;
  margin-bottom: 8px;
}

.login-footer a {
  color: #3b82f6;
  text-decoration: none;
}

.login-footer a:hover {
  color: #60a5fa;
}

/* Alert 组件自定义样式 */
:deep(.ant-alert.ant-alert-error) {
  background-color: rgba(254, 226, 226, 0.8);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #dc2626;
}

:deep(.ant-alert.ant-alert-error .ant-alert-message) {
  color: #dc2626;
}

:deep(.ant-alert.ant-alert-error .ant-alert-icon) {
  color: #ef4444;
}

:deep(.ant-alert.ant-alert-error .ant-alert-close-icon) {
  color: #ef4444;
}

:deep(.ant-alert.ant-alert-error .ant-alert-close-icon:hover) {
  color: #dc2626;
}
</style>
