<script setup lang="ts">
import { Ref, ref, computed, onBeforeUnmount } from 'vue';

import { BaseEntity } from '../entities/base-entity';

import arrowDownImageUrl from '../assets/arrow-down.svg';
import BaseEntityMenu from './BaseEntityMenu.vue';

const props = defineProps<{
    entity: BaseEntity,
    parent?: BaseEntity
}>();

const emit = defineEmits<{
    (e: 'openEntityMenu', value: {entity: BaseEntity, parent: BaseEntity, event: MouseEvent}): void,
    (e: 'openTable', value: BaseEntity | undefined): void
}>();

const isChildren = ref(false);

let menuEntity: Ref<BaseEntity | undefined> | undefined = undefined;

let menuParentEntity: Ref<BaseEntity | undefined> | undefined = undefined;    

const x = ref(0);

const y = ref(0);

const isEndNode = checkEndNode();

const entityLabel = receiveEntityLabel();

const entityMainField = computed(() => {
    const constructor = props.entity.constructor as typeof BaseEntity; 

    return props.entity.fieldValues[constructor.entityFields[0].label];
});

const isButton = computed(() => {
    return (props.entity.childrenCount > 0) && 
        !isEndNode;
});

makeRootActions();

function receiveEntityLabel() {
    const constructor = props.entity.constructor as typeof BaseEntity;

    return constructor.entityLabel[0];
}

function checkEndNode() {
    const constructor = props.entity.constructor as typeof BaseEntity;

    const secondConstructor = constructor.childConstructor.childConstructor;

    return secondConstructor == BaseEntity;
}

function toggleChildren() {
    isChildren.value = !isChildren.value;
}

function onContextMenu(event: MouseEvent) {
    if (!props.parent) {
        showMenu(
            props.entity, 
            event.clientX, 
            event.clientY
        );
    } else {
        emit('openEntityMenu', {entity: props.entity, parent: props.parent, event });
    }
}

function onOpenMenu(value: {entity: BaseEntity, parent:BaseEntity, event: MouseEvent}) {
    if (!props.parent) {
        showMenu(
            value.entity, 
            value.event.clientX, 
            value.event.clientY,
            value.parent
        );
    } else {
        emit('openEntityMenu', value);
    }
}

function onClickEndNode() {
    if (isEndNode) {
        emit('openTable', props.entity);
    }
}

function onOpenTable(value: BaseEntity | undefined) {
    emit('openTable', value);
}

function showMenu(entity: BaseEntity, nx: number, ny: number, parent?: BaseEntity) {
    emit('openTable', undefined);

    menuEntity!.value = entity;
    menuParentEntity!.value = parent;
    x.value = nx;
    y.value = ny;
}

function makeRootActions() {
    if (!props.parent) {
       menuEntity = ref<BaseEntity | undefined>(undefined);
       menuParentEntity = ref<BaseEntity | undefined>(undefined);

       listenClick();
    }
}

function listenClick() {
    const listener = () => {
        menuEntity!.value = undefined;
    };

    window.addEventListener('click', listener);

    onBeforeUnmount(() => {
        window.removeEventListener('click', listener);
    })
}
</script>

<template>
    <div>
        <div @contextmenu.prevent="onContextMenu" @click="onClickEndNode"
            class="tree-content" :class="{'tree-content-margin': !isButton}"
        >
            <input v-if="isButton" type="image" :src="arrowDownImageUrl" @click.stop="toggleChildren"
                class="tree-button" :class="{'transform': !isChildren}"
            >
            <div>
                ({{ entityLabel }}) {{ entityMainField }} 
            </div>
        </div>
        <div v-if="isChildren && props.entity.childrenMap" class="tree-children">
            <BaseEntityTree v-for="el in props.entity.childrenMap" :entity="el"
                :parent="props.entity" @open-entity-menu="onOpenMenu"
                @open-table="onOpenTable"
            >
            </BaseEntityTree>
        </div>
        <BaseEntityMenu v-if="menuEntity" :entity="menuEntity!" :parent="menuParentEntity" :x="x" :y="y">
        </BaseEntityMenu>
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

.tree-content-margin {
    margin-left: 0.5rem;
}

.tree-content:hover {
    cursor: pointer;

    background-color: rgb(158, 158, 158);

    border-radius: 0.2rem;
}

.tree-button {
    width: 2rem;

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