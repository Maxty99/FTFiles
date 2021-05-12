import fs from 'fs';
import { complex } from 'ts-complex-numbers';
import { SVG } from './svgModule';

class FTFile {
  SvgPath: SVG;
  SvgPoints: Array<complex>;
  coefficients: Array<complex>;

  constructor(path: SVG) {
    this.SvgPath = path;
    this.SvgPoints = new Array<complex>();
    this.coefficients = new Array<complex>();
  }

  async processPoints(numberOfPoints: number) {
    this.SvgPoints = new Array<complex>();

    const pathLength = await this.SvgPath.getTotalLength();
    const interval = pathLength / numberOfPoints;
    //console.log('Length: ' + pathLength + '\n' + 'Interval: ' + interval);
    for (let i = 0; i < pathLength; i += interval) {
      let x = (await this.SvgPath.getPointAtLength(i)).x;
      let y = (await this.SvgPath.getPointAtLength(i)).y;
      //console.log('got ' + x + ',' + y + ' with ' + i);
      this.SvgPoints.push(new complex(x, y));
    }
    await this.SvgPath.close();
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

  writeToFile(fileName: string) {
    const fDesc = fs.openSync(fileName, 'w');
    const buf = Buffer.alloc(4 + this.coefficients.length * 8);
    console.log('Creating ' + (4 + this.coefficients.length * 8).toString() + ' byte file');
    let pos = 0;
    buf.writeInt32BE(this.coefficients.length, pos);
    pos += 4;
    for (let i = 0; i < this.coefficients.length; i++) {
      buf.writeFloatBE(this.coefficients[i].real, pos);
      pos += 4;
      buf.writeFloatBE(this.coefficients[i].img, pos);
      pos += 4;
    }
    fs.writeSync(fDesc, buf, 0, buf.length, 0);
    // Close file
  }

  readFromFile(fileName: string) {
    const buf = Buffer.from(fs.readFileSync(fileName));
    let pos = 0;
    const n = buf.readInt32BE(pos);
    console.log('Read length: ' + n);
    pos += 4;
    this.coefficients = new Array<complex>();
    for (let i = 0; i < n; i++) {
      const real = buf.readFloatBE(pos);
      //console.log(real);
      pos += 4;
      const img = buf.readFloatBE(pos);
      //console.log(img);
      pos += 4;
      this.coefficients.push(new complex(real, img));
    }
    console.log(this.coefficients);
    // Close file
  }
  getCoefficients(): Array<complex> {
    return this.coefficients;
  }
}

export { FTFile };
export default { FTFile };
