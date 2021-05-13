import fs from 'fs';
import { complex } from 'ts-complex-numbers';

class FTFile {
  coefficients: Array<complex>;

  constructor() {
    this.coefficients = new Array<complex>();
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

  writeToBuffer(): Buffer {
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
    return buf;
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

  readFromBuffer(buf: Buffer) {
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
  }

  getCoefficients(): Array<complex> {
    return this.coefficients;
  }
}

export { FTFile };
export default { FTFile };
