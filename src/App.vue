<template>
  <ConfigProvider>
    <div id="app-container">
      <router-view />
    </div>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from "ant-design-vue";
</script>

<style scoped>
#app-container {
  height: 100vh;
  width: 425px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}
</style>
