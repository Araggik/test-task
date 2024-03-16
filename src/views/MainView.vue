<script setup lang="ts">
import MainHeader from '../components/MainHeader.vue';
</script>

<template>
  <div class="main-view">
      <MainHeader></MainHeader>
      <main></main>
  </div>
</template>

<style scoped>
.main-view {
  display: flex;
  flex-direction: column;
}
</style>