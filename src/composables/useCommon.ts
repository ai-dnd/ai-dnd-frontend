import { ref, onMounted, onUnmounted } from 'vue'

export function useAuth() {
  const isLoggedIn = ref(false)
  const user = ref(null)
  
  const checkAuthStatus = () => {
    const token = localStorage.getItem('auth_token')
    isLoggedIn.value = !!token
  }
  
  onMounted(() => {
    checkAuthStatus()
  })
  
  return {
    isLoggedIn,
    user,
    checkAuthStatus
  }
}

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const storedValue = localStorage.getItem(key)
  const value = ref<T>(storedValue ? JSON.parse(storedValue) : defaultValue)
  
  const setValue = (newValue: T) => {
    value.value = newValue
    localStorage.setItem(key, JSON.stringify(newValue))
  }
  
  return [value, setValue] as const
}

export function useTimer(callback: () => void, interval: number) {
  const timer = ref<number | null>(null)
  
  const start = () => {
    if (timer.value) return
    timer.value = setInterval(callback, interval)
  }
  
  const stop = () => {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
  }
  
  onUnmounted(() => {
    stop()
  })
  
  return { start, stop }
}

export function useDebounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
) {
  const timer = ref<number | null>(null)
  
  const debouncedFunc = (...args: Parameters<T>) => {
    if (timer.value) {
      clearTimeout(timer.value)
    }
    
    timer.value = setTimeout(() => {
      func(...args)
    }, delay)
  }
  
  const cancel = () => {
    if (timer.value) {
      clearTimeout(timer.value)
      timer.value = null
    }
  }
  
  onUnmounted(() => {
    cancel()
  })
  
  return { debouncedFunc, cancel }
}
