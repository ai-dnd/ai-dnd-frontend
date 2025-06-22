<template>
  <nav class="bottom-nav">
    <div class="nav-content">
      <button 
        v-for="item in navItems" 
        :key="item.id"
        :class="['nav-item', { active: activeTab === item.id }]"
        @click="$emit('tab-change', item.id)"
      >
        <component :is="item.icon" class="nav-icon" />
        <span class="nav-label">{{ item.label }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { 
  BookOpenIcon,
  UserIcon,
  GlobeAltIcon
} from '@heroicons/vue/24/outline'

export interface NavItem {
  id: string
  label: string
  icon: any
}

const navItems: NavItem[] = [
  { id: 'story', label: '故事', icon: BookOpenIcon },
  { id: 'character', label: '角色', icon: UserIcon },
  { id: 'world', label: '世界', icon: GlobeAltIcon }
]

defineProps<{
  activeTab: string
}>()

defineEmits<{
  'tab-change': [tabId: string]
}>()
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
  background: rgba(30, 41, 59, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  pointer-events: auto;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #94a3b8;
}

.nav-item:hover {
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
}

.nav-item.active {
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
}

.nav-icon {
  width: 20px;
  height: 20px;
}

.nav-label {
  font-size: 11px;
  font-weight: 500;
}
</style>
