<template>
  <div class="py-3 bg-white w-full shadow shadow-md fixed top-[68px]">
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
            min="0"
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
            class="text-black text-3xl hover:(text-orange-500) focus:(text-orange-500) palette relative shadow shadow-md"
            aria-label="Выбор цвета обводки"
          >
            <!-- <div
            ref="palette"
              class="i-bi-palette-fill"
              :style="`background: ${strokeColor}`"
            ></div> -->
            <i
              ref="palette"
              class="bi-palette-fill"
              :style="`background: -webkit-linear-gradient(
        -45deg,
        ${strokeColor},
        ${strokeColor}
      ); -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;`"
            ></i>
            <input
              v-model="strokeColor"
              class="absolute appearance-none visibility-hidden opacity-0 bg-tranparent inset-0 z-1 w-[30px] h-[30px] cursor-pointer"
              type="color"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

import { useToolStore } from '@/stores/toolStore';

const toolStore = useToolStore();

const strokeWidth = ref(1);
const strokeColor = ref('');

watchEffect(() => {
  if (strokeColor.value) {
    toolStore.setStrokeColor(strokeColor.value);
  }

  if (strokeWidth.value) {
    toolStore.setLineWidth(+strokeWidth.value);
  }
});
</script>

<style scoped lang="scss">
.palette {
  // -webkit-background-clip: text;
  // -webkit
  // -webkit-text-fill-color: red;
  // @apply bg-transparent !text-transparent hover:(text-orange-500)
  @apply relative shadow shadow-md;

  & > i {
    // color: transparent;
    background: -webkit-linear-gradient(
      -45deg,
      rgb(210, 33, 250),
      rgb(35, 215, 206)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &:hover {
    & > div {
      background: orange;
    }
  }

  input[type='color'] {
    @apply absolute appearance-none visibility-hidden opacity-0 bg-tranparent inset-0 z-1 w-[30px] h-[30px] cursor-pointer;
  }
}
</style>
