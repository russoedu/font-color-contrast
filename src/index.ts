type ColorIntensity = number | string

/**
 * Analyses the color (normally used in the background) and retrieves what color (black or white) has a better contrast.
 * @param hexColorOrRedOrArray The hex color string or the red portion of a color or the full color array
 * @param green The green portion of the color. Must be a number between 0 and 255
 * @param blue The blue portion of the color. Must be a number between 0 and 255
 * @returns Black or White hex color string
 */
 function fontColorContrast (hexColorOrRedOrArray: ColorIntensity | ColorIntensity[] | string, green?: ColorIntensity, blue?: ColorIntensity): '#ffffff' | '#000000'

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
function fontColorContrast (red: ColorIntensity, green: ColorIntensity, blue: ColorIntensity): '#ffffff' | '#000000'

/**
 * Analyses the color (normally used in the background) and retrieves what color (black or white) has a better contrast.
 * @param redGreenBlue Array with red, green and blue. Each value must be a number between 0 and 255
 * @example fontColorContrast(['00', 'F3', 'D8']) === fontColorContrast([0, 243, 216]) === fontColorContrast([0x0, 0xF3, 0xd8])
 */
function fontColorContrast (redGreenBlue: ColorIntensity[]): '#ffffff' | '#000000'

function fontColorContrast (hexColorOrRedOrArray: ColorIntensity | ColorIntensity[] | string, green?: ColorIntensity, blue?: ColorIntensity) {
  // Check if the color is hexadecimal (with hash)
  const hash = /#/
  const hasHash = hash.test(hexColorOrRedOrArray as string)
  const isRGB = !!(green !== undefined && blue !== undefined)
  const isArray = Array.isArray(hexColorOrRedOrArray)
  const isHexString = typeof hexColorOrRedOrArray === 'string' && !isRGB
  const isHexNumber = typeof hexColorOrRedOrArray === 'number' && !isRGB

  // Default is a bright color
  let fontColor = '#ffffff'
  let red = 0

  if (isHexString || isHexNumber) {
    const color: string = isHexNumber
      ? hexColorOrRedOrArray.toString(16)
      : hasHash
        ? (hexColorOrRedOrArray as string).replace(hash, '')
        : hexColorOrRedOrArray as string
    if (color.length === 3) {
      red = hexToDec(color[0].repeat(2))
      green = hexToDec(color[1].repeat(2))
      blue = hexToDec(color[2].repeat(2))
    } else {
      red = hexToDec(color.substr(0, 2))
      green = hexToDec(color.substr(2, 2))
      blue = hexToDec(color.substr(3, 2))
    }
  } else if (isRGB || isArray) {
    let r: ColorIntensity = 0
    let g: ColorIntensity = 0
    let b: ColorIntensity = 0
    if (isArray) {
      b = hexColorOrRedOrArray[2]
      g = hexColorOrRedOrArray[1]
      r = hexColorOrRedOrArray[0]
    } else if (isRGB) {
      b = blue as ColorIntensity
      g = green as ColorIntensity
      r = hexColorOrRedOrArray
    }
    red = typeof r === 'string' && r.length === 1
      ? parseInt('0x' + (r as string).repeat(2))
      : typeof r === 'string'
        ? parseInt('0x' + r)
        : r
    green = typeof g === 'string' && g.length === 1
      ? parseInt('0x' + (g as string).repeat(2))
      : typeof g === 'string'
        ? parseInt('0x' + g)
        : g
    blue = typeof b === 'string' && b.length === 1
      ? parseInt('0x' + (b as string).repeat(2))
      : typeof b === 'string'
        ? parseInt('0x' + b)
        : b
  } else {
    // Not a color, respond with white color
    return fontColor
  }

  const contrast = Math.sqrt(
    red * red * 0.241 +
    green * green * 0.691 +
    blue * blue * 0.068
  )

  if (contrast > 130) {
    fontColor = '#000000'
  }

  return fontColor
}

export default fontColorContrast

function hexToDec (hexString: string) {
  const decString = (hexString).replace(/[^a-f0-9]/gi, '')
  return parseInt(decString, 16)
}
