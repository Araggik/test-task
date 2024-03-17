<script setup lang="ts">
import { ref } from 'vue';

import { BaseEntity, BaseEntityField, BaseEntityFieldType } from '../entities/base-entity';

import { dialogService } from '../services/dialog';
import { notificationService } from '../services/notification';

const props = defineProps<{
    isEditForm: boolean,
    parent?: BaseEntity,
    entity?: BaseEntity
}>();

const headerText = props.isEditForm ? 'Редактирование' : 'Создание';

const notificationText = props.isEditForm ? 'Объект изменен' : 'Объект создан';

const entityFields = receiveEntityFields();

const errorMap = createErrorMap();

const model = createModel();

function receiveEntityFields() {
    let fields: Array<BaseEntityField> = [];

    if (props.isEditForm) {
        const constructor = props.entity!.constructor as typeof BaseEntity;

        fields =  constructor.entityFields;
    } else {
        const constructor = props.entity!.constructor as typeof BaseEntity;

        fields = constructor.childConstructor.entityFields;
    }

    return fields;
}

function createModel() {
    const model: {[key: string]: any} = {};

    for(let el of entityFields) {
        if (props.isEditForm) {
            model[el.label] = props.entity!.fieldValues[el.label];
        } else {
            model[el.label] = el.type == BaseEntityFieldType.checkbox ?
              true : '';
        }    
    }

    return ref(model);
}

function createErrorMap() {
    const map: {[key: string]: any} = {};

    for(let el of entityFields) {
        map[el.label] = '';  
    }

    return ref(map);
}

function clearErrorText(label: string) {
    errorMap.value[label] = '';
}

function validate() {
    let isValid = true;

    for(let el of entityFields) {
        const isError = !el.validator(model.value[el.label]);

        if (isError) {
            errorMap.value[el.label] = 'Поле не должно быть пустым';

            isValid = false;
        }
    }

    return isValid;
}

function callEntityMethod() {
    if (props.isEditForm) {
        props.entity!.changeFieldValues(model.value);
    } else {
        const constructor = props.entity!.constructor as typeof BaseEntity;

        const childConstructor = constructor.childConstructor;

        const entity = new childConstructor({
            fieldValues: model.value
        });

        props.entity!.addChild(entity);
    }
}

function onSubmit() {
    let isValid = validate();

    if (isValid) {
        callEntityMethod();

        notificationService.showNotification(notificationText);

        dialogService.hideDialog();
    }  
}

function cancel() {
    dialogService.hideDialog();
}
</script>

<template>
    <form class="form-layout" @submit.prevent="onSubmit">
        <div class="form-header">
            <strong>{{ headerText }}</strong>
        </div>
        <div class="form-content">
            <template v-for="el in entityFields">
                <fieldset v-if="el.type == BaseEntityFieldType.input" 
                    class="form-element form-fieldset"
                >
                    <label :for="el.label" class="form-label">{{ el.label }}</label>
                    <input :id="el.label" v-model="model[el.label]" @input="clearErrorText(el.label)"
                        class="form-input" :class="{'form-input-error': errorMap[el.label]}"
                    >
                    <div class="form-error">{{ errorMap[el.label] }}</div>
                </fieldset>
                <div v-else class="form-element form-check-container">
                    <label :for="el.label" class="form-check-label">{{ el.label }}</label>
                    <input :id="el.label" type="checkbox" v-model="model[el.label]"
                        class="form-checkbox"
                    >
                </div>
            </template>
        </div>
        <div class="form-buttons">
            <input type="submit" value="Ок" class="form-button">
            <input type="button" value="Отмена" @click="cancel" class="form-button">
        </div>
    </form>
</template>

<style scoped>
.form-layout {
    width: 20rem;

    padding: 0.5rem;

    border: 2px solid black;
    border-radius: 0.5rem;

    background-color: white;
}

.form-header {
    font-size: 1.5rem;
    text-align: center;

    margin-bottom: 0.5rem;
}

.form-content {
    max-height: 20rem;

    overflow-y: auto;
}

.form-element {
    margin-bottom: 0.5rem;
}   

.form-fieldset {
    border: none;
    padding: 0;
    margin: 0;
}

.form-label {
    display: block;
    font-size: 1.2rem;
}

.form-check-container {
    display: flex;
    align-items: center;
}

.form-check-label {
    font-size: 1.2rem;
}

.form-input {
    width: 100%;
    height: 2rem;
}

.form-checkbox {
    width: 1.2rem;
    height: 1.2rem;
}

.form-input-error {
    border: 1px solid brown;
}

.form-error {
    height: 1rem;
    font-size: 0.9rem;
    color: brown;
}

.form-buttons {
    display: flex;
    justify-content: space-between;
}

.form-button {
    width: 8rem;
    height: 2rem;
}
</style>