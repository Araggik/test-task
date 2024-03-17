<script setup lang="ts">
import { ref } from 'vue';

import { BaseEntity } from '../entities/base-entity';

import arrowDownImageUrl from '../assets/arrow-down.svg';

const props = defineProps<{
    entity: BaseEntity
}>();

const isChildren = ref(false);

function toggleChildren() {
    isChildren.value = !isChildren.value;
}

function extractEntityMainField() {
    const constructor = props.entity.constructor as typeof BaseEntity; 

    return props.entity.fieldValues[constructor.entityFields[0].label];
}
</script>

<template>
    <div>
        <div class="tree-content">
            <input type="image" :src="arrowDownImageUrl" @click="toggleChildren"
                class="tree-button" :class="{'transform': !isChildren}"
            >
            <div>
                {{ extractEntityMainField() }}
            </div>
        </div>
        <div v-if="isChildren && props.entity.childrenMap" class="tree-children">
            <BaseEntityTree v-for="el in props.entity.childrenMap" :entity="el">
            </BaseEntityTree>
        </div>
    </div>
</template>

<style scoped>
.tree-content {
    display: flex;
    align-items: center;
    
    height: 2rem;
    width: 12rem;

    overflow: hidden;
    text-overflow: ellipsis;
}

.tree-content:hover {
    background-color: rgb(158, 158, 158);

    border-radius: 0.2rem;
}

.tree-button {
    margin-right: 0.2rem;

    border: 2px solid rgba(0, 0, 0, 0);
    border-radius: 0.2rem;
}

.tree-button:hover {
    border: 2px solid black;
    border-radius: 0.2rem;
}

.tree-children {
    margin-left: 0.5rem;
}

.transform {
    transform: rotate(90deg);
}
</style>