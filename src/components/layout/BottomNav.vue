<template>
  <div class="bottom-nav">
    <div class="nav-container">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="nav-item"
        :class="{ active: activeTab === tab.id }"
        @click="handleTabChange(tab.id)"
      >
        <component :is="tab.icon" class="nav-icon" />
        <span class="nav-label">{{ tab.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  HomeOutlined,
  CommentOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";

interface Props {
  activeTab: string;
}

interface Emits {
  (e: "tab-change", tabId: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const tabs = [
  {
    id: "home",
    label: "首页",
    icon: HomeOutlined,
  },
  {
    id: "discover",
    label: "发现",
    icon: CommentOutlined,
  },
  {
    id: "schedule",
    label: "预约",
    icon: CalendarOutlined,
  },
  {
    id: "profile",
    label: "我的",
    icon: UserOutlined,
  },
];

const handleTabChange = (tabId: string) => {
  emit("tab-change", tabId);
};
</script>

<style scoped>
.bottom-nav {
  background: white;
  border-top: 1px solid #f0f0f0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.nav-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 0;
  max-width: 600px;
  margin: 0 auto;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 8px;
  min-width: 60px;
}

.nav-item:hover {
  background: #f5f5f5;
}

.nav-item.active {
  color: #1890ff;
}

.nav-item.active .nav-icon {
  color: #1890ff;
}

.nav-icon {
  font-size: 20px;
  margin-bottom: 2px;
  color: #8c8c8c;
  transition: color 0.2s ease;
}

.nav-item.active .nav-icon {
  color: #1890ff;
}

.nav-label {
  font-size: 12px;
  color: #8c8c8c;
  transition: color 0.2s ease;
}

.nav-item.active .nav-label {
  color: #1890ff;
  font-weight: 500;
}
</style>
