import { Tool } from './Tool';

export class Brush extends Tool {
  mouseDown = null as boolean | null;

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
    super(canvas, socket, id);
    this.listen();
  }

  listen() {
    if (this.canvas) {
      /* this.canvas.onmouseup = this.mouseUpHandler.bind(this);
      this.canvas.onmousedown = this.mouseDownHandler.bind(this);
      this.canvas.onmousemove = this.mouseMoveHandler.bind(this); */
      this.canvas.onpointerup = this.mouseUpHandler.bind(this);
      this.canvas.onpointerdown = this.mouseDownHandler.bind(this);
      this.canvas.onpointermove = this.mouseMoveHandler.bind(this);
    }
  }

  mouseUpHandler(e: MouseEvent) {
    this.mouseDown = false;

    this.socket.send(
      JSON.stringify({
        method: 'draw',
        id: this.id,
        figure: {
          type: 'finish'
        }
      })
    );
  }
  mouseDownHandler(e: MouseEvent) {
    // e.target.
    const target = e.target as HTMLElement;

    this.mouseDown = true;
    this.ctx?.beginPath();
    this.ctx?.moveTo(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
  }
  mouseMoveHandler(e: MouseEvent) {
    const target = e.target as HTMLElement;

    if (this.mouseDown) {
      // this.draw(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);

      this.socket.send(
        JSON.stringify({
          method: 'draw',
          id: this.id,
          figure: {
            type: 'brush',
            x: e.pageX - target.offsetLeft,
            y: e.pageY - target.offsetTop
          }
        })
      );
    }
  }

  static draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx?.lineTo(x, y);
    ctx?.stroke();
  }
}
