# font-color-contrast

[![npm](https://img.shields.io/npm/v/font-color-contrast.svg?maxAge=2592000)](https://www.npmjs.com/package/font-color-contrast)
[![CI Pipeline](https://github.com/russoedu/font-color-contrast/actions/workflows/main.yml/badge.svg)](https://github.com/russoedu/font-color-contrast/actions/workflows/main.yml)
[![Build Status](https://scrutinizer-ci.com/g/russoedu/sequential-id-generator/badges/build.png?b=main)](https://scrutinizer-ci.com/g/russoedu/sequential-id-generator/build-status/main)
[![Coverage Status](https://coveralls.io/repos/github/russoedu/font-color-contrast/badge.svg?branch=ts)](https://coveralls.io/github/russoedu/font-color-contrast?branch=ts)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/russoedu/font-color-contrast/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/russoedu/font-color-contrast/?branch=master)
[![Code Climate](https://codeclimate.com/github/dwyl/esta/badges/gpa.svg)](https://codeclimate.com/github/russoedu/font-color-contrast)
[![Known Vulnerabilities](https://snyk.io/test/npm/font-color-contrast/badge.svg)](https://snyk.io/test/npm/font-color-contrast)

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

## Examples

### WebSafe colors
![Sample with WebSafe colors](https://github.com/russoedu/font-color-contrast/blob/master/websafe-colors.jpeg?raw=true)


### CSS colors
![Sample with CSS colors](https://github.com/russoedu/font-color-contrast/blob/master/css-colors.jpeg?raw=true)

## Version history

### 0 -> 8.1.1
JavaScript version, accepting strings for RGB

### 9.0.0
TypeScript version.

Only numbers are now accepted as params when using array or RGB, because it was impossible to know if the string was decimal or hexadecimal. Accepting only numbers we can be sure the correct values are being used to calculate the contrast.
