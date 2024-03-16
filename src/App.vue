<script setup lang="ts">
import Dialog from './components/Dialog.vue';
import Notification from './components/Notification.vue';
</script>

<template>
  <div class="app">
    <RouterView class="view"></RouterView>
    <Dialog></Dialog>
    <Notification></Notification>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.app, .view {
  height: 100%;
  width: 100%;
}
</style>
