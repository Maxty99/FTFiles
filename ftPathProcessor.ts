import { complex } from 'ts-complex-numbers';

class FTProcessor {
  SvgPath: SVGPathElement;
  SvgPoints: Array<complex>;
  coefficients: Array<complex>;

  constructor(path: SVGPathElement) {
    this.SvgPath = path;
    this.SvgPoints = new Array<complex>();
    this.coefficients = new Array<complex>();
  }
  processPoints(numberOfPoints: number) {
    this.SvgPoints = new Array<complex>();

    const pathLength = this.SvgPath.getTotalLength();
    const interval = pathLength / numberOfPoints;
    //console.log('Length: ' + pathLength + '\n' + 'Interval: ' + interval);
    for (let i = 0; i < pathLength; i += interval) {
      let x = this.SvgPath.getPointAtLength(i).x;
      let y = this.SvgPath.getPointAtLength(i).y;
      //console.log('got ' + x + ',' + y + ' with ' + i);
      this.SvgPoints.push(new complex(x, y));
    }
  }
  discreteTransform() {
    const N = this.SvgPoints.length;

    // Initialize an array with N elements, filled with 0s
    this.coefficients = new Array<complex>(N * 2 + 1).fill(new complex(0, 0)).map((temp, i) => {
      console.log('Element: ' + (i - N).toString());
      // Reduce x into the sum of x_k * exp(-2*sqrt(-1)*pi*i*k/N)
      return this.SvgPoints.reduce((a, b, k) => {
        return a.add(b.mult(new complex(0, (-2 * Math.PI * (i - N) * k) / N).exp()));
      }, new complex(0, 0)); // Start accumulating from 0
    }, this);
  }
  getCoefficients(): Array<complex> {
    return this.coefficients;
  }
}

export { FTProcessor };
export default { FTProcessor };
