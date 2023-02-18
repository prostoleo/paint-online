export class Tool {
  canvas = null as HTMLCanvasElement | null;
  ctx = null as CanvasRenderingContext2D | null;
  socket: WebSocket;
  id: string;

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
    this.canvas = canvas;

    this.socket = socket;
    this.id = id;

    this.ctx = canvas.getContext('2d');
    this.destoryEvents();
  }

  set fillColor(color: string) {
    if (this.ctx) {
      this.ctx.fillStyle = color;
    }
  }

  set strokeColor(color: string) {
    if (this.ctx) {
      this.ctx.strokeStyle = color;
    }
  }

  set lineWidth(width: number) {
    // console.log('width: ', width);
    if (this.ctx) {
      this.ctx.lineWidth = width;
    }
  }

  destoryEvents() {
    if (this.canvas) {
      this.canvas.onmouseup = null;
      this.canvas.onmousedown = null;
      this.canvas.onmousemove = null;
    }
  }
}
