import { complex } from 'ts-complex-numbers';

class FTBuffer {
  private coefficients: Array<complex>;

  /**
   * Initiallizes a new FTBuffer with an empty coefficients array
   */
  constructor() {
    this.coefficients = new Array<complex>();
  }
  /**
   * Writes the length of the coefficients array and the coefficients to the buffer (BE)
   * @returns Buffer with encoded information
   */
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

  /**
   * Takes a buffer and interprets it as an ftfile and extracts information
   * @param buf The buffer from which to read
   */
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

  /**
   * Get the coefficients
   * @returns coefficients
   */
  getCoefficients(): Array<complex> {
    return this.coefficients;
  }
}

export { FTBuffer };
export default { FTBuffer };
