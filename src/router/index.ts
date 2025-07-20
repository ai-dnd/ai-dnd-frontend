import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores'

// 路由组件
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/game/ScenarioSelectView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/story',
    name: 'story',
    component: () => import('../views/game/StoryView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/world-chat',
    name: 'world-chat',
    component: () => import('../views/game/WorldChatView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/character',
    name: 'character',
    component: () => import('../views/game/CharacterView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/world',
    name: 'world',
    component: () => import('../views/game/WorldInfoView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { requiresGuest: true }
  },
  {
    path: '/discover',
    name: 'discover',
    component: () => import('../views/DiscoverView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: () => import('../views/ScheduleView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()
  
  // 检查是否需要认证
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      // 尝试验证token
      const isValid = await authStore.validateToken()
      if (!isValid) {
        next('/login')
        return
      }
    }
  }
  
  // 检查是否需要游客状态（如登录、注册页面）
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/')
    return
  }
  
  next()
})

export default router
