<script setup lang="ts">
import { Project } from '../entities/project.ts';
import { BaseEntity } from '../entities/base-entity.ts';

import { ref } from 'vue';

import BaseEntityTable from './BaseEntityTable.vue';
import BaseEntityTree from './BaseEntityTree.vue';
import ProjectToolBar from './ProjectToolBar.vue';
import Splitter from './Splitter.vue';

const project = ref(Project.loadProject());

const tableEntity = ref<BaseEntity| undefined>(undefined);

function openTable(value: BaseEntity | undefined) {
    tableEntity.value = value;
}
</script>

<template>
    <div class="project-container">
        <ProjectToolBar :project="project"></ProjectToolBar>
        <Splitter class="splitter">
            <template #start>
                <BaseEntityTree :entity="project" @open-table="openTable"></BaseEntityTree>
            </template>
            <template #end>
                <BaseEntityTable v-if="tableEntity" :entity="tableEntity">
                </BaseEntityTable>
            </template>
        </Splitter>
    </div>
</template>

<style scoped>
.project-container {
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  padding: 0.5rem;  
}

.splitter {
    flex-grow: 1;
}
</style>