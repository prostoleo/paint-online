<template>
  <div class="py-4 bg-white w-full border-b border-b-2 fixed top-0 z-5">
    <div class="container flex items-center gap-3">
      <button
        class="btn brush"
        aria-label="Кисть"
        :class="{ active: toolStore.toolName === 'brush' }"
        @click="setCurrentTool('brush')"
      >
        <IconBrushFill />
        <!-- <i class="bi-brush-fill"></i> -->
        <!-- <div class="i-bi-brush-fill"></div> -->
      </button>
      <button
        class="btn rect"
        btn
        aria-label="Прямоугольник"
        :class="{ active: toolStore.toolName === 'rect' }"
        @click="setCurrentTool('rect')"
      >
        <IconSquareFill />
        <!-- <i class="bi-square-fill"></i> -->
        <!-- <div class="i-bi-square-fill"></div> -->
      </button>
      <button
        class="btn circle"
        aria-label="Круг"
        :class="{ active: toolStore.toolName === 'circle' }"
        @click="setCurrentTool('circle')"
      >
        <IconCircleFill />
        <!-- <i class="bi-circle-fill"></i> -->
        <!-- <div class="i-bi-circle-fill"></div> -->
      </button>
      <button
        class="btn eraser"
        aria-label="Ластик"
        :class="{ active: toolStore.toolName === 'eraser' }"
        @click="setCurrentTool('eraser')"
      >
        <IconEraserFill class="text-4xl" />
        <!-- <i class="bi-eraser-fill"></i> -->
        <!-- <div class="i-bi-eraser-fill"></div> -->
      </button>
      <button
        class="btn line"
        aria-label="Линия"
        :class="{ active: toolStore.toolName === 'line' }"
        @click="setCurrentTool('line')"
      >
        <div></div>
        <!-- <i class="bi-square-fill"></i> -->
        <!-- <div class="i-ci-line-xl"></div> -->
      </button>
      <button class="btn palette" aria-label="Выбор цвета заливки">
        <IconPaletteFill :style="`color: ${fillColor}`" />
        <!-- <i
          class="bi-palette-fill"
          :style="`background: -webkit-linear-gradient(
        -45deg,
        ${fillColor},
        ${fillColor}
      ); -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;`"
        /> -->
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

import { useToolStore, type TypeToolName } from '@/stores/toolStore';
import { useCanvasStore } from '@/stores/canvasStore';
import { Brush } from '@/tools/Brush';
import { Rect } from '@/tools/Rect';
import { Circle } from '@/tools/Circle';
import { Eraser } from '@/tools/Eraser';
import { Line } from '@/tools/Line';

import IconBrushFill from '~icons/bi/brush-fill';
import IconSquareFill from '~icons/bi/square-fill';
import IconCircleFill from '~icons/bi/circle-fill';
import IconEraserFill from '~icons/bi/eraser-fill';
import IconPaletteFill from '~icons/bi/palette-fill';

const fillColor = ref('');

const toolStore = useToolStore();
const canvasStore = useCanvasStore();

function setCurrentTool(tool: TypeToolName) {
  if (!tool) return;

  const canvas = canvasStore.getCanvas;

  if (!canvas) return;

  switch (tool) {
    case 'brush':
      toolStore.setTool(new Brush(canvas), tool);
      break;

    case 'rect':
      toolStore.setTool(new Rect(canvas), tool);
      break;

    case 'circle':
      toolStore.setTool(new Circle(canvas), tool);
      break;

    case 'eraser':
      toolStore.setTool(new Eraser(canvas), tool);
      break;

    case 'line':
      toolStore.setTool(new Line(canvas), tool);
      break;

    default:
      break;
  }
}

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
    @apply block relative w-9 h-12;

    div {
      @apply absolute  top-42/100 w-110/100 h-2 transform -rotate-45 z-1 bg-black;
    }

    &:hover > div,
    &:focus > div {
      @apply bg-orange-500;
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
