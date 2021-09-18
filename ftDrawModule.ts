import { complex } from 'ts-complex-numbers';

class FTDrawer {
  private canvas: HTMLCanvasElement | undefined;
  private scale: number;
  private coefficients: Array<complex>;

  constructor(coefficients: Array<complex>) {
    this.canvas = undefined;
    this.scale = 1;
    this.coefficients = coefficients;
  }
  /**
   * Sets the canvas
   * @param canvas is an HTMLCanvasElement on which the FTDrawer will draw on
   */
  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  setScale(scale: number) {
    this.scale = scale;
  }

  /**
   * Get the x and y coordinates the transformed f(t) returns
   * @param n is a number that is pluged into the transformed function
   * @returns a point x and y
   */
  getpointAt(n: number): Array<number> {
    let x = 0;
    let y = 0;
    let sum = new complex(0,0);
    const N = this.coefficients.length;
    
    for (let k = 0; k < N; k++) {
      const coef = this.coefficients[k];
      const phi = 2 * Math.PI * k * n / N
      const exp = new complex(Math.cos(phi), Math.sin(phi));
      sum.add(coef.mult(exp));
    }
    console.log(sum);
    sum.scalarMult(1/N);
    return new Array<number>(sum.real, sum.img);
  }

  /**
   * Draws the transform associated with the coefficients provided
   * @param points The number of poitns to sample from the transformed function, length of coef by default
   */
  draw(points: number = this.coefficients.length) {
    if (this.canvas != undefined) {
      const context = this.canvas.getContext('2d');
      // Clear the canvas and start a new drawing
      context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      context?.beginPath();

      // Draw according to scale given
      const start = this.getpointAt(0);
      context?.moveTo(start[0] * this.scale, start[1] * this.scale);
      const N = this.coefficients.length;
      for (let i = 0; i <= N-1; i += N / points) {
        const point = this.getpointAt(i);
        console.log(point);
        context?.lineTo(point[0] * this.scale, point[1] * this.scale);
      }
      context?.stroke();
    } else {
      console.log('No canvas supplied');
    }
  }
}

export { FTDrawer };
export default { FTDrawer };
