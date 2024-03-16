<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function goToHome() {
  router.push('/');
}
</script>

<template>
  <div class="notification-container">
    <main class="notification">
      <header class="notification-header">
        Страница не найдена
      </header>
      <input type="button" value="Вернуться домой" @click="goToHome"
        class="notification-button"
      >
    </main>
  </div>
</template>

<style scoped>
.notification-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.notification {
  display: flex;
  flex-direction: column;
  align-items: stretch;

  width: 20rem;

  padding: 0.5rem;

  border: 2px solid black;
  border-radius: 0.5rem;
}

.notification-header {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
}

.notification-button {
  height: 2rem;
}
</style>