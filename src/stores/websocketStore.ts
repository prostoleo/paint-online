import { computed, ref, unref, type Ref } from 'vue';
import { defineStore } from 'pinia';

export const useWebsocketStore = defineStore('websocket-store', () => {
  //* websocket logic
  const websocket = ref(
    new WebSocket(`${import.meta.env.VITE_WEBSOCKET_BACKEND_ADDRESS}`)
  );
  const getWebsocket = computed(() => websocket.value);

  function onMessage() {
    unref(websocket).onmessage = (event) => {
      console.log(` message received from server`, event.data);
    };
  }

  function onOpen(data: object) {
    unref(websocket).onopen = () => {
      console.log(` connection established `);

      unref(websocket).send(JSON.stringify(data, null, 2));
    };
  }

  const sessionId = ref('');

  const setSessionId = (id: string) => {
    if (!id) return;

    sessionId.value = id;
  };

  //* username logic

  const username = ref('');
  const getUsername = computed(() => username.value);

  function setUsername(name: string, id: string) {
    if (!name || !id) {
      return;
    }

    username.value = name;
    sessionId.value = id;

    onOpen({
      id,
      username: unref(username),
      method: 'connection'
    });

    onMessage();
    // console.log(' username.value: ', username.value);
  }

  return {
    // username,
    getUsername,
    setUsername,

    getWebsocket
  };
});
