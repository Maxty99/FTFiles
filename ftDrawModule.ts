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
   * @param t is a number that is pluged into the transformed function
   * @returns a point x and y
   */
  getpointAt(t: number): Array<number> {
    let x = 0;
    let y = 0;
    // f(t) = Cn*e^(-n*2*pi*i*t) + Cn+1*e^(-(n+1)*2*pi*i*t) ...
    for (let i = 0; i < this.coefficients.length; i++) {
      const amp = Math.sqrt(
        this.coefficients[i].real * this.coefficients[i].real + this.coefficients[i].img * this.coefficients[i].img
      ); // l = sqrt(x^2 + y^2)

      const phase = Math.atan2(this.coefficients[i].img, this.coefficients[i].real); // theta = atan2(x,y)

      // e^it=cos(t)-isin(t) <- Minus doesnt matter in this case
      x += amp * Math.cos(i * t + phase);
      y += amp * Math.sin(i * t + phase);
    }
    return new Array<number>(x, y);
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
      for (let i = 0; i < Math.PI * 2; i += (Math.PI * 2) / points) {
        const point = this.getpointAt(i);
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
