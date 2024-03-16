<script setup lang="ts">
import UserForm from '../components/UserForm.vue';
</script>

<template>
  <div>
    <main class="register-main">
      <UserForm :is-login-form="false"></UserForm>
    </main>
  </div>
</template>

<style scoped>
.register-main {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
}
</style>