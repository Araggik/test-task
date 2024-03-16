<script setup lang="ts">
import { ref, shallowRef } from 'vue';

import { dialogService } from '../services/dialog.ts';


const isVisible = ref(false);

const innerComponent = shallowRef<any>(null);

const innerComponentProps = ref<any>(null);

dialogService.linkComponent(
    isVisible, 
    innerComponent, 
    innerComponentProps
);


const layoutElement = ref<Element | null>(null);

function onLayoutClick(event: PointerEvent) {
    if (event.target == layoutElement.value) {
        isVisible.value = false;
    }
}
</script>

<template>
    <div ref="layoutElement" v-if="isVisible && innerComponent" 
        @pointerdown="onLayoutClick" class="dialog-layout"
    >
        <component :is="innerComponent"  v-bind="innerComponentProps"></component>
    </div>
</template>

<style scoped>
.dialog-layout {
    position: fixed;
    left: 0;
    top: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 100vh;
    width: 100vw;

    background-color: rgba(128, 128, 128, 0.5);
}
</style>