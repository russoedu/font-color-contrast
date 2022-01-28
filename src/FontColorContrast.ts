enum NumberType {
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
      FontColorContrast.isValidNumber(this.#hexColorOrRedOrArray) &&
      FontColorContrast.isValidNumber(this.#greenOrThreshold) &&
      FontColorContrast.isValidNumber(this.#blue) &&
      FontColorContrast.isValidNumber(this.#threshold, NumberType.THRESHOLD)
    )
  }

  /**
   * Checks if color is set on the first param as a hex string and removes the hash of it
   * @returns True if color is a hex string
   */
  isHexString () {
    const cleanRegEx = /(#|\s)/ig

    if (typeof this.#hexColorOrRedOrArray !== 'string') return false

    const cleanString = (this.#hexColorOrRedOrArray).replace(cleanRegEx, '')
    const hexNum = Number('0x' + cleanString)

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
   * @returns True if color is a number
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
      FontColorContrast.isValidNumber(this.#hexColorOrRedOrArray[0]) &&
      FontColorContrast.isValidNumber(this.#hexColorOrRedOrArray[1]) &&
      FontColorContrast.isValidNumber(this.#hexColorOrRedOrArray[2]) &&
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
    this.red = FontColorContrast.getValidNumber(this.#hexColorOrRedOrArray as number)
    this.green = FontColorContrast.getValidNumber(this.#greenOrThreshold as number)
    this.blue = FontColorContrast.getValidNumber(this.#blue as number)
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
    this.red = FontColorContrast.getValidNumber((this.#hexColorOrRedOrArray as number[])[0])
    this.green = FontColorContrast.getValidNumber((this.#hexColorOrRedOrArray as number[])[1])
    this.blue = FontColorContrast.getValidNumber((this.#hexColorOrRedOrArray as number[])[2])
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
    const color = this.#hexColorOrRedOrArray as string

    switch (color.length) {
      case 3:
      // Color has one char for each color, so they must be repeated
        this.red = parseInt(color[0].repeat(2), 16)
        this.green = parseInt(color[1].repeat(2), 16)
        this.blue = parseInt(color[2].repeat(2), 16)
        break
      // All chars are filled, so no transformation is needed
      case 6:
        this.red = parseInt(color.substring(0, 2), 16)
        this.green = parseInt(color.substring(2, 4), 16)
        this.blue = parseInt(color.substring(4, 6), 16)
        break
      default:
        this.red = 0
        this.green = 0
        this.blue = 0
        break
    }
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
  setColorsFromNumber (): void {
    const color = this.getColorIntensityColor()

    switch (color.length) {
      // Color has one or two chars in the last digit, so the last digit must be repeated, and red and green are 0
      case 1:
      case 2:
      // Color has two chars in the last digit, so red and green are 0
        this.red = 0
        this.green = 0
        this.blue = FontColorContrast.hexToDec(color)
        break
      case 3:
      // Color has one chars for each color, so they must be repeated
        this.red = FontColorContrast.hexToDec(color[0].repeat(2))
        this.green = FontColorContrast.hexToDec(color[1].repeat(2))
        this.blue = FontColorContrast.hexToDec(color[2].repeat(2))
        break
      case 4:
      // Color has only four chars, so red is 0
        this.red = 0
        this.green = FontColorContrast.hexToDec(color.substring(0, 2))
        this.blue = FontColorContrast.hexToDec(color.substring(2, 4))
        break
      default:
        // All chars are filled, so no transformation is needed
        this.red = FontColorContrast.hexToDec(color.substring(0, 2))
        this.green = FontColorContrast.hexToDec(color.substring(2, 4))
        this.blue = FontColorContrast.hexToDec(color.substring(4, 6))
        break
    }
    this.setThreshold(this.#greenOrThreshold)
  }

  /**
   * Sets the threshold to the passed value (if valid - less than or equal 1) or the dafault (0.5)
   * @param threshold The passed threshold or undefined if not passed
   */
  setThreshold (threshold?: number) {
    const def = 0.5
    const max = 1

    if (threshold === undefined) this.threshold = def
    else this.threshold = FontColorContrast.getValidNumber(threshold, max, def)
  }

  /**
   * Checks if the value is between 0 and max. If not, returns 0
   * @param value The color or threshold to be checked
   * @param max The maximum value (default = 255)
   * @param responseIfError The response in case the number is outside the expected values
   * @returns
   */
  static getValidNumber (value: number, max = 255, responseIfError = 0): number {
    if (isNaN(value) || !isFinite(value) || value < 0 || value > max) return responseIfError
    return value
  }

  /**
   * Converts the color to its hex string value
   * @param this.#hexColorOrRedOrArray The color string or number
   * @returns The color string
   */
  getColorIntensityColor (): string {
    const hashRegEx = /#/
    const hexRegEx = /0x/i

    const hasHash = hashRegEx.test(this.#hexColorOrRedOrArray as string)
    const hasHex = hexRegEx.test(this.#hexColorOrRedOrArray as string)

    if (typeof this.#hexColorOrRedOrArray === 'number') {
      if (isNaN(this.#hexColorOrRedOrArray) || !isFinite(this.#hexColorOrRedOrArray) || this.#hexColorOrRedOrArray < 0 || this.#hexColorOrRedOrArray > 0xffffff) return '000'
      return this.#hexColorOrRedOrArray.toString(16)
    } else {
      let clean = this.#hexColorOrRedOrArray as string
      if (hasHash) {
        clean = (this.#hexColorOrRedOrArray as string).replace(hashRegEx, '')
      } else if (hasHex) {
        clean = (this.#hexColorOrRedOrArray as string).replace(hexRegEx, '')
      }
      const numColor = Number(`0x${clean}`)
      if (isNaN(numColor) || !isFinite(numColor) || numColor < 0 || numColor > 0xffffff) return '000'
      return clean
    }
  }

  /**
   * Converts a hexadecimal string to it's correspondent integer
   * @param hexString The hexadecimal string
   * @returns The integer value
   */
  static hexToDec (hexString: string): number {
    const hexRegex = /^[a-fA-F0-9]{1,2}$/
    const hexExec = hexRegex.exec(hexString)
    if (hexExec) {
      return FontColorContrast.getValidNumber(parseInt(hexString, 16))
    }
    return 0
  }

  /**
   * Verifies if a number is a valid color number (numberType = NumberType.COLOR = 0xff) or a valid RGB (numberType = NumberType.RGB = 0xffffff) or a valid threshold (numberType = NumberType.THRESHOLD = 1)
   * @param num The number to be checked
   * @param numberType The type of number to be chacked that defines maximum value of the number (default = NumberType.COLOR = 0xff)
   * @returns True if the number is valid
   */
  static isValidNumber (num: any, numberType = NumberType.COLOR): boolean {
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
      pRed * Math.pow((this.red / 255), 2) +
    pGreen * Math.pow((this.green / 255), 2) +
    pBlue * Math.pow((this.blue / 255), 2)
    )

    return contrast > this.threshold
      ? '#000000'
      : '#ffffff'
  }
}
