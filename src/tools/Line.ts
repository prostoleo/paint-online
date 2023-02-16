import { Tool } from './Tool';

export class Line extends Tool {
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
    const target = e.target as HTMLElement;
    this.mouseDown = false;
    this.draw(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
  }
  mouseDownHandler(e: MouseEvent) {
    const target = e.target as HTMLElement;

    this.mouseDown = true;
    this.ctx?.beginPath();
    this.ctx?.moveTo(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
    this.startX = e.pageX - target.offsetLeft;
    this.startY = e.pageY - target.offsetTop;
    this.saved = this.canvas?.toDataURL();
  }
  mouseMoveHandler(e: MouseEvent) {
    const target = e.target as HTMLElement;

    if (this.mouseDown) {
      this.draw(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
    }
  }

  /* draw(x: number, y: number) {
    this.ctx?.lineTo(x, y);
    this.ctx?.stroke();
  } */
  draw(x: number, y: number) {
    const img = new Image();

    // if (img) {
    img.src = this.saved as string;

    img.onload = () => {
      if (this.canvas && this.ctx && this.startX && this.startY) {
        this.ctx?.clearRect(0, 0, this.canvas?.width, this.canvas.height);
        this.ctx?.drawImage(img, 0, 0, this.canvas?.width, this.canvas?.height);
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(x, y);
        // this.ctx?.rect(x, y, w, h);
        this.ctx?.fill();
        this.ctx?.stroke();
      }
    };
  }
}
