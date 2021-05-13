//import { SVG } from '../svgModule';
import { FTFile } from '../ftFileModule';

describe('Testing FTF class', function () {
  let svgTest: SVG;
  let path: SVGPathElement;
  beforeEach(() => {
    svgTest = new SVG();
    svgTest.loadFromFile('./SVG/Pi-symbol.svg');
  });
  afterEach(async () => {
    await svgTest.close();
  });
  // it('can load FTFile', async () => {
  //   const ftTest = new FTFile(await svgTest.getSVGPathElement());
  //   expect(ftTest).toBeInstanceOf(FTFile);
  //   expect(ftTest.SvgPoints).toBeInstanceOf(Array);
  // });
  // it('can get Points', async () => {
  //   const ftTest = new FTFile(await svgTest.getSVGPathElement());
  //   ftTest.processPoints(10);
  //   expect(ftTest.SvgPoints).not.toBeUndefined();
  // });
});
