# font-color-contrast

[![npm](https://img.shields.io/npm/v/npm.svg?maxAge=2592000&style=flat-square)](https://www.npmjs.com/package/font-color-contrast)
[![npm](https://img.shields.io/npm/dt/express.svg?maxAge=2592000&style=flat-square)](https://www.npmjs.com/package/font-color-contrast)
![stars](https://img.shields.io/github/stars/russoedu/font-color-contrast.svg?style=flat-square)
![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)

NodeJS module to select black or white to a font according to the background.

## Installation

    $ npm i font-color-contrast

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

Tests made using [Jest](https://jestjs.io/) to check color format possibilities and contrast, including all CSS colors and WebSafe (90's stuff) colors as shown in the image below

![Sample with CSS colors and WebSafe colors](./all-colors.jpg)
