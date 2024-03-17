<script setup lang="ts">
import { BaseEntity, BaseEntityField } from '../entities/base-entity';

import BaseEntityMenu from './BaseEntityMenu.vue';

const props = defineProps<{
    entity: BaseEntity
}>();

const emit = defineEmits<{
    (e: 'openEntityMenu', value: {entity: BaseEntity, parent: BaseEntity, event: MouseEvent}): void,
}>();

const entityFields = receiveEntityFields();

function receiveEntityFields() {
    const constructor = props.entity!.constructor as typeof BaseEntity;

    const fields = constructor.childConstructor.entityFields;

    return fields;
}
</script>

<template>
    <table>
        <thead>
            <tr>
                <th v-for="el in entityFields" scope="col">
                    {{ el.label }}
                </th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
</template>

<style scoped>
</style>