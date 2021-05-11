"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const svgModule_1 = require("../svgModule");
describe('Testing SVG class', function () {
    let svgTest;
    beforeEach(() => {
        svgTest = new svgModule_1.SVG();
    });
    afterEach(() => {
        svgTest.close();
    });
    it('Load SVG file with no Path', async function () {
        svgTest.loadFromFile('./SVG/empty.svg');
        await expectAsync(svgTest.getPointAtLength(1)).toBeRejected();
    });
    it('Load non existant File', function () {
        expect(() => {
            svgTest.loadFromFile('./SVG/notExist.svg');
        }).toThrowError();
    });
    it('Load valid File', async function () {
        svgTest.loadFromFile('./SVG/Pi-symbol.svg');
        expect(svgTest).toBeTruthy();
        await expectAsync(svgTest.getPointAtLength(1)).not.toBeRejected();
    });
    it('Load invalid string', function () {
        expect(() => {
            svgTest.loadFromFile('./SVG/totallyEmpty.svg');
        }).toThrowError();
        expect(() => {
            svgTest.loadFromString('');
        }).toThrowError();
    });
});
