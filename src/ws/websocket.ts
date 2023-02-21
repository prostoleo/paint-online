import { useCanvasStore } from '@/stores/canvasStore';
import type { TypeToolName } from '@/stores/toolStore';

// import WebSocket from 'ws';

interface IWebSocket {
  socket: WebSocket;
  sessionId: string;
  username: string;
  onMessage(): void;
  onOpen(data: object): void;
}

interface IDataOnConnection {
  id: string;
  username: string;
  method: 'connection';
}

interface IDataOnDraw {
  method: 'draw';
  figure: {
    type: TypeToolName;
  };
}

type IDataOnOpen = IDataOnConnection | IDataOnDraw;

export class MyWebSocket implements IWebSocket {
  private socket: WebSocket;
  private sessionId: string;
  private username: string;

  constructor(sessionId?: string, username?: string) {
    if (MyWebSocket.exists) {
      return MyWebSocket.instance;
    }

    MyWebSocket.instance = this;
    MyWebSocket.exists = true;

    this.socket = new WebSocket(
      `${import.meta.env.VITE_WEBSOCKET_BACKEND_ADDRESS}`
    );

    this.sessionId = sessionId;
    this.username = username;
  }

  public onMessage() {
    this.socket.onmessage = (event) => {
      console.log('event.data: ', event.data);
      // console.log(typeof event.data);

      let msg;

      try {
        msg = JSON.parse(event.data.toString()) as IDataOnOpen;

        const canvasStore = useCanvasStore();

        switch (msg.method) {
          case 'connection':
            console.log(`Пользователь ${msg.username} присоединился`);
            break;
          case 'draw':
            console.log('draw handler called');
            canvasStore.drawHandler(msg);

            break;

          default:
            break;
        }
      } catch (error) {
        msg = event.data.toString();

        console.log('error: ', error);
      }

      console.log('message received from server', msg);
    };
  }

  public onOpen(data: IDataOnOpen) {
    this.socket.onopen = () => {
      console.log('connection established');

      this.socket.send(JSON.stringify(data, null, 2));
    };
  }

  public get getSessionId() {
    return this.sessionId;
  }

  public set setSessionId(id: string) {
    this.sessionId = id;
  }

  public get getUsername() {
    return this.username;
  }

  public initWebsocket() {
    this.onOpen({
      id: this.getSessionId,
      username: this.getUsername,
      method: 'connection'
    });

    this.onMessage();
  }

  public get getWebsocket() {
    return this.socket;
  }
}

/* export function websocket() {
  const socket = new WebSocket('ws://localhost:5000');

  socket.onopen = () => {
    console.log(` connection established `);

    socket.send(
      JSON.stringify(
        {
          method: 'connection',
          id: 555,
          username: 'prostoleo'
        },
        null,
        2
      )
    );
  };

  socket.onmessage = (event) => {
    console.log(` message received from server`, event.data);
  };
} */
