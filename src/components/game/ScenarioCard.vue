<template>
  <div class="scenario-card" @click="handleSelect">
    <!-- 背景图片 -->
    <div
      class="card-image"
      :style="{ backgroundImage: `url(${scenario.image})` }"
    >
      <div class="image-overlay"></div>
    </div>

    <!-- 卡片内容 -->
    <div class="card-content">
      <!-- 标题区域 -->
      <div class="title-section">
        <h3 class="scenario-title">{{ scenario.title }}</h3>
        <div class="scenario-tags">
          <span
            v-for="tag in scenario.tags"
            :key="tag"
            class="tag"
            :class="getTagClass(tag)"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- 基本信息 -->
      <div class="info-row">
        <div class="info-item">
          <UserOutlined class="info-icon" />
          <span>{{ scenario.playerCount }}</span>
        </div>
        <div class="info-item">
          <ClockCircleOutlined class="info-icon" />
          <span>{{ scenario.duration }}</span>
        </div>
      </div>

      <!-- 描述文本 -->
      <p class="scenario-description">{{ scenario.description }}</p>

      <!-- 游戏属性 -->
      <div class="attributes">
        <div class="attribute-item">
          <span class="attribute-label">故事背景</span>
          <div class="attribute-value">
            <div class="level-dots">
              <div
                v-for="i in 3"
                :key="i"
                class="dot"
                :class="{
                  active: i <= getBackgroundLevel(scenario.backgroundType),
                }"
              ></div>
            </div>
            <span class="level-text">{{ scenario.rewardDescription }}</span>
          </div>
        </div>

        <div class="attribute-item">
          <span class="attribute-label">推理难度</span>
          <span class="attribute-value-text difficulty">{{
            scenario.difficulty
          }}</span>
        </div>

        <div class="attribute-item">
          <span class="attribute-label">社交互动</span>
          <span class="attribute-value-text social">{{
            scenario.socialActivity
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined, ClockCircleOutlined } from "@ant-design/icons-vue";
import type { Scenario } from "../../types/game";

interface Props {
  scenario: Scenario;
}

interface Emits {
  (e: "select", scenario: Scenario): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleSelect = () => {
  emit("select", props.scenario);
};

const getTagClass = (tag: string) => {
  const tagClasses: Record<string, string> = {
    科幻: "tag-scifi",
    推理: "tag-mystery",
    探险: "tag-adventure",
    奇幻: "tag-fantasy",
  };
  return tagClasses[tag] || "tag-default";
};

const getBackgroundLevel = (type: string) => {
  const levels = { low: 1, medium: 2, high: 3 };
  return levels[type as keyof typeof levels] || 1;
};
</script>

<style scoped>
.scenario-card {
  margin-bottom: 16px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.scenario-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.card-image {
  height: 160px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
}

.card-content {
  padding: 16px;
}

.title-section {
  margin-bottom: 12px;
}

.scenario-title {
  font-size: 18px;
  font-weight: bold;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.scenario-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  color: white;
}

.tag-scifi {
  background: #667eea;
}

.tag-mystery {
  background: #f093fb;
}

.tag-adventure {
  background: #4facfe;
}

.tag-fantasy {
  background: #43e97b;
}

.tag-default {
  background: #8c8c8c;
}

.info-row {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #666;
  font-size: 14px;
}

.info-icon {
  font-size: 14px;
}

.scenario-description {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 16px 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
}

.attributes {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.attribute-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.attribute-label {
  font-size: 12px;
  color: #8c8c8c;
  min-width: 60px;
}

.attribute-value {
  display: flex;
  align-items: center;
  gap: 8px;
}

.level-dots {
  display: flex;
  gap: 4px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #e8e8e8;
  transition: background 0.2s;
}

.dot.active {
  background: #1890ff;
}

.level-text {
  font-size: 12px;
  color: #1890ff;
}

.attribute-value-text {
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
}

.difficulty {
  background: #fff1f0;
  color: #cf1322;
}

.social {
  background: #f0f9ff;
  color: #1890ff;
}
</style>
