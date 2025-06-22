<template>
  <div class="profile-view">
    <div class="profile-container">
      <div class="profile-header">
        <div class="avatar-section">
          <a-avatar :size="80" :src="authStore.user?.avatar">
            {{ authStore.user?.username?.charAt(0).toUpperCase() }}
          </a-avatar>
          <h2>{{ authStore.user?.username }}</h2>
          <p>{{ authStore.user?.email }}</p>
        </div>
      </div>
      
      <div class="profile-content">
        <a-card title="个人信息" class="info-card">
          <a-descriptions :column="1">
            <a-descriptions-item label="用户名">
              {{ authStore.user?.username }}
            </a-descriptions-item>
            <a-descriptions-item label="邮箱">
              {{ authStore.user?.email }}
            </a-descriptions-item>
            <a-descriptions-item label="注册时间">
              {{ formatDate(authStore.user?.createdAt) }}
            </a-descriptions-item>
            <a-descriptions-item label="最后登录">
              {{ formatDate(authStore.user?.lastLoginAt) }}
            </a-descriptions-item>
          </a-descriptions>
        </a-card>
        
        <a-card title="游戏统计" class="stats-card">
          <a-descriptions :column="1">
            <a-descriptions-item label="等级">
              {{ gameStore.gameState.playerLevel }}
            </a-descriptions-item>
            <a-descriptions-item label="经验值">
              {{ gameStore.gameState.playerExperience }}
            </a-descriptions-item>
            <a-descriptions-item label="生命值">
              {{ gameStore.gameState.playerHealth }}
            </a-descriptions-item>
            <a-descriptions-item label="魔法值">
              {{ gameStore.gameState.playerMana }}
            </a-descriptions-item>
          </a-descriptions>
        </a-card>
        
        <a-card title="操作" class="actions-card">
          <a-space direction="vertical" style="width: 100%">
            <a-button type="primary" block @click="refreshProfile">
              刷新个人信息
            </a-button>
            <a-button block @click="resetGame">
              重置游戏进度
            </a-button>
            <a-button type="primary" danger block @click="handleLogout">
              退出登录
            </a-button>
          </a-space>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { message, Modal } from 'ant-design-vue'
import { useAuthStore, useGameStore } from '../stores'

const router = useRouter()
const authStore = useAuthStore()
const gameStore = useGameStore()

const formatDate = (dateString?: string) => {
  if (!dateString) return '暂无'
  return new Date(dateString).toLocaleDateString('zh-CN')
}

const refreshProfile = async () => {
  try {
    await authStore.fetchCurrentUser()
    message.success('个人信息已刷新')
  } catch (error) {
    message.error('刷新失败')
  }
}

const resetGame = () => {
  Modal.confirm({
    title: '确认重置',
    content: '确定要重置游戏进度吗？此操作无法撤销。',
    onOk() {
      gameStore.resetGame()
      message.success('游戏进度已重置')
    }
  })
}

const handleLogout = () => {
  Modal.confirm({
    title: '确认退出',
    content: '确定要退出登录吗？',
    async onOk() {
      try {
        await authStore.logout()
        message.success('已退出登录')
        router.push('/login')
      } catch (error) {
        message.error('退出失败')
      }
    }
  })
}
</script>

<style scoped>
.profile-view {
  height: 100vh;
  overflow-y: auto;
  background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
  padding: 20px;
}

.profile-container {
  max-width: 600px;
  margin: 0 auto;
}

.profile-header {
  background: rgba(15, 23, 42, 0.9);
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  margin-bottom: 20px;
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.avatar-section h2 {
  color: #f8fafc;
  margin: 16px 0 8px;
}

.avatar-section p {
  color: #94a3b8;
  margin: 0;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-card, .stats-card, .actions-card {
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.2);
}

:deep(.ant-card-head-title) {
  color: #f8fafc;
}

:deep(.ant-descriptions-item-label) {
  color: #94a3b8;
}

:deep(.ant-descriptions-item-content) {
  color: #f8fafc;
}

@media (max-width: 768px) {
  .profile-view {
    padding: 10px;
  }
  
  .profile-header {
    padding: 20px;
  }
}
</style>
