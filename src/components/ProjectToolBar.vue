<script setup lang="ts">
import { onBeforeUnmount } from 'vue';

import { Project } from '../entities/project';

import { notificationService } from '../services/notification';

import saveImageUrl from '../assets/save.svg';

const props = defineProps<{
    project: Project
}>();

function saveProject() {
    Project.saveProject(props.project);

    notificationService.showNotification('Проект сохранен');
}

window.addEventListener('keydown', shortcutHandler);

onBeforeUnmount(() => {
    window.removeEventListener('keydown', shortcutHandler);
});

function shortcutHandler(event: KeyboardEvent) {
    if (event.code == 'KeyK' && event.ctrlKey && event.altKey) {
        saveProject();
    }
}
</script>

<template>
    <div class="tool-bar">
        <input type="image" :src="saveImageUrl" @click="saveProject" 
            class="tool" title="Сохранить проект"
        > 
    </div>
</template>

<style scoped>
.tool-bar {
    display: flex;
    justify-content: end;

    height: 2rem;

    padding: 0.2rem;
}

.tool:hover {
    background-color: rgb(158, 158, 158);

    border-radius: 0.2rem;
}
</style>