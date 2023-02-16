import { Brush } from './Brush';
// import { Tool } from './Tool';

export class Eraser extends Brush {
  // mouseDown = null as boolean | null;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    // this.listen();
  }

  draw(x: number, y: number) {
    if (this.ctx) {
      this.ctx?.lineTo(x, y);
      this.ctx.strokeStyle = '#ffffff';
      this.ctx?.stroke();
    }
  }
}
