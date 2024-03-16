<script setup lang="ts">
import MainHeader from '../components/MainHeader.vue';

import Splitter from '../components/Splitter.vue';
</script>

<template>
  <div class="main-view">
      <MainHeader></MainHeader>
      <main class="main-content">
        <Splitter></Splitter>
      </main>
  </div>
</template>

<style scoped>
.main-view {
  display: flex;
  flex-direction: column;
}

.main-content {
  flex-grow: 1;

  display: flex;
  align-items: stretch;
}
</style>