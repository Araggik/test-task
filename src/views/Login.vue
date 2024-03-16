<script setup lang="ts">
import UserForm from '../components/UserForm.vue';
</script>

<template>
  <div>
    <main class="login-main">
      <UserForm></UserForm>
    </main>
  </div>
</template>

<style scoped>
.login-main {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
}
</style>