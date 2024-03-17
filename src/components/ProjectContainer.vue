<script setup lang="ts">
import { Project } from '../entities/project.ts';
import BaseEntityTree from './BaseEntityTree.vue';

import ProjectToolBar from './ProjectToolBar.vue';
import Splitter from './Splitter.vue';

const project = Project.loadProject();
</script>

<template>
    <div class="project-container">
        <ProjectToolBar :project="project"></ProjectToolBar>
        <Splitter class="splitter">
            <template #start>
                <BaseEntityTree :entity="project"></BaseEntityTree>
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