# FTFiles

![Npm Downloads](https://img.shields.io/npm/dm/ftfiles)

---

Fourier Transform Files are files that aim to encode simple vector image data. The goal of this library is to provide a way to take a svg file with a **single** svg path. Then it will calculate and rencode it into a set of coefficients that apply to a complex fourier series.

# Usage

This can be done client side the following way:

```ts
import { FTProcessor } from 'ftfiles';

// Create a SVGProcessor instance
const ftProc = new FTProcessor(path); // Path must be an SVGPathElement

ftProc.processPoints(numberOfPoints); // Doing discrete integration basically, you have to do this before transforming
ftProc.dft(); // Does the transformation

ftProc.getCoefficients(); // used to retreive the coefficients of the series
```

Then the coeficcients can be read in order to draw it with the drawing module

```ts
import { FTDrawer } from 'ftfiles';

// Say we already have coefficents (be it serialized and sent from backend, calculated client side)
const coefficients = ftProc.getCoefficients();

const drawer = new FTDrawer(coefficients);
drawer.setCanvas(canvas); // Set the canvas to which to draw (Param must be Canvas element)
drawer.setScale(1); // Set the scale at which to draw
drawer.draw(); // Draws
```

# Thanks

- **Biocinematics**([![Twitter URL](https://img.shields.io/twitter/follow/Biocinematics?style=social)](https://twitter.com/Biocinematics)): Fourier one-line SVG used for testing and examples: https://twitter.com/Biocinematics/status/1143330623131738112
- **3Blue1Brown**([![Twitter URL](https://img.shields.io/twitter/follow/3blue1brown?style=social)](https://twitter.com/3blue1brown)): For the inspiration to make this
- **Node**([![Node Website](https://img.shields.io/github/stars/nodejs?style=social)](https://github.com/nodejs)): Framework used
- **netsec917**([![Npm Package](https://img.shields.io/npm/dm/ts-complex-numbers)](https://www.npmjs.com/package/ts-complex-numbers)): For the complex number library
