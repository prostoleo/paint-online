<template>
  <div class="py-4 bg-white w-full border-b border-b-2 fixed top-0 z-5">
    <div class="container flex items-center gap-3">
      <button
        class="btn brush"
        aria-label="Кисть"
        :class="{ active: toolStore.toolName === 'brush' }"
        @click="
          toolStore.setTool(
            new Brush(canvasStore.getCanvas as HTMLCanvasElement),
            'brush'
          )
        "
      >
        <i class="bi-brush-fill"></i>
        <!-- <div class="i-bi-brush-fill"></div> -->
      </button>
      <button
        class="btn rect"
        btn
        aria-label="Прямоугольник"
        :class="{ active: toolStore.toolName === 'rect' }"
        @click="
          toolStore.setTool(
            new Rect(canvasStore.getCanvas as HTMLCanvasElement),
            'rect'
          )
        "
      >
        <i class="bi-square-fill"></i>
        <!-- <div class="i-bi-square-fill"></div> -->
      </button>
      <button
        class="btn circle"
        aria-label="Круг"
        :class="{ active: toolStore.toolName === 'circle' }"
        @click="
          toolStore.setTool(
            new Circle(canvasStore.getCanvas as HTMLCanvasElement),
            'circle'
          )
        "
      >
        <i class="bi-circle-fill"></i>
        <!-- <div class="i-bi-circle-fill"></div> -->
      </button>
      <button
        class="btn eraser"
        aria-label="Ластик"
        :class="{ active: toolStore.toolName === 'eraser' }"
        @click="
          toolStore.setTool(
            new Eraser(canvasStore.getCanvas as HTMLCanvasElement),
            'eraser'
          )
        "
      >
        <i class="bi-eraser-fill"></i>
        <!-- <div class="i-bi-eraser-fill"></div> -->
      </button>
      <button
        class="btn line"
        aria-label="Линия"
        :class="{ active: toolStore.toolName === 'line' }"
        @click="
          toolStore.setTool(
            new Line(canvasStore.getCanvas as HTMLCanvasElement),
            'line'
          )
        "
      >
        <div></div>
        <!-- <i class="bi-square-fill"></i> -->
        <!-- <div class="i-ci-line-xl"></div> -->
      </button>
      <button class="btn palette" aria-label="Выбор цвета заливки">
        <i
          class="bi-palette-fill"
          :style="`background: -webkit-linear-gradient(
        -45deg,
        ${fillColor},
        ${fillColor}
      ); -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;`"
        ></i>
        <!-- <div
          ref="palette"
          class="i-bi-palette-fill"
          :style="`background: ${fillColor}`"
        ></div> -->
        <input v-model="fillColor" class="" type="color" />
      </button>

      <button
        class="btn undo"
        aria-label="Шаг назад"
        :disabled="!canvasStore.isUndoActive"
        @click="canvasStore.undoAction()"
      >
        <!-- <div class="i-bi-arrow-left"></div> -->
        <i class="bi-arrow-90deg-left"></i>
        <!-- <div class="i-bi-arrow-90deg-left"></div> -->
      </button>
      <button
        class="btn redo"
        aria-label="Шаг вперед"
        :disabled="!canvasStore.isRedoActive"
        @click="canvasStore.redoAction()"
      >
        <!-- <div class="i-bi-arrow-right"></div> -->
        <i class="bi-arrow-90deg-right"></i>
        <!-- <div class="i-bi-arrow-90deg-right"></div> -->
      </button>
      <button
        class="btn save"
        aria-label="Сохранить"
        @click="canvasStore.saveImage()"
      >
        <i class="bi-save-fill"></i>
        <!-- <div class="i-bi-save-fill" /> -->
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

import { useToolStore } from '@/stores/toolStore';
import { useCanvasStore } from '@/stores/canvasStore';
import { Brush } from '@/tools/Brush';
import { Rect } from '@/tools/Rect';
import { Circle } from '@/tools/Circle';
import { Eraser } from '@/tools/Eraser';
import { Line } from '@/tools/Line';

const fillColor = ref('');

const toolStore = useToolStore();
const canvasStore = useCanvasStore();

watchEffect(() => {
  if (fillColor.value) {
    toolStore.setFillColor(fillColor.value);
  }
});
</script>

<style scoped lang="scss">
button.btn {
  @apply overflow-hidden text-black text-3xl hover:(text-orange-500) focus:(text-orange-500);

  &.active {
    @apply outline outline-2 outline-green-500 outline-offset-2;
  }

  &.line {
    @apply block relative w-[30px] h-9;

    div {
      @apply absolute  top-42/100 w-110/100 h-2 transform -rotate-45 z-1 bg-black;
    }

    &:hover > div,
    &:focus > div {
      @apply bg-orange-500;
    }
  }

  &.palette {
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

  &.undo,
  &.redo {
    @apply disabled:(opacity-50);
  }

  &.undo {
    @apply ml-auto;
  }
}
</style>
