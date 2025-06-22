<template>
  <nav class="bottom-nav">
    <div class="nav-content">
      <a-segmented
        v-model:value="selectedTab"
        :options="navItems"
        class="nav-segmented"
        @change="handleTabChange"
      >
        <template #label="{ title, value }">
          <a-space direction="vertical" :size="2" align="center">
            <component :is="getNavIcon(value)" class="nav-icon" />
            <span class="nav-label">{{ title }}</span>
          </a-space>
        </template>
      </a-segmented>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { 
  ReadOutlined,
  UserOutlined,
  GlobalOutlined
} from '@ant-design/icons-vue'

export interface NavItem {
  value: string
  title: string
  icon: any
}

const navItems: NavItem[] = [
  { value: 'story', title: '故事', icon: ReadOutlined },
  { value: 'character', title: '角色', icon: UserOutlined },
  { value: 'world', title: '世界', icon: GlobalOutlined }
]

const iconMap = {
  'story': ReadOutlined,
  'character': UserOutlined,
  'world': GlobalOutlined
}

const getNavIcon = (value: string) => {
  return iconMap[value as keyof typeof iconMap] || ReadOutlined
}

const props = defineProps<{
  activeTab: string
}>()

const emit = defineEmits<{
  'tab-change': [tabId: string]
}>()

const selectedTab = ref(props.activeTab)

watch(() => props.activeTab, (newTab) => {
  selectedTab.value = newTab
})

const handleTabChange = (value: string) => {
  emit('tab-change', value)
}
</script>

<style scoped>
.bottom-nav {
  position: absolute;
  bottom: 80px;
  left: 0;
  right: 0;
  padding: 0 20px;
  pointer-events: none;
}

.nav-content {
  display: flex;
  justify-content: center;
  pointer-events: auto;
}

.nav-segmented {
  background: rgba(30, 41, 59, 0.9) !important;
  backdrop-filter: blur(20px);
  border-radius: 20px !important;
  border: 1px solid rgba(148, 163, 184, 0.2) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: 4px !important;
}

:deep(.ant-segmented-item) {
  padding: 8px 16px !important;
  color: #94a3b8 !important;
  background: transparent !important;
  border: none !important;
}

:deep(.ant-segmented-item-selected) {
  background: rgba(59, 130, 246, 0.2) !important;
  color: #60a5fa !important;
}

:deep(.ant-segmented-item:hover) {
  background: rgba(59, 130, 246, 0.1) !important;
  color: #60a5fa !important;
}

.nav-icon {
  font-size: 18px;
}

.nav-label {
  font-size: 11px;
  font-weight: 500;
}
</style>
