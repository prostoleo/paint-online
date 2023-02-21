<template>
  <div class="wrapper w-full h-screen max-h-screen bg-slate-50">
    <Toolbar />
    <SettingBar />
    <Canvas />

    <!-- <Teleport to="body"> -->
    <Modal :is-open="showModal" @submit-name="handleReceivedName" />
    <!-- </Teleport> -->
  </div>
</template>

<script setup lang="ts">
import { ref, unref, watch } from 'vue';
import { useRoute } from 'vue-router';

import Canvas from '@/components/Canvas.vue';
import Toolbar from '@/components/Toolbar.vue';
import SettingBar from '@/components/SettingBar.vue';
import Modal from '@/components/Modal.vue';
// import { useCanvasStore } from '@/stores/canvasStore';
// import { storeToRefs } from 'pinia';
// import { isArray } from '@vue/shared';
// import { useWebsocketStore } from '@/stores/websocketStore';
import { MyWebSocket } from '@/ws/websocket';

const showModal = ref(true);

// const canvasStore = useCanvasStore();
// const websocketStore = useWebsocketStore();

// const { getUsername } = storeToRefs(canvasStore);
const route = useRoute();

function handleReceivedName(name: string) {
  if (!name) return;

  const id = route.params.id;

  if (!id || typeof id !== 'string') return;
  // console.log('name: ', name);

  // websocketStore.setUsername(name, id);
  const websocket = new MyWebSocket(id, name);
  websocket.initWebsocket();

  showModal.value = false;
}

/* watch(getUsername, () => {
  const route = useRoute();

  const socket = new WebSocket('ws://localhost:5000');

  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        id: route.params.id,
        username: unref(getUsername),
        method: 'connection'
      })
    );
  };
}); */
</script>
