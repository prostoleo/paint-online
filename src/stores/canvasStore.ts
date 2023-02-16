import { computed, ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { useToolStore } from './toolStore';
import { Tool } from '@/tools/Tool';

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
    console.log('undolist.value: ', undolist.value);
  }

  function undoAction() {
    if (undolist.value.length > 0 && canvas.value) {
      const ctx = canvas.value?.getContext('2d');
      console.log(`undo!!`);
      /* const prevCanvas = undolist.value[undolist.value.length - 1];

      setCanvas(prevCanvas);
      toolStore.setTool(new Tool(getCanvas.value as HTMLCanvasElement), null);
      addToRedolist(prevCanvas);

      undolist.value.splice(-1, 1); */
      /* const prevCanvas = undolist.value.pop() as HTMLCanvasElement;
      const dataUrl = prevCanvas.toDataURL();
      addToRedolist(canvas.value);

      const img = new Image();
      img.src = dataUrl as string;
      */

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
    // redolist.value = [...redolist.value, newCanvas];
    redolist.value = [...redolist.value, data];
    console.log('redolist.value: ', redolist.value);
  }

  function redoAction() {
    console.log(`redo`);
    /* if (redolist.value.length > 0 && canvas.value) {
      const currentCanvas = canvas.value;

      const redoneCanvas = redolist.value[redolist.value.length - 1];

      addToUndolist(currentCanvas);
      setCanvas(redoneCanvas);
      toolStore.setTool(new Tool(getCanvas.value as HTMLCanvasElement), null);
    } */
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

  function saveImage() {
    if (canvas.value) {
      const ctx = canvas.value.getContext('2d');
      const image = canvas.value.toDataURL('image/png');
      // .replace('image/png', 'image/octet-stream');

      const link = document.getElementById('link') as HTMLAnchorElement;
      link.setAttribute('download', `my-awesome-image-${Date.now()}.png`);
      link.setAttribute('href', image);
      link.click();
      // window.location.href = image;

      /* const img = new Image();

      img.src = dataUrl;

      img.onload = () => {
        window.location.href = img;
      }; */
    }
  }

  return {
    canvas,
    getCanvas,
    setCanvas,

    isUndoActive,
    addToUndolist,
    undoAction,
    isRedoActive,
    addToRedolist,
    redoAction,

    saveImage,
  };
});
