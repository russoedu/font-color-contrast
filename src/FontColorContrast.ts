import { cssNamedColors } from './cssNamedColors'

export enum NumberType {
  COLOR = 0xff,
  RGB = 0xffffff,
  THRESHOLD = 1,
}

export class FontColorContrast {
  red = 0
  green = 0
  blue = 0

  #hexColorOrRedOrArray: string | number | number[]
  #greenOrThreshold?: number
  #blue?: number
  #threshold?: number

  /**
   * Contrast threshold to control the resulting font color, float values from 0 to 1. Default is 0.5
   */
  threshold = 0.5

  /**
   * Sets the #params in the instance
   * @param hexColorOrRedOrArray One of the options: hex color number, hex color string, array with red, green and blue or string or the red portion of the color
   * @param greenOrThreshold The green portion of the color or the contrast threshold to control the resulting font color
   * @param blue The blue portion of the color
   * @param threshold Contrast threshold to control the resulting font color
   */
  constructor (hexColorOrRedOrArray: string | number | number[], greenOrThreshold?: number, blue?: number, threshold?: number) {
    this.#hexColorOrRedOrArray = hexColorOrRedOrArray
    this.#greenOrThreshold = greenOrThreshold
    this.#blue = blue
    this.#threshold = threshold
  }

  /**
   * Analyses the color (normally used in the background) and retrieves what color (black or white) has a better contrast.
   * @returns The best contrast between black and white
   */
  getColor () {
    if (this.isRgb()) {
      this.setColorsFromRgbNumbers()
    } else if (this.isHexString()) {
      this.setColorsFromHexString()
    } else if (this.isNumber()) {
      this.setColorsFromNumber()
    } else if (this.isArray()) {
      this.setColorsFromArray()
    } else {
      return '#ffffff'
    }

    return this.contrastFromHSP()
  }

