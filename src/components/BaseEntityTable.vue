<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';

import { BaseEntity } from '../entities/base-entity';

import BaseEntityMenu from './BaseEntityMenu.vue';

const props = defineProps<{
    entity: BaseEntity
}>();

const emit = defineEmits<{
    (e: 'openEntityMenu', value: {entity: BaseEntity, event: MouseEvent}): void,
}>();

const entityFields = receiveEntityFields();

const menuEntity = ref<BaseEntity | undefined>(undefined);

const x = ref(0);

const y = ref(0);

listenClick();

function receiveEntityFields() {
    const constructor = props.entity!.constructor as typeof BaseEntity;

    const fields = constructor.childConstructor.entityFields;

    return fields;
}

function onContextMenu(event: MouseEvent, entity: BaseEntity) {
    x.value = event.clientX;
    y.value = event.clientY;
    menuEntity.value = entity;
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
    <div class="div">
        <table class="table">
            <colgroup>
                <col v-for="_ in entityFields" class="col">
            </colgroup>
            <thead>
                <tr>
                    <th v-for="field in entityFields" scope="col">
                        {{ field.label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="el in entity.childrenMap" @contextmenu.prevent.stop="onContextMenu($event, el)"
                    class="tr"
                >
                    <td v-for="field in entityFields" class="td">
                        {{ el.fieldValues[field.label] }}
                    </td>
                </tr>
            </tbody>
            <BaseEntityMenu v-if="menuEntity" :entity="menuEntity" :parent="props.entity"
                :x="x" :y="y"
            >
            </BaseEntityMenu>
        </table>
    </div>
</template>

<style scoped>
table, th, td {
    border: 2px solid black;
}

.div {
    display: flex;
}

.table {
    flex-shrink: 0;

    border-collapse: collapse;
}

.col {
    width: 8rem;
}

.tr:hover {
    cursor: pointer;

    background-color: rgb(158, 158, 158);
}

.td {
    padding: 0.2rem;

    overflow-x: hidden;
    text-overflow: ellipsis;
}
</style>