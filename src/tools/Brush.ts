import { Tool } from './Tool';

export class Brush extends Tool {
  mouseDown = null as boolean | null;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
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
      this.draw(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
    }
  }

  draw(x: number, y: number) {
    this.ctx?.lineTo(x, y);
    this.ctx?.stroke();
  }
}