  /**
   * Checks if the color is set as RGB on each param
   * @returns True if color is set as RGB on each param
   */
  isRgb () {
    return (
      FontColorContrast.isValidNumber(this.#hexColorOrRedOrArray, NumberType.COLOR) &&
      FontColorContrast.isValidNumber(this.#greenOrThreshold, NumberType.COLOR) &&
      FontColorContrast.isValidNumber(this.#blue, NumberType.COLOR) &&
      FontColorContrast.isValidNumber(this.#threshold, NumberType.THRESHOLD)
    )
  }

  /**
   * Checks if color is set on the first param as a hex string and removes the hash of it
   * @returns True if color is a hex string
   */
  isHexString () {
    const [cleanString, hexNum] = this.getCleanStringAndHexNum()

    if (FontColorContrast.isValidNumber(hexNum, NumberType.RGB) &&
        FontColorContrast.isValidNumber(this.#greenOrThreshold, NumberType.THRESHOLD) &&
        FontColorContrast.isNotSet(this.#blue) &&
        FontColorContrast.isNotSet(this.#threshold)
    ) {
      this.#hexColorOrRedOrArray = cleanString
      return true
    }
    return false
  }

  /**
   * Checks if color is set on the first param as a number
   * @returns True if color is a valid RGB nunbernumber
   */
  isNumber () {
    return (
      FontColorContrast.isValidNumber(this.#hexColorOrRedOrArray, NumberType.RGB) &&
      FontColorContrast.isValidNumber(this.#greenOrThreshold, NumberType.THRESHOLD) &&
      FontColorContrast.isNotSet(this.#blue) &&
      FontColorContrast.isNotSet(this.#threshold)
    )
  }

  /**
   * Checks if color is set as an RGB array
   * @returns True if color is set as an RGB array
   */
  isArray () {
    return (
      Array.isArray(this.#hexColorOrRedOrArray) &&
      this.#hexColorOrRedOrArray.length === 3 &&
      FontColorContrast.isValidNumber(this.#hexColorOrRedOrArray[0], NumberType.COLOR) &&
      FontColorContrast.isValidNumber(this.#hexColorOrRedOrArray[1], NumberType.COLOR) &&
      FontColorContrast.isValidNumber(this.#hexColorOrRedOrArray[2], NumberType.COLOR) &&
      FontColorContrast.isValidNumber(this.#greenOrThreshold, NumberType.THRESHOLD) &&
      FontColorContrast.isNotSet(this.#blue) &&
      FontColorContrast.isNotSet(this.#threshold)
    )
  }

  /**
   * Converts a color array or separated in RGB to the respective RGB values
   * @example All these examples produces the same value
   * arrayOrRgbToRGB(0, 0xcc, 153)
   * arrayOrRgbToRGB(0x0, 0xcc, 153)
   * arrayOrRgbToRGB(0, 204, 0x99)
   */
  setColorsFromRgbNumbers (): void {
    this.red = this.#hexColorOrRedOrArray as number
    this.green = this.#greenOrThreshold as number
    this.blue = this.#blue as number
    this.setThreshold(this.#threshold)
  }

  /**
   * Converts a color array or separated in RGB to the respective RGB values
   * @param this.#hexColorOrRedOrArray The RGB array
   * @param threshold The threshold
   * @example All these examples produces the same value
   * arrayOrRgbToRGB([0, 0xcc, 153])
   * arrayOrRgbToRGB([0x0, 0xcc, 153])
   * arrayOrRgbToRGB([0, 204, 0x99])
   */
  setColorsFromArray (): void {
    this.red = (this.#hexColorOrRedOrArray as number[])[0]
    this.green = (this.#hexColorOrRedOrArray as number[])[1]
    this.blue = (this.#hexColorOrRedOrArray as number[])[2]
    this.setThreshold(this.#greenOrThreshold)
  }

  /**
   * Converts a ColorIntensity string or number, with all possibilities (e.g. '#009', '009', '#000099', '000099', 153, 0x00099) to the respective RGB values
   * @param hexColor The color string or number
   * @param threshold The threshold
   * @example All these examples produces the same value
   * hexColorToRGB('#0C9')
   * hexColorToRGB('0C9')
   * hexColorToRGB('#00CC99')
   * hexColorToRGB('00cc99')
   * hexColorToRGB(52377)
   * hexColorToRGB(0x00Cc99)
   */
  setColorsFromHexString (): void {
    switch ((this.#hexColorOrRedOrArray as string).length) {
      // Color has one char for each color, so they must be repeated
      case 3:
        this.red = parseInt((this.#hexColorOrRedOrArray as string)[0].repeat(2), 16)
        this.green = parseInt((this.#hexColorOrRedOrArray as string)[1].repeat(2), 16)
        this.blue = parseInt((this.#hexColorOrRedOrArray as string)[2].repeat(2), 16)
        break
      // All chars are filled, so no transformation is needed
      default:
        this.red = parseInt((this.#hexColorOrRedOrArray as string).substring(0, 2), 16)
        this.green = parseInt((this.#hexColorOrRedOrArray as string).substring(2, 4), 16)
        this.blue = parseInt((this.#hexColorOrRedOrArray as string).substring(4, 6), 16)
        break
    }
    this.setThreshold(this.#greenOrThreshold)
  }

  /**
   * Converts the RGB number and sets the respective RGB values.
   */
  setColorsFromNumber (): void {
    /*
     * The RGB color has 24 bits (8 bits per color).
     * This function uses binary operations for better performance, but can be tricky to understand. A 24 bits color could be represented as RRRRRRRR GGGGGGGG BBBBBBBB (the first 8 bits are red, the middle 8 bits are green and the last 8 bits are blue).
     * To get each color we perform some RIGHT SHIFT and AND operations.
     * Gets the first 8 bits of the color by shifting it 16 bits
     * RIGHT SHIFT operation (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Right_shift)
     * AND operation (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_AND)
     */

    // To get red, we shift the 24 bits number 16 bits to the right, leaving the number only with the leftmost 8 bits (RRRRRRRR)
    this.red = (this.#hexColorOrRedOrArray as number) >> 16
    // To get green, the middle 8 bits, we shift it by 8 bits (removing all blue bits - RRRRRRRR GGGGGGGG) and use an AND operation with "0b0000000011111111 = 0xff" to get only the rightmost bits (GGGGGGGG)
    this.green = ((this.#hexColorOrRedOrArray as number) >> 8) & 0xff
    // To get blue we use an AND operation with "0b000000000000000011111111 = 0xff" to get only the rightmost bits (BBBBBBBB)
    this.blue = (this.#hexColorOrRedOrArray as number) & 0xff
    this.setThreshold(this.#greenOrThreshold)
  }

  /**
   * Sets the threshold to the passed value (if valid - less than or equal 1) or the dafault (0.5)
   * @param threshold The passed threshold or undefined if not passed
   */
  setThreshold (threshold: any) {
    this.threshold = threshold || this.threshold
  }

  /**
   * Verifies if a number is a valid color number (numberType = NumberType.COLOR = 0xff) or a valid RGB (numberType = NumberType.RGB = 0xffffff) or a valid threshold (numberType = NumberType.THRESHOLD = 1)
   * @param num The number to be checked
   * @param numberType The type of number to be chacked that defines maximum value of the number (default = NumberType.COLOR = 0xff)
   * @returns True if the number is valid
   */
  static isValidNumber (num: any, numberType: NumberType): boolean {
    if (numberType === NumberType.THRESHOLD && (num === undefined || num === null)) return true
    return (
      num !== undefined &&
      num !== null &&
      typeof num === 'number' &&
      num >= 0 &&
      num <= numberType
    )
  }

  /**
   * Verifies if a string is a valig string to be used as a color and if true, returns the correspondent hex number
   * @returns Array with an empty string and false if the string is invalid or an array with the clean string and the converted string number]
   */
  getCleanStringAndHexNum (): ['', false]|[string, number] {
    if (typeof this.#hexColorOrRedOrArray !== 'string') return ['', false]

    const cleanRegEx = /(#|\s)/ig

    const namedColor = cssNamedColors.find(color => color.name === this.#hexColorOrRedOrArray)

    if (namedColor) {
      this.#hexColorOrRedOrArray = namedColor.hex.replace(cleanRegEx, '')
    }
    const cleanString = (this.#hexColorOrRedOrArray).replace(cleanRegEx, '')
    if (cleanString.length !== 3 && cleanString.length !== 6) return ['', false]

    const hexNum = Number('0x' + cleanString)

    return [cleanString, hexNum]
  }

  /**
   * Verifies if a value is not set
   * @param value The value that should be undefined or null
   * @returns True if the value is not set
   */
  static isNotSet (value: any): boolean {
    return (value === undefined || value === null)
  }

  /**
   * Calculates the best color (black or white) to contrast with the passed RGB color using the algorithm from https://alienryderflex.com/hsp.html
   * @returns Black or White depending on the best possible contrast
   */
  contrastFromHSP (): '#000000'|'#ffffff' {
    const pRed = 0.299
    const pGreen = 0.587
    const pBlue = 0.114

    const contrast = Math.sqrt(
      pRed * (this.red / 255) ** 2 +
      pGreen * (this.green / 255) ** 2 +
      pBlue * (this.blue / 255) ** 2
    )

    return contrast > this.threshold
      ? '#000000'
      : '#ffffff'
  }
}
