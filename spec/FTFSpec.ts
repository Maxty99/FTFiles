import { SVG } from '../svgModule';
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
  it('can load FTFile', () => {
    const ftTest = new FTFile(svgTest);
    expect(ftTest).toBeInstanceOf(FTFile);
    expect(ftTest.SvgPoints).toBeInstanceOf(Array);
  });
  fit('can get Points', () => {
    const ftTest = new FTFile(svgTest);
    ftTest.processPoints(10);
    expect(ftTest.SvgPoints).not.toBeUndefined();
  });
});
