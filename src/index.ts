const hashRegEx = /#/
const hexRegEx = /0x/i
let isRGB: boolean
let isArray: boolean
let isHexString: boolean
let isHexNumber: boolean

type ColorIntensity = number | string

/**
 * Analyses the color (normally used in the background) and retrieves what color (black or white) has a better contrast.
 * @param hex The hex color number that must be a valid hexadecimal color number, with 6 characters, to work correctly
 * @example fontColorContrast(0XF3DC56) === fontColorContrast(15981654)
 */
function fontColorContrast (hex: number): '#ffffff' | '#000000'

/**
 * Analyses the color (normally used in the background) and retrieves what color (black or white) has a better contrast.
 * @param hex The hex color string that must be a valid hexadecima color number to work correctly. Works with or without '#', with 3 or 6 color chars
 * @example fontColorContrast('00FFDD') === fontColorContrast('0FD') === fontColorContrast('#00FFDD') === fontColorContrast('#0FD')
 */
 function fontColorContrast (hex: string): '#ffffff' | '#000000'

/**
 * Analyses the color (normally used in the background) and retrieves what color (black or white) has a better contrast.
 * @param red The red portion of the color. Must be a number between 0 and 255
 * @param green The green portion of the color. Must be a number between 0 and 255
 * @param blue The blue portion of the color. Must be a number between 0 and 255
 * @example fontColorContrast('00', 'F3', D8) === fontColorContrast(0, 243, 216) === fontColorContrast(0x0, 0xF3, 0xd8)
 */
function fontColorContrast (red: number, green: number, blue: number): '#ffffff' | '#000000'

/**
 * Analyses the color (normally used in the background) and retrieves what color (black or white) has a better contrast.
 * @param redGreenBlue Array with red, green and blue. Each value must be a number between 0 and 255
 * @example fontColorContrast(['00', 'F3', 'D8']) === fontColorContrast([0, 243, 216]) === fontColorContrast([0x0, 0xF3, 0xd8])
 */
function fontColorContrast (redGreenBlue: number[]): '#ffffff' | '#000000'

function fontColorContrast (hexColorOrRedOrArray: string | number | number[], green?: number, blue?: number) {
  let red = 0
  isRGB = !!(green !== undefined && blue !== undefined)
  isArray = Array.isArray(hexColorOrRedOrArray)
  isHexString = typeof hexColorOrRedOrArray === 'string' && !isRGB
  isHexNumber = typeof hexColorOrRedOrArray === 'number' && !isRGB

  if (isHexString || isHexNumber) {
    [red, green, blue] = hexColorToRGB(hexColorOrRedOrArray as ColorIntensity)
  } else if (isRGB || isArray) {
    [red, green, blue] = arrayOrRgbToRGB(hexColorOrRedOrArray as number | number[], green as number, blue as number)
  } else {
    // Not a color, respond with white color
    return '#ffffff'
  }

  return contrastFromHSP(red, green, blue)
}

export default fontColorContrast

/**
 * Converts a hexadecimal string to it's correspondent integer
 * @param hexString The hexadecimal string
 * @returns The integer value
 */
function hexToDec (hexString: string): number {
  const decString = (hexString).replace(/[^a-f0-9]/gi, '')
  return parseInt(decString, 16)
}

/**
 * Converts a ColorIntensity string or number, with all possibilities (e.g. '#009', '009', '#000099', '000099', 153, 0x00099) to the respective RGB values
 * @param hexColor The color string or number
 * @returns The array with the RGB values
 * @example All these examples produces the same value
 * hexColorToRGB('#0C9')
 * hexColorToRGB('0C9')
 * hexColorToRGB('#00CC99')
 * hexColorToRGB('00cc99')
 * hexColorToRGB(52377)
 * hexColorToRGB(0x00Cc99)
 */
function hexColorToRGB (hexColor: ColorIntensity): [red: number, green: number, blue: number] {
  let red: number, green: number, blue: number
  const hasHash = hashRegEx.test(hexColor as string)
  const hasHex = hexRegEx.test(hexColor as string)
  const color: string = isHexNumber
    ? hexColor.toString(16)
    : hasHash
      ? (hexColor as string).replace(hashRegEx, '')
      : hasHex
        ? (hexColor as string).replace(hexRegEx, '')
        : hexColor as string

  // Color has only a single char in the last digit, so the last digit must be repeated, and red and green are 0
  if (color.length === 1) {
    red = 0
    green = 0
    blue = hexToDec(color.repeat(2))
  // Color has two chars in the last digit, so red and green are 0
  } else if (color.length === 2) {
    red = 0
    green = 0
    blue = hexToDec(color)
  // Color has one chars for each color, so they must be repeated
  } else if (color.length === 3) {
    red = hexToDec(color[0].repeat(2))
    green = hexToDec(color[1].repeat(2))
    blue = hexToDec(color[2].repeat(2))
  // Color has only for chars, so red is 0
  } else if (color.length === 4) {
    red = 0
    green = hexToDec(color.substr(0, 2))
    blue = hexToDec(color.substr(2, 2))
  // All chars are filled, so no transformation is needed
  } else {
    red = hexToDec(color.substr(0, 2))
    green = hexToDec(color.substr(2, 2))
    blue = hexToDec(color.substr(4, 2))
  }

  return [red, green, blue]
}

/**
 * Converts a color array or separated in RGB to the respective RGB values
 * @param redOrArray The RGB array or the color red
 * @param green The color green
 * @param blue The color blue
 * @returns The array with the RGB values
 * @example All these examples produces the same value
 * arrayOrRgbToRGB(0, 0xcc, 153)
 * arrayOrRgbToRGB(0x0, 0xcc, 153)
 * arrayOrRgbToRGB(0, 204, 0x99)
 * arrayOrRgbToRGB([0, 0xcc, 153])
 * arrayOrRgbToRGB([0x0, 0xcc, 153])
 * arrayOrRgbToRGB([0, 204, 0x99])
 */
function arrayOrRgbToRGB (redOrArray: number | number[], green?: number, blue?: number): [red: number, green: number, blue: number] {
  let r = 0
  let g = 0
  let b = 0
  if (isArray) {
    r = (redOrArray as number[])[0]
    g = (redOrArray as number[])[1]
    b = (redOrArray as number[])[2]
  } else if (isRGB) {
    r = redOrArray as number
    g = green as number
    b = blue as number
  }

  return [r, g, b]
}

/**
 * Calculates the best color (black or white) to contrast with the passed RGB color using the algorithm from https://alienryderflex.com/hsp.html
 * @param red The color red value
 * @param green The color green value
 * @param blue The color blue value
 * @returns Black or White depending on the best possible contrast
 */
function contrastFromHSP (red: number, green: number, blue: number): '#000000' | '#ffffff' {
  const pRed = 0.299
  const pGreen = 0.587
  const pBlue = 0.114

  const contrast = Math.sqrt(
    pRed * Math.pow((red / 255), 2) +
    pGreen * Math.pow((green / 255), 2) +
    pBlue * Math.pow((blue / 255), 2)
  )

  return contrast > 0.5
    ? '#000000'
    : '#ffffff'
}
