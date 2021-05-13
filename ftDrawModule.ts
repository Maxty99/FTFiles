import { complex } from 'ts-complex-numbers';

class FTDrawer {
  canvas: HTMLCanvasElement | undefined;
  scale: number;
  drawInterval: number;
  coefficients: Array<complex>;

  constructor(coefficients: Array<complex>) {
    this.canvas = undefined;
    this.scale = 1;
    this.drawInterval = 100000;
    this.coefficients = coefficients;
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }
  setScale(scale: number) {
    this.scale = scale;
  }

  getpointAt(t: number): Array<number> {
    const N = this.coefficients.length;
    let sum = new complex(0, 0);
    for (let i = 0; i < N; i++) {
      sum = sum.add(this.coefficients[i].mult(new complex(0, ((N - 1) / 2) * 2 * Math.PI * t).exp()));
    }
    return new Array<number>(sum.real * this.scale, sum.img * this.scale);
  }

  draw() {
    if (this.canvas != undefined) {
      const context = this.canvas.getContext('2d');
      const start = this.getpointAt(0);
      context?.moveTo(start[0], start[1]);
      for (let i = 0; i < this.drawInterval; i++) {
        const point = this.getpointAt(i / this.drawInterval);
        context?.lineTo(point[0], point[1]);
      }
    } else {
      console.log('No canvas supplied');
    }
  }
}

export { FTDrawer };
export default { FTDrawer };
