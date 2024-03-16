<script setup lang="ts">
import { ref, watch } from 'vue';

import { notificationService } from '../services/notification';

const currentText = ref<string>('');

const interval = notificationService.notificationInterval - 10;

const notificationStyle = {
    animationDuration: `${interval / 2}ms`
};

watch(currentText, (newValue) => {
    if (newValue) {
        setTimeout(()=>currentText.value = '', interval);
    }
});

notificationService.linkComponent(currentText);
</script>

<template>
    <div v-if="currentText" :style="notificationStyle" class="notification">
        {{ currentText }}
    </div>
</template>

<style scoped>
.notification {
    position: fixed;
    bottom: 0.5rem;

    width: 12rem;

    padding: 0.4rem;

    border: 2px solid black;
    border-radius: 0.5rem;

    text-align: center;

    animation-name: show-hide;
    animation-iteration-count: 2;
    animation-direction: alternate;
}

@keyframes show-hide {
    0% {
        bottom: 0.5rem;
        opacity: 0.4;
    }

    60% {
        bottom: 3rem;
        opacity: 1;
    }

    100% {
        bottom: 3rem;
    }
}
</style>