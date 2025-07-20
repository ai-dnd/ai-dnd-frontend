<template>
  <div class="scenario-select-view">
    <!-- 搜索栏 -->
    <div class="search-header">
      <div class="search-container">
        <span class="page-title">AI剧本选择</span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索剧本..."
          class="search-input"
        />
        <SearchOutlined class="search-icon" />
      </div>
    </div>

    <!-- 剧本列表 -->
    <div class="scenario-list">
      <ScenarioCard
        v-for="scenario in filteredScenarios"
        :key="scenario.id"
        :scenario="scenario"
        @select="handleScenarioSelect"
      />
    </div>

    <!-- 底部导航 -->
    <BottomNav :active-tab="'home'" @tab-change="handleTabChange" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { SearchOutlined } from "@ant-design/icons-vue";
import ScenarioCard from "../../components/game/ScenarioCard.vue";
import BottomNav from "../../components/layout/BottomNav.vue";
import type { Scenario } from "../../types/game";

const router = useRouter();
const searchQuery = ref("");

// 假数据
const scenarios = ref<Scenario[]>([
  {
    id: 1,
    title: "赛博朋克：数字迷城",
    description:
      "在2077年的新上海，一场关天谋杀案正动在蔓延。玩家将扮演不同身份的数字移民，潜入虚拟交织的迷城，揭开隐藏在数据海洋深处的惊天阴谋。",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    tags: ["科幻", "推理"],
    playerCount: "4-6人",
    duration: "2小时",
    backgroundType: "high",
    rewardDescription: "高",
    storyBackground:
      "白袍科技有着完美的数字平台，而推崇的数据安全组织正在高级研─场改变游戏规则的行动。",
    difficulty: "中等",
    socialActivity: "频繁",
  },
  {
    id: 2,
    title: "金宇塔之谜",
    description:
      "古埃及的神秘金字塔中隐藏着千年的秘密，勇敢的探险家们将深入其中，解开法老的诅咒。",
    image:
      "https://images.unsplash.com/photo-1569165003085-e8a1066f1cb8?w=400&h=300&fit=crop",
    tags: ["探险"],
    playerCount: "3-5人",
    duration: "3小时",
    backgroundType: "medium",
    rewardDescription: "中等",
    storyBackground: "在古老的金字塔深处，埋藏着不为人知的秘密和财富。",
    difficulty: "简单",
    socialActivity: "适中",
  },
  {
    id: 3,
    title: "魔法学院：失落的魔典",
    description:
      "霍格沃茨式的魔法学院中，一本古老的魔典突然失踪，学生们必须联手找回它。",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    tags: ["奇幻"],
    playerCount: "4-8人",
    duration: "4小时",
    backgroundType: "high",
    rewardDescription: "高",
    storyBackground:
      "在魔法学院的图书馆深处，一本记载着禁忌法术的古老魔典神秘消失。",
    difficulty: "困难",
    socialActivity: "频繁",
  },
]);

const filteredScenarios = computed(() => {
  if (!searchQuery.value) {
    return scenarios.value;
  }
  return scenarios.value.filter(
    (scenario) =>
      scenario.title.includes(searchQuery.value) ||
      scenario.description.includes(searchQuery.value) ||
      scenario.tags.some((tag) => tag.includes(searchQuery.value))
  );
});

const handleScenarioSelect = (scenario: Scenario) => {
  console.log("选择剧本:", scenario);
  // TODO: 跳转到剧本详情或开始游戏
};

const handleTabChange = (tabId: string) => {
  console.log("切换标签:", tabId);
  // 实现标签切换逻辑
  const routeMap: Record<string, string> = {
    home: "/",
    discover: "/discover",
    schedule: "/schedule",
    profile: "/profile",
  };

  if (routeMap[tabId]) {
    router.push(routeMap[tabId]);
  }
};
</script>

<style scoped>
.scenario-select-view {
  height: 100%;
  background: #f9fafb;
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px;
  background: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}

.search-container {
  display: flex;
  gap: 8px;
  position: relative;
  align-items: center;
}

.search-input {
  padding: 12px 40px 12px 16px;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  outline: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.search-input::placeholder {
  color: #999;
}

.search-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 18px;
}

.page-title {
  margin: 0;
  white-space: nowrap;
  font-weight: bold;
  text-align: center;
  /* text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); */
}

.scenario-list {
  height: calc(100% - 148px);
  overflow: auto;
  padding: 16px;
}
</style>
