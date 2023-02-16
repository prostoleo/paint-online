<template>
  <div class="container h-screen flex items-center justify-center">
    <canvas
      ref="canvasEl"
      class="bg-white w-full border border-dark-900 mt-24 touch-none"
      style="width: 900px; height: 700px"
      width="900"
      height="700"
      @pointerdown="mouseDownHandler"
    />
    <!-- @mousedown="mouseDownHandler" -->
    <!-- style="aspect-ratio: 4/3" -->
    <!-- max-h-[680px] -->
    <a id="link"></a>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect, type Ref } from 'vue';

import { useCanvasStore } from '@/stores/canvasStore';

const canvasStore = useCanvasStore();

const canvasEl = ref(null) as Ref<HTMLCanvasElement | null>;

onMounted(() => {
  if (canvasEl.value) {
    canvasStore.setCanvas(canvasEl.value);
  }
});

function mouseDownHandler() {
  if (canvasEl.value) {
    canvasStore.addToUndolist(canvasEl.value.toDataURL());
  }
}
</script>

<style scoped lang="scss"></style>
