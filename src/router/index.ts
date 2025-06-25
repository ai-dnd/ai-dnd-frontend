import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores'

// 路由组件
import GameView from '../views/GameView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  {
    path: '/',
    name: 'game',
    component: GameView,
    meta: { requiresAuth: true },
    redirect: '/story',
    children: [
      {
        path: 'story',
        name: 'story',
        component: () => import('../views/game/StoryView.vue')
      },
      {
        path: 'world-chat',
        name: 'world-chat',
        component: () => import('../views/game/WorldChatView.vue')
      },
      {
        path: 'character',
        name: 'character',
        component: () => import('../views/game/CharacterView.vue')
      },
      {
        path: 'world',
        name: 'world',
        component: () => import('../views/game/WorldInfoView.vue')
      }
    ]
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
