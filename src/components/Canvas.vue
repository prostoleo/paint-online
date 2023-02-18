<template>
  <div class="container h-screen flex items-center justify-center">
    <canvas
      ref="canvasEl"
      class="bg-white w-full border border-dark-900 mt-24 touch-none"
      style="width: 900px; height: 700px"
      width="900"
      height="700"
      @pointerdown="pointerDownHandler"
      @pointerup="pointerUpHandler"
    />
    <!-- @mousedown="mouseDownHandler" -->
    <!-- style="aspect-ratio: 4/3" -->
    <!-- max-h-[680px] -->
    <a id="link"></a>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watchEffect, type Ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

import { useCanvasStore } from '@/stores/canvasStore';
import { MyWebSocket } from '@/ws/websocket';
import { storeToRefs } from 'pinia';

const canvasStore = useCanvasStore();

const { canvas } = storeToRefs(canvasStore);
const getCanvas = computed(() => canvas.value);

const canvasEl = ref(null) as Ref<HTMLCanvasElement | null>;

onMounted(async () => {
  if (canvasEl.value) {
    canvasStore.setCanvas(canvasEl.value);

    try {
      const response = await axios(
        `${import.meta.env.VITE_HTTP_BACKEND_ADDRESS}/img?id=${
          route.params.id
        }`,
        {
          method: 'GET',

          headers: {
            'Content-Type': 'application/json'
          }

          // data: img
        }
      );

      console.log('response.data: ', response.data);
      const img = new Image();
      img.src = response.data.data;
      console.log('img.src: ', img.src);

      const ctx = canvasEl.value?.getContext('2d');
      console.log('ctx: ', ctx);

      // if (!ctx) return;

      /* img.onload = () => {
        console.log('image loaded', img);

        ctx?.clearRect(
          0,
          0,
          canvasEl?.value?.width as number,
          canvasEl?.value?.height as number
        );
        ctx?.drawImage(
          img,
          0,
          0,
          canvasEl?.value?.width as number,
          canvasEl?.value?.height as number
        );

        ctx?.stroke();
      }; */
      img.addEventListener('load', () => {
        console.log('image loaded', img);

        ctx?.clearRect(
          0,
          0,
          canvasEl?.value?.width as number,
          canvasEl?.value?.height as number
        );
        ctx?.drawImage(
          img,
          0,
          0,
          canvasEl?.value?.width as number,
          canvasEl?.value?.height as number
        );

        ctx?.stroke();
      });
    } catch (error) {
      console.log(error);
    }
  }
});

const route = useRoute();

function pointerDownHandler() {
  if (canvasEl.value) {
    canvasStore.addToUndolist(canvasEl.value.toDataURL());
  }
}

async function pointerUpHandler() {
  console.log(' pointer up ');
  try {
    const img = canvasEl.value?.toDataURL('image/png');
    console.log('img: ', img);

    if (!img) return;

    /* const response = await fetch(
      `${import.meta.env.VITE_HTTP_BACKEND_ADDRESS}/img?id=${route.params.id}`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            img: img.toString()
          },
          null,
          2
        )
        // data: img
      }
    );
    console.log('response: ', response);

    const result = await response.json();
    console.log('result: ', result);

    if (result.status !== 200) {
      throw new Error(' file was not uploaded ');
    } */

    const response = await axios(
      `${import.meta.env.VITE_HTTP_BACKEND_ADDRESS}/img?id=${route.params.id}`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(
          {
            img: img.toString()
          },
          null,
          2
        )
        // data: img
      }
    );
    console.log('response: ', response);

    /* const result = await response.json();
    console.log('result: ', result); */

    if (response.status !== 200) {
      throw new Error(' file was not uploaded ');
    }
  } catch (error) {
    console.log('error: ', error);
  }
}
</script>

<style scoped lang="scss"></style>
