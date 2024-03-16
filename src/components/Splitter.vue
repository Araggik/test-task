<script setup lang="ts">
import { ref } from 'vue';

const storageKey = 'splitterWidth';

let isStartDrag = false;

let x = 0;

const width = ref(receiveWidth());

const flexContainer = ref<Element | null>(null);

const minWidth = 0.2;

function startDrag(event: PointerEvent) {
    const node = event.target;

    if (node instanceof Element) {
        isStartDrag = true;

        node.setPointerCapture(event.pointerId);

        x = event.clientX;

        const handler = () => {
          isStartDrag = false;

          saveWidth();

          node.removeEventListener("lostpointercapture", handler);
        };

        node.addEventListener("lostpointercapture", handler);
    }
}

function moveDrag(event: PointerEvent) {
    if (isStartDrag) {
      const node = event.target;
      
      if (node instanceof Element) {
        const containerWidth = flexContainer.value!.clientWidth;

        const newWidth = ((containerWidth * width.value) + event.clientX - x) / containerWidth;

        if (newWidth >= minWidth && newWidth <= (1 - minWidth)) {
            width.value = newWidth;

            x = event.clientX;
        }
      }
    }
}

function saveWidth() {
    localStorage.setItem(storageKey, width.value.toString());
}

function receiveWidth() {
    const widthStr = localStorage.getItem(storageKey);

    return widthStr ? Number(widthStr) : 0.5;
}
</script>

<template>
    <div class="flex-container" ref="flexContainer">
      <div class="flex-element" :style="{width: `${width * 100}%`}">

      </div>
      <div class="separator" @pointerdown="startDrag" @pointermove="moveDrag">

      </div>
      <div class="flex-element flex-end">

      </div>
    </div>
</template>

<style scoped>
.flex-container {
  display: flex;
  align-items: stretch;

  width: 100%;

  padding: 0.5rem;
}

.separator {
  width: 1rem;

  cursor: col-resize;
}

.flex-end {
  flex-grow: 1;
}

.flex-element {
    border: 2px solid black;
    border-radius: 0.5rem;

    overflow: auto;
}
</style>
