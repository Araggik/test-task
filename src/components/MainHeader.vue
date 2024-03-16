<script setup lang="ts">
import { useRouter } from 'vue-router';

import { userService } from '../services/user';

import logoutImageUrl from '../assets/logout.svg';

const router = useRouter();

function logout() {
    userService.logout();
    router.push('/login');
}
</script>

<template>
    <header class="main-header">
        <div class="user-container">
            <div clas="user-login">{{ userService.userLogin }}</div>
            <input type="image" :src="logoutImageUrl" @click="logout"
                alt="" title="Выход"
            >
        </div>
    </header>
</template>

<style>
.main-header {
    display: flex;
    justify-content: flex-end;

    padding: 0.8rem;

    background-color: rgb(158, 158, 158);
}

.user-container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 12rem;

    padding: 0.5rem;

    background-color: white;

    border: 2px solid black;
    border-radius: 0.5rem;
}

.user-login {
    width: 9rem;

    overflow-x: hidden;
    text-overflow: ellipsis;
}
</style>