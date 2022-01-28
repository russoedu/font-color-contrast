import { FontColorContrast } from './FontColorContrast'

/**
 * Analyses the color (normally used in the background) and retrieves what color (black or white) has a better contrast.
 * @param hex The hex color number that must be a valid hexadecimal color number.
 * @param threshold Contrast threshold to control the resulting font color, float values from 0 to 1. Default is 0.5.
 * @example fontColorContrast(0XF3DC56) === fontColorContrast(15981654)
 */
function fontColorContrast (hex: number, threshold?: number): '#ffffff'|'#000000'

/**
 * Analyses the color (normally used in the background) and retrieves what color (black or white) has a better contrast.
 * @param hex The hex color string that must be a valid hexadecima color number to work correctly. Works with or without '#', with 3 or 6 color chars. Any other length or an invalid hex character will be ignored. A space is allowed between the hash symbol and the number.
 * @param threshold Contrast threshold to control the resulting font color, float values from 0 to 1. Default is 0.5.
 * @example fontColorContrast('00FFDD') === fontColorContrast('0FD') === fontColorContrast('#00FFDD') === fontColorContrast('#0FD') === fontColorContrast('# 00FFDD') === fontColorContrast('# 0FD')
 */
 function fontColorContrast (hex: string, threshold?: number): '#ffffff'|'#000000'

/**
 * Analyses the color (normally used in the background) and retrieves what color (black or white) has a better contrast.
 * @param red The red portion of the color. Must be a number between 0 and 255.
 * @param green The green portion of the color. Must be a number between 0 and 255.
 * @param blue The blue portion of the color. Must be a number between 0 and 255.
 * @example fontColorContrast('00', 'F3', D8) === fontColorContrast(0, 243, 216) === fontColorContrast(0x0, 0xF3, 0xd8).
 * @param threshold Contrast threshold to control the resulting font color, float values from 0 to 1. Default is 0.5.
 */
function fontColorContrast (red: number, green: number, blue: number, threshold?: number): '#ffffff'|'#000000'

/**
 * Analyses the color (normally used in the background) and retrieves what color (black or white) has a better contrast.
 * @param rgbArray Array with red, green and blue. Each value must be a number between 0 and 255.
 * @param threshold Contrast threshold to control the resulting font color, float values from 0 to 1. Default is 0.5.
 * @example fontColorContrast(fontColorContrast([0, 243, 216]) === fontColorContrast([0x0, 0xF3, 0xd8])
 */
function fontColorContrast(rgbArray: number[], threshold?: number): '#ffffff'|'#000000'

function fontColorContrast (hexColorOrRedOrArray: string | number | number[], greenOrThreshold?: number, blue?: number, threshold?: number) {
  const fcc = new FontColorContrast(hexColorOrRedOrArray, greenOrThreshold, blue, threshold)
  return fcc.getColor()
}

export default fontColorContrast
