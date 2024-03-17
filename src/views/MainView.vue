<script setup lang="ts">
import MainHeader from '../components/MainHeader.vue';

import ProjectContainer from '../components/ProjectContainer.vue';
</script>

<template>
  <div class="main-view">
      <MainHeader></MainHeader>
      <main class="main-content">
        <ProjectContainer></ProjectContainer>
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
  flex-direction: column;
  align-items: stretch;
}
</style>