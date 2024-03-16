<script setup lang="ts">
import { useRouter } from 'vue-router';

import { userService } from '../services/user';

const router = useRouter();

function logout() {
  userService.logout();

  router.push('/login');
}
</script>

<template>
  <div>
    <input type="button" value="logout1" @click="logout">
  </div>
</template>

<style scoped>
</style>