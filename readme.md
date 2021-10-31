# font-color-contrast

[![npm](https://img.shields.io/npm/v/font-color-contrast.svg?maxAge=2592000)](https://www.npmjs.com/package/font-color-contrast)
[![CI Pipeline](https://github.com/russoedu/font-color-contrast/actions/workflows/main.yml/badge.svg)](https://github.com/russoedu/font-color-contrast/actions/workflows/main.yml)
[![Build Status](https://scrutinizer-ci.com/g/russoedu/font-color-contrast/badges/build.png?b=main)](https://scrutinizer-ci.com/g/russoedu/font-color-contrast/build-status/main)
[![Coverage Status](https://coveralls.io/repos/github/russoedu/font-color-contrast/badge.svg?branch=ts)](https://coveralls.io/github/russoedu/font-color-contrast?branch=ts)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/russoedu/font-color-contrast/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/russoedu/font-color-contrast/?branch=master)
[![Code Climate](https://codeclimate.com/github/dwyl/esta/badges/gpa.svg)](https://codeclimate.com/github/russoedu/font-color-contrast)
[![Known Vulnerabilities](https://snyk.io/test/npm/font-color-contrast/badge.svg)](https://snyk.io/test/npm/font-color-contrast)

NodeJS module to select black or white to a font according to the background.

## Installation

    $ npm i font-color-contrast

## Usage

You can use the module 3 ways:
- with a hexadecimal color (number or string), i.e. fontColor("#f7d4fc") or fontColor(0xf7d56a) or even fontColor(16242026)
- with an RGB separated by comma color (number), i.e. fontColor(223, 0, 255)
- with an RGB array color (number), i.e. fontColor([223, 0, 255])

```Typescript
import fontColorContrast from 'font-color-contrast'

const myStringBg = '#00CC99'
const fontColor = fontColorContrast(myStringBg) // '#000000'

const myNumberBg = 0x00cc99
const fontColor = fontColorContrast(myNumberBg) // '#000000'

const myRgbBg = {
  red: 0,
  green: 204,
  blue: 153
}
const fontColor = fontColorContrast(myRgbBg.red, myRgbBg.green, myRgbBg.blue) // '#000000'

const myArrayBg = [0, green: 204, blue: 153]
const fontColor = fontColorContrast(myArrayBg) // '#000000'

```

The 4 possible overflows are described next:

```Typescript
/**
 * @param hex The hex color number that must be a valid hexadecimal color number, with 6 characters, to work correctly
 * @example fontColorContrast(0XF3DC56) === fontColorContrast(15981654)
 */
function fontColorContrast (hex: number): '#ffffff' | '#000000'
```

```Typescript
/**
 * @param hex The hex color string that must be a valid hexadecima color number to work correctly. Works with or without '#', with 3 or 6 color chars
 * @example fontColorContrast('00FFDD') === fontColorContrast('0FD') === fontColorContrast('#00FFDD') === fontColorContrast('#0FD')
 */
 function fontColorContrast (hex: string): '#ffffff' | '#000000'
```

```Typescript
/**
 * @param red The red portion of the color. Must be a number between 0 and 255
 * @param green The green portion of the color. Must be a number between 0 and 255
 * @param blue The blue portion of the color. Must be a number between 0 and 255
 * @example fontColorContrast('00', 'F3', D8) === fontColorContrast(0, 243, 216) === fontColorContrast(0x0, 0xF3, 0xd8)
 */
function fontColorContrast (red: number, green: number, blue: number): '#ffffff' | '#000000'
```

```Typescript
/**
 * @param redGreenBlue Array with red, green and blue. Each value must be a number between 0 and 255
 * @example fontColorContrast(['00', 'F3', 'D8']) === fontColorContrast([0, 243, 216]) === fontColorContrast([0x0, 0xF3, 0xd8])
 */
function fontColorContrast (redGreenBlue: number[]): '#ffffff' | '#000000'
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
