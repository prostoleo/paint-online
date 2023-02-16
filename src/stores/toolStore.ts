import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
// import { Tool } from '@/tools/Tool';
import type { Rect } from '@/tools/Rect';
import type { Brush } from '@/tools/Brush';
import type { Circle } from '@/tools/Circle';
import type { Eraser } from '@/tools/Eraser';
import type { Line } from '@/tools/Line';

export type TypeTool = Rect | Brush | Circle | Eraser | Line;

export type TypeToolName =
  | 'brush'
  | 'rect'
  | 'circle'
  | 'eraser'
  | 'line'
  | null;

export const useToolStore = defineStore('tool', () => {
  const tool = ref(null) as Ref<TypeTool | null>;
  const toolName = ref(null) as Ref<TypeToolName>;

  function setTool(newTool: TypeTool, newToolName: TypeToolName) {
    // console.log('newTool: ', newTool);
    tool.value = newTool;
    toolName.value = newToolName;
  }

  function setFillColor(color: string) {
    if (tool.value) {
      tool.value.fillColor = color;
    }
  }
  function setStrokeColor(color: string) {
    if (tool.value) {
      tool.value.strokeColor = color;
    }
  }
  function setLineWidth(width: number) {
    if (tool.value) {
      tool.value.lineWidth = width;
    }
  }

  return {
    tool,
    toolName,
    setTool,
    setFillColor,
    setStrokeColor,
    setLineWidth,
  };
});
