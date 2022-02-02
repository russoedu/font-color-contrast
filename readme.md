# font-color-contrast

[![npm](https://img.shields.io/npm/v/font-color-contrast.svg)](https://www.npmjs.com/package/font-color-contrast)
[![CI Pipeline](https://github.com/russoedu/font-color-contrast/actions/workflows/main.yml/badge.svg)](https://github.com/russoedu/font-color-contrast/actions/workflows/main.yml)
[![Build Status](https://scrutinizer-ci.com/g/russoedu/font-color-contrast/badges/build.png?b=master)](https://scrutinizer-ci.com/g/russoedu/font-color-contrast/build-status/master)
[![Coverage Status](https://coveralls.io/repos/github/russoedu/font-color-contrast/badge.svg?branch=ts)](https://coveralls.io/github/russoedu/font-color-contrast?branch=ts)
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

## Usage

You can use the module 4 ways, with an optional parameter (from 0 to 1) for contrast threshold:
- with a hexadecimal color string
  - fontColor('#f7d4fc')
  - fontColor('f7d4fc')
  - fontColor('f7d4fc', 0.2)
- with a CSS color
  - fontColor('olivedrab')
  - fontColor('olivedrab', 0.2)
- with a color number
  - fontColor(0xf7d56a)
  - fontColor(16242026)
  - fontColor(16242026, 0.8)
- with an array of numbers with the RGB color:
  - fontColor([223, 0, 255])
  - fontColor([0xf7, 0, 0xff])
  - fontColor([0xf7, 0, 0xff], 0.4)
- with the RGB color numbers:
  - fontColor(223, 0, 255)
  - fontColor(0xf7, 0, 0xff)
  - fontColor(0xf7, 0, 0xff, 0.4)

### Examples
```Typescript
import fontColorContrast from 'font-color-contrast'

const myStringBg = '#d2691e'
const fontColor = fontColorContrast(myStringBg) // '#000000'

const myCssColorBg = 'chocolate'
const fontColor = fontColorContrast(myCssColorBg) // '#000000'

const myNumberBg = 0xd2691e
const fontColor = fontColorContrast(myNumberBg) // '#000000'

const red = 210
const green = 105
const blue = 30
const fontColor = fontColorContrast(red, green, blue) // '#000000'

const myArrayBg = [red, green, blue]
const fontColor = fontColorContrast(myArrayBg) // '#000000'

```

Optionally, you can pass the contrast threshold (defaults to 0.5). This will affect the resulting font color. The use of this parameter is to control the [WCAG conformance levels](https://www.w3.org/WAI/WCAG2A-Conformance).

 ```Typescript
import fontColorContrast from 'font-color-contrast'

fontColorContrast('#645466', 0) // '#000000'
fontColorContrast('#645466', 1) // '#ffffff'

```

## Overflows

The 4 possible overflows are described next:

### Number
```Typescript
/**
 * @param hex The hex color number must be a valid hexadecimal color number (<= 0xffffff).
 * @param threshold Contrast threshold to control the resulting font color, float values from 0 to 1. Default is 0.5.
 * @example fontColorContrast(0XF3DC56) === fontColorContrast(15981654)
 */
function fontColorContrast (hex: number, threshold?: number): '#ffffff' | '#000000'
```

### CSS named color
```Typescript
/**
 * @param cssColor The CSS named color string. The list of colors is defined as a TypeScript type to help the usage.
 * @param threshold Contrast threshold to control the resulting font color, float values from 0 to 1. Default is 0.5.
 * @example fontColorContrast('beige')
 * @example fontColorContrast('darkcyan', 0.3)
 */
 function fontColorContrast (cssColor: CssColor, threshold?: number): '#ffffff' | '#000000'
```

### Hex string
```Typescript
/**
 * @param hex The hex color string must be a valid hexadecimal color number to work correctly. Works with or without '#', with 3 or 6 color chars. Any other length or an invalid hex character will be ignored. A space is allowed between the hash symbol and the number.
 * @param threshold Contrast threshold to control the resulting font color, float values from 0 to 1. Default is 0.5.
 * @example fontColorContrast('00FFDD') === fontColorContrast('0FD') === fontColorContrast('#00FFDD') === fontColorContrast('#0FD') === fontColorContrast('# 00FFDD') === fontColorContrast('# 0FD')
 */
 function fontColorContrast (hex: string, threshold?: number): '#ffffff' | '#000000'
```

### RGB numbers
```Typescript
/**
 * @param red The red portion of the color. Must be a number between 0 and 255.
 * @param green The green portion of the color. Must be a number between 0 and 255.
 * @param blue The blue portion of the color. Must be a number between 0 and 255.
 * @example fontColorContrast(0, 243, 216) === fontColorContrast(0x0, 0xF3, 0xd8).
 * @param threshold Contrast threshold to control the resulting font color, float values from 0 to 1. Default is 0.5.
 */
function fontColorContrast (red: number, green: number, blue: number, threshold?: number): '#ffffff' | '#000000'
```

### RGB numbers array
```Typescript
/**
 * @param rgbArray Array with red, green and blue. Each value must be a number between 0 and 255.
 * @param threshold Contrast threshold to control the resulting font color, float values from 0 to 1. Default is 0.5.
 * @example fontColorContrast(fontColorContrast([0, 243, 216]) === fontColorContrast([0x0, 0xF3, 0xd8])
 */
function fontColorContrast(redGreenBlue: number[], threshold?: number): '#ffffff' | '#000000'
```

## Tests and coverage

Tests made using [Jest](https://jestjs.io/) with [![Coverage Status](https://coveralls.io/repos/github/russoedu/font-color-contrast/badge.svg?branch=ts)](https://coveralls.io/github/russoedu/font-color-contrast?branch=ts)

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
