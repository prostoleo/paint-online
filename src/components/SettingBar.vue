<template>
  <div class="py-3 bg-white w-full shadow shadow-md fixed top-20">
    <div class="container flex items-center gap-4">
      <div class="flex justify-center">
        <div class="flex items-center gap-3">
          <label
            for="inputLineWidth"
            class="form-label inline-block text-gray-700 flex-grow flex-shrink-0"
            >Толщина линии</label
          >
          <input
            v-model.number="strokeWidth"
            type="number"
            class="form-control block w-full max-w-24 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="inputLineWidth"
            min="1"
            placeholder="Толщина линии"
          />
        </div>
      </div>
      <div class="flex justify-center">
        <div class="flex items-center gap-3">
          <label
            for="inputLineWidth"
            class="form-label inline-block text-gray-700 flex-grow flex-shrink-0"
            >Цвет обводки</label
          >
          <button
            class="palette text-black text-3xl hover:(text-orange-500) focus:(text-orange-500) relative"
            aria-label="Выбор цвета обводки"
          >
            <IconPaletteFill :style="`color: ${strokeColor}`" />

            <input v-model="strokeColor" type="color" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconPaletteFill from '~icons/bi/palette-fill';
import { ref, watchEffect } from 'vue';

import { useToolStore } from '@/stores/toolStore';

const toolStore = useToolStore();

const strokeWidth = ref(1);
const strokeColor = ref('');

watchEffect(() => {
  if (strokeColor.value) {
    toolStore.setStrokeColor(strokeColor.value);
  }

  /* if (strokeWidth.value !== null && strokeWidth.value !== undefined) {
    toolStore.setLineWidth(+strokeWidth.value);
  } */

  toolStore.setLineWidth(+strokeWidth.value);
});
</script>

<style scoped lang="scss"></style>
