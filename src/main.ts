import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import './style.css'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores'

// 环境配置检查
const environment = import.meta.env.MODE
const apiUrl = import.meta.env.VITE_API_BASE_URL
const isDev = import.meta.env.VITE_DEV_MODE === 'true'

console.log(`🌍 当前环境: ${environment}`)
console.log(`📡 API地址: ${apiUrl}`)
console.log(`🔧 开发模式: ${isDev ? '开启' : '关闭'}`)

// 开发环境下显示环境信息
if (isDev) {
  console.table({
    '环境': environment,
    'API地址': apiUrl,
    '应用标题': import.meta.env.VITE_APP_TITLE,
    '版本': import.meta.env.VITE_APP_VERSION,
    '模拟API': import.meta.env.VITE_MOCK_API
  })
}

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Antd)

// 初始化认证状态
const authStore = useAuthStore()
authStore.initialize()

app.mount('#app')
