import { computed, ref, unref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { useToolStore, type TypeToolName } from './toolStore';
import { MyWebSocket } from '@/ws/websocket';
import { Brush } from '@/tools/Brush';
import { Rect } from '@/tools/Rect';
// import { Tool } from '@/tools/Tool';

export const useCanvasStore = defineStore('canvas', () => {
  const toolStore = useToolStore();

  //* canvas
  const canvas = ref(null) as Ref<HTMLCanvasElement | null>;

  const getCanvas = computed(() => canvas.value);

  function setCanvas(newCanvas: HTMLCanvasElement) {
    canvas.value = newCanvas;
  }

  //* undolist
  const undolist = ref([]) as Ref<string[]>;

  const isUndoActive = computed(() => undolist.value.length > 0);

  //* redolist
  const redolist = ref([]) as Ref<string[]>;

  const isRedoActive = computed(() => redolist.value.length > 0);

  //* undolist functions
  function addToUndolist(data: string) {
    // undolist.value = [...undolist.value, newCanvas];
    undolist.value = [...undolist.value, data];
    // console.log('undolist.value: ', undolist.value);
  }

  function undoAction() {
    if (undolist.value.length > 0 && canvas.value) {
      const ctx = canvas.value?.getContext('2d');
      // console.log(`undo!!`);

      const dataUrl = undolist.value.pop();
      addToRedolist(canvas.value.toDataURL());
      const img = new Image();
      img.src = dataUrl as string;

      img.onload = () => {
        // console.log('img: ', img);
        ctx?.clearRect(
          0,
          0,
          canvas.value?.width as number,
          canvas.value?.height as number
        );
        ctx?.drawImage(
          img,
          0,
          0,
          canvas.value?.width as number,
          canvas.value?.height as number
        );
      };
    }
  }

  //* redolist functions
  function addToRedolist(data: string) {
    redolist.value = [...redolist.value, data];
    // console.log('redolist.value: ', redolist.value);
  }

  function redoAction() {
    if (redolist.value.length > 0 && canvas.value) {
      const ctx = canvas.value?.getContext('2d');
      const dataUrl = redolist.value.pop();
      addToUndolist(canvas.value.toDataURL());
      const img = new Image();
      img.src = dataUrl as string;

      img.onload = () => {
        // console.log('img: ', img);
        ctx?.clearRect(
          0,
          0,
          canvas.value?.width as number,
          canvas.value?.height as number
        );
        ctx?.drawImage(
          img,
          0,
          0,
          canvas.value?.width as number,
          canvas.value?.height as number
        );
      };
    }
  }

  //* save canvas as image
  function saveImage() {
    if (canvas.value) {
      const ctx = canvas.value.getContext('2d');
      const image = canvas.value.toDataURL('image/png');

      const link = document.getElementById('link') as HTMLAnchorElement;
      link.setAttribute('download', `my-awesome-image-${Date.now()}.png`);
      link.setAttribute('href', image);
      link.click();
    }
  }

  function drawHandler(msg: { figure: { type: TypeToolName | 'finish' } }) {
    const figure = msg.figure;
    console.log('figure: ', figure);

    const ctx = canvas.value?.getContext('2d');
    console.log('ctx: ', ctx);

    if (!ctx || !figure.type) return;

    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x as number, figure.y as number);
        break;
      case 'rect':
        Rect.staticDraw(
          ctx,
          figure.x as number,
          figure.y as number,
          figure.width as number,
          figure.height as number,
          figure.color as string
        );
        break;

      case 'finish':
        ctx.beginPath();
        break;

      default:
        break;
    }
  }

  return {
    canvas,
    getCanvas: computed(() => canvas.value),

    setCanvas,

    isUndoActive,
    addToUndolist,
    undoAction,
    isRedoActive,
    addToRedolist,
    redoAction,

    saveImage,

    drawHandler
  };
});
