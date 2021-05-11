"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const svgModule_1 = require("../svgModule");
const ftFileModule_1 = require("../ftFileModule");
describe('Testing FTF class', function () {
    let svgTest;
    let path;
    beforeEach(() => {
        svgTest = new svgModule_1.SVG();
        svgTest.loadFromFile('./SVG/Pi-symbol.svg');
    });
    afterEach(async () => {
        await svgTest.close();
    });
    it('can load FTFile', () => {
        const ftTest = new ftFileModule_1.FTFile(svgTest);
        expect(ftTest).toBeInstanceOf(ftFileModule_1.FTFile);
        expect(ftTest.SvgPoints).toBeInstanceOf(Array);
    });
    fit('can get Points', () => {
        const ftTest = new ftFileModule_1.FTFile(svgTest);
        ftTest.processPoints(10);
        expect(ftTest.SvgPoints).not.toBeUndefined();
    });
});
