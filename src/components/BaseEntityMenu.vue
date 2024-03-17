<script setup lang="ts">
import { BaseEntity } from '../entities/base-entity';

import { dialogService } from '../services/dialog';
import { notificationService } from '../services/notification';

import BaseEntityForm from './BaseEntityForm.vue';

const props = defineProps<{
    x: number,
    y: number,
    entity: BaseEntity,
    parent?: BaseEntity
}>();

const dy = 10;

function add() {
    dialogService.showDialog(BaseEntityForm, {
        isEditForm: false,
        entity: props.entity
    });
}

function edit() {
    dialogService.showDialog(BaseEntityForm, {
        isEditForm: true,
        entity: props.entity
    });
}

function remove() {
    props.parent?.removeChild(props.entity.id!);

    notificationService.showNotification('Объект удален');
}
</script>

<template>
    <menu class="menu" :style="{top: `${y + dy}px`, left: `${x}px`}">
        <li v-if="entity.childrenMap" class="menu-item">
            <input type="button" value="Добавить" @click="add" class="menu-input">
        </li>
        <li class="menu-item">
            <input type="button" value="Изменить" @click="edit" class="menu-input">
        </li>
        <li v-if="props.parent" class="menu-item">
            <input type="button" value="Удалить" @click="remove" class="menu-input">
        </li>
    </menu>
</template>

<style scoped>
.menu {
    position: fixed;

    width: 10rem;
    padding: 0.2rem;

    list-style-type: none;

    background-color: white;

    border: 2px solid black;
    border-radius: 0.1rem;
}

.menu-item {
    display: flex;

    height: 2rem;

    margin-bottom: 0.2rem;
}

.menu-item:last-child {
    margin-bottom: 0rem;
}

.menu-input {
    flex-grow: 1;
}
</style>