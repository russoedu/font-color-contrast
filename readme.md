<img src="https://raw.githubusercontent.com/russoedu/font-color-contrast-demo/main/src/assets/font-color-contrast-logo.svg" width="100px" />

# font-color-contrast

[![npm](https://img.shields.io/npm/v/font-color-contrast.svg)](https://www.npmjs.com/package/font-color-contrast)
[![CI Pipeline](https://github.com/russoedu/font-color-contrast/actions/workflows/main.yml/badge.svg)](https://github.com/russoedu/font-color-contrast/actions/workflows/main.yml)
[![Build Status](https://scrutinizer-ci.com/g/russoedu/font-color-contrast/badges/build.png?b=master)](https://scrutinizer-ci.com/g/russoedu/font-color-contrast/build-status/master)
[![Coverage Status](https://coveralls.io/repos/github/russoedu/font-color-contrast/badge.svg?branch=master)](https://coveralls.io/github/russoedu/font-color-contrast?branch=master)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/russoedu/font-color-contrast/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/russoedu/font-color-contrast/?branch=master)
[![Code Climate](https://codeclimate.com/github/dwyl/esta/badges/gpa.svg)](https://codeclimate.com/github/russoedu/font-color-contrast)
[![Known Vulnerabilities](https://snyk.io/test/npm/font-color-contrast/badge.svg)](https://snyk.io/test/npm/font-color-contrast)

font-color-contrast is a JavaScript module to help you select black or white for a font according to the brightness of the background color to give you the best possible contrast.

### How does it work

font-color-contrast uses the algorithm described in the article [HSP Color Model — Alternative to HSV (HSB) and HSL](https://alienryderflex.com/hsp.html) where brightness is described as 

<p>
  <img src="https://render.githubusercontent.com/render/math?math=brightness=\sqrt{0.299 * red^2 %2B 0.587 * green^2 %2B 0.114 * blue^2}">
</p>

Any brightness smaller than 50% means the background is dark.

Any brightness bigger than 50% means the background is light.

This way, font-color-contrast will (with the default threshold of 0.5) return white (`'#ffffff'`) for dark brightness and black (`'#000000'`) for light brightness.

You can change this behaviour by passing the optional `threshold` parameter, so the comparison will be with the value you passed, not with 50%.


## Installation

    $ npm i font-color-contrast

## Usage & Examples
To see the full usage and examples access [the demo site](https://russoedu.github.io/font-color-contrast-demo/#/).

## Tests and coverage

Tests made using [Jest](https://jestjs.io/).

[![Coverage Status](https://coveralls.io/repos/github/russoedu/font-color-contrast/badge.svg?branch=ts)](https://coveralls.io/github/russoedu/font-color-contrast?branch=ts)

## Version history

### 0 -> 8.1.1
JavaScript version, accepting strings for RGB

### 9.0.0 -> 9.0.2
TypeScript version.

Only numbers are now accepted as params when using array or RGB because it was impossible to know if the string was decimal or hexadecimal. Accepting only numbers we can be sure the correct values are being used to calculate the contrast.

### 9.1.0
Updated the algorithm from https://alienryderflex.com/hsp.html with new thresholds for better contrast.

### 10.0.0
Included the optional threshold parameter (thanks, [franciscohanna92](https://github.com/franciscohanna92)).

### 10.0.1
Changed target to ES2015

### 10.1.0
Fixed package installation from the new TS version

### 11.0.0
Many improved checks to make sure the color is a valid set color and recreated all tests. The function now encapsulates a function in a class.

[CSS named colors](https://www.w3.org/wiki/CSS/Properties/color/keywords) can now be passed as a param.

### 11.1.0
Checking if the color numbers are integer.
