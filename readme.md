# font-color-contrast

[![npm](https://img.shields.io/npm/v/npm.svg?maxAge=2592000&style=flat-square)](https://www.npmjs.com/package/font-color-contrast)
[![npm](https://img.shields.io/npm/dt/express.svg?maxAge=2592000&style=flat-square)](https://www.npmjs.com/package/font-color-contrast)
![stars](https://img.shields.io/github/stars/russoedu/font-color-contrast.svg?style=flat-square)
![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)

NodeJS module to select black or white to a font according to the background.

## Installation

    $ npm install --save font-color-contrast

## Usage

You can use the module 3 ways:
- with an hexadecimal string color, i.e. fontColor("#f7d4fc")
- with a RGB separated by comma color (number or string), i.e. fontColor(223, 0, "255")
- with a RGB array color (number or string), i.e. fontColor([223, 0, "255"])

If any other format is sent, the function will respond with white by default.

```javascript
var fontColorContrast = require('font-color-contrast');

var lightGreenBackground: "#b6e9be";
var paleYellowBackground = ["255", "246", "199"];
var darkBlueRedBackground = 20;
var darkBlueGreenBackground = 85;
var darkBlueBlueBackground = 91;

var fontColor1 = fontColorContrast(lightGreenBackground);
// fontColor will be a string for black hexadecimal color: "#000000"

var fontColor2 = fontColorContrast(paleYellowBackground);
// fontColor will be a string for black hexadecimal color: "#000000"

var fontColor3 = fontColorContrast(
  darkBlueRedBackground,
  darkBlueGreenBackground,
  darkBlueBlueBackground
);
// fontColor will be a string for white hexadecimal color: "#ffffff"

```
## Tests

Tests made using [Jasmine](http://jasmine.github.io/) to check color format possibilities and contrast.

## License
The MIT License (MIT)

Copyright (c) 2016 Moblets

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
