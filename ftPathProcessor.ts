import { complex } from 'ts-complex-numbers';

class FTProcessor {
  private SvgPath: SVGPathElement;
  private SvgPoints: Array<complex>;
  private coefficients: Array<complex>;

  /**
   * Instantiates a new FTProcessor
   * @param path is the SVGPathElement that you wish to do a fourier transformation of
   */
  constructor(path: SVGPathElement) {
    this.SvgPath = path;
    this.SvgPoints = new Array<complex>();
    this.coefficients = new Array<complex>();
  }
  /**
   * Discretely integrates of a set number of points along the path, must do before the transform
   * @param numberOfPoints is the amount of sample points along the curve you want there to be
   */
  processPoints(numberOfPoints: number) {
    this.SvgPoints = new Array<complex>();

    const pathLength = this.SvgPath.getTotalLength();
    const interval = pathLength / numberOfPoints;

    for (let i = 0; i < pathLength; i += interval) {
      let x = this.SvgPath.getPointAtLength(i).x;
      let y = this.SvgPath.getPointAtLength(i).y;

      this.SvgPoints.push(new complex(x, y));
    }
  }

  /**
   * Performs the transform
   */
  dft() {
    let coef = new Array<complex>();
    const N = this.SvgPoints.length;
    for (let k = 0; k < N; k++) {
      let sum = new complex(0, 0);
      for (let n = 0; n < N; n++) {
        const phi = (2 * Math.PI * k * n) / N;
        const exponent = new complex(Math.cos(phi), -Math.sin(phi));
        sum = sum.add(this.SvgPoints[n].mult(exponent));
      }
      sum = sum.scalarMult(1 / N);

      coef.push(sum);
    }

    this.coefficients = coef;
  }

  /**
   * Get the coefficients
   * @returns coefficients
   */
  getCoefficients(): Array<complex> {
    return this.coefficients;
  }
}

export { FTProcessor };
export default { FTProcessor };
