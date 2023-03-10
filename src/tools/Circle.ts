import { Tool } from './Tool';

export class Circle extends Tool {
  mouseDown = null as boolean | null;
  startX = null as number | null;
  startY = null as number | null;
  saved = '' as string | undefined;

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
    this.startX = e.pageX - target.offsetLeft;
    this.startY = e.pageY - target.offsetTop;
    this.saved = this.canvas?.toDataURL();
  }
  mouseMoveHandler(e: MouseEvent) {
    const target = e.target as HTMLElement;

    if (this.mouseDown && this.startX && this.startY) {
      const currentX = e.pageX - target.offsetLeft;
      const currentY = e.pageY - target.offsetTop;
      const width = currentX - this.startX;
      const height = currentY - this.startY;
      const radius = Math.sqrt(width ** 2 + height ** 2);
      this.draw(this.startX, this.startY, radius);
    }
  }

  draw(x: number, y: number, r: number) {
    const img = new Image();

    // if (img) {
    img.src = this.saved as string;

    img.onload = () => {
      if (this.canvas && this.ctx) {
        this.ctx?.clearRect(0, 0, this.canvas?.width, this.canvas.height);
        this.ctx?.drawImage(img, 0, 0, this.canvas?.width, this.canvas?.height);
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx?.fill();
        this.ctx?.stroke();
      }
    };
    // }
  }
}
