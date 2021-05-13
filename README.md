# FTFiles

![Npm Downloads](https://img.shields.io/npm/dm/ftfiles)

---

Fourier Transform Files are files that aim to encode simple vector image data. The goal of this library is to provide a serive that can take a svg file with a **single** svg path. Then it will calculate and rencode it into a set of coefficients that apply to a complex fourier series.

# Usage

To be outlined

<!-- This can be done in the backend by an api:

```ts
import { SVG, FTFile } from 'ftfiles';

// Create a SVG class that is used to extract the path from a file in the backend
const svgFileHandler = new SVG();

// You can load from a file directly or from a string
svgFileHandler.loadFromString(contentsOfReadXml); // Useful when base 64 encoding and decoding
svgFileHanlder.loadFromFile(pathToFile); // useful with backend api running to handle users uploading files

const ftFileHandler = new FTFile(svgFileHandler);
ftFileHandler.processPoints(numberOfPoints); // Doing discrete integration basically, you have to do this before transforming
ftFileHandler.discreteTransform(); // Does the transformation
ftFileHandler.writeToFile(); // Writes to a binary file Note: .readFromFile can read from a file and doesnt require a svg path
ftFilehander.getCoefficients(); // used to retreive the coefficients of the series
```

Then the coeficcients can be read in order to draw it with the drawing module

```ts
import { FTDrawer } from 'ftfiles';

// Say we already have coefficents (be it serialized and sent from backend, calculated client side)
const coefficients;

const drawer = new FTDrawer(coefficients);
drawer.setCanvas(); // Set the canvas to which to draw
drawer.setScale(); // Set the scale at which to draw
drawer.draw(); // Draws
``` -->

# Thanks

- **Biocinematics**([![Twitter URL](https://img.shields.io/twitter/follow/Biocinematics?style=social)](https://twitter.com/Biocinematics)): Fourier one-line SVG used for testing and examples: https://twitter.com/Biocinematics/status/1143330623131738112
- **3Blue1Brown**([![Twitter URL](https://img.shields.io/twitter/follow/3blue1brown?style=social)](https://twitter.com/3blue1brown)): For the inspiration to make this
- **Node**([![Node Website](https://img.shields.io/github/stars/nodejs?style=social)](https://github.com/nodejs)): Framework used
- **Puppeteer**([![Github Repo](https://img.shields.io/github/stars/puppeteer/puppeteer?style=social)](https://github.com/puppeteer/puppeteer)): Framework used to extract path in backend since node doesnt support a DOM natively
- **netsec917**([![Npm Package](https://img.shields.io/npm/dm/ts-complex-numbers)](https://www.npmjs.com/package/ts-complex-numbers)): For the complex number library
