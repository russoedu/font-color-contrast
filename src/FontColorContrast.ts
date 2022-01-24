type ColorIntensity = number | string
enum ParamType {
  HEX,
  ARRAY,
  RGB,
  ERROR,
}
export class FontColorContrast {
  red = 0
  green = 0
  blue = 0

  /**
   * Contrast threshold to control the resulting font color, float values from 0 to 1. Default is 0.5
   */
  threshold = 0.5

  getColor (hexColorOrRedOrArray: string | number | number[], greenOrThreshold?: number, blue?: number, threshold?: number) {
    const type = FontColorContrast.getParamType(hexColorOrRedOrArray, greenOrThreshold, blue, threshold)

    switch (type) {
      case ParamType.RGB:
        this.setColorsFromNumbers(hexColorOrRedOrArray as number, greenOrThreshold as number, blue as number, threshold)
        break
      case ParamType.ARRAY:
        this.setColorsFromArray(hexColorOrRedOrArray as number[], greenOrThreshold)
        break
      case ParamType.HEX:
        this.setColorsFromHex(hexColorOrRedOrArray as ColorIntensity, greenOrThreshold)
        break
      default:
        return '#ffffff'
    }

    return this.contrastFromHSP()
  }

  /**
   * Checks the param type
   * @param hexColorOrRedOrArray
   * @param greenOrThreshold
   * @param blue
   * @param threshold
   * @returns The param Type
   */
  static getParamType (hexColorOrRedOrArray: string | number | number[], greenOrThreshold?: number, blue?: number, threshold?: number) {
    if (FontColorContrast.isRgb(hexColorOrRedOrArray, greenOrThreshold, blue)) return ParamType.RGB
    if (FontColorContrast.isHex(hexColorOrRedOrArray, blue, threshold)) return ParamType.HEX
    if (FontColorContrast.isArray(hexColorOrRedOrArray)) return ParamType.ARRAY
    return ParamType.ERROR
  }

  /**
   * Checks if the color is set as RGB on each param
   * @returns True if color is set as RGB on each param
   */
  static isRgb (hexColorOrRedOrArray: string | number | number[], greenOrThreshold?: number, blue?: number) {
    return (
      hexColorOrRedOrArray !== undefined &&
      hexColorOrRedOrArray !== null &&
      greenOrThreshold !== undefined &&
      greenOrThreshold !== null &&
      blue !== undefined &&
      blue !== null
    )
  }

  /**
   * Checks if color is set on the first param as a number or a string
   * @returns True if color is set on the first param as a number or a string
   */
  static isHex (hexColorOrRedOrArray: string | number | number[], blue?: number, threshold?: number) {
    return (
      (typeof hexColorOrRedOrArray === 'string' || typeof hexColorOrRedOrArray === 'number') &&
        (blue === undefined || blue === null) &&
        (threshold === undefined || threshold === null)
    )
  }

  /**
   * Checks if color is set as an RGB array
   * @returns True if color is set as an RGB array
   */
  static isArray (hexColorOrRedOrArray: string | number | number[]) {
    return (
      Array.isArray(hexColorOrRedOrArray) &&
      hexColorOrRedOrArray.length === 3 &&
      typeof hexColorOrRedOrArray[0] === 'number' &&
      typeof hexColorOrRedOrArray[1] === 'number' &&
      typeof hexColorOrRedOrArray[2] === 'number'

    )
  }

  /**
   * Converts a color array or separated in RGB to the respective RGB values
   * @param red The color red
   * @param green The color green
   * @param blue The color blue
   * @param threshold The threshold
   * @example All these examples produces the same value
   * arrayOrRgbToRGB(0, 0xcc, 153)
   * arrayOrRgbToRGB(0x0, 0xcc, 153)
   * arrayOrRgbToRGB(0, 204, 0x99)
   */
  setColorsFromNumbers (red: number, green: number, blue: number, threshold?: number): void {
    this.red = FontColorContrast.getValidNumber(red)
    this.green = FontColorContrast.getValidNumber(green)
    this.blue = FontColorContrast.getValidNumber(blue)
    this.setThreshold(threshold)
  }

  /**
   * Converts a color array or separated in RGB to the respective RGB values
   * @param colorArray The RGB array
   * @param threshold The threshold
   * @example All these examples produces the same value
   * arrayOrRgbToRGB([0, 0xcc, 153])
   * arrayOrRgbToRGB([0x0, 0xcc, 153])
   * arrayOrRgbToRGB([0, 204, 0x99])
   */
  setColorsFromArray (colorArray: number[], threshold?: number): void {
    this.red = FontColorContrast.getValidNumber(colorArray[0])
    this.green = FontColorContrast.getValidNumber(colorArray[1])
    this.blue = FontColorContrast.getValidNumber(colorArray[2])
    this.setThreshold(threshold)
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
  setColorsFromHex (hexColor: string|number, threshold?: number): void {
    const color = FontColorContrast.getColorIntensityColor(hexColor)

    switch (color.length) {
      case 1:
      // Color has only a single char in the last digit, so the last digit must be repeated, and red and green are 0
        this.red = 0
        this.green = 0
        this.blue = FontColorContrast.hexToDec(color.repeat(2))
        break
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
    this.setThreshold(threshold)
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
   * Converts the color as ColorIntensity to its string values
   * @param hexColor The color string or number
   * @returns The color string
   */
  static getColorIntensityColor (hexColor: string|number): string {
    const hashRegEx = /#/
    const hexRegEx = /0x/i

    const hasHash = hashRegEx.test(hexColor as string)
    const hasHex = hexRegEx.test(hexColor as string)

    if (typeof hexColor === 'number') {
      if (isNaN(hexColor) || !isFinite(hexColor) || hexColor < 0 || hexColor > 0xffffff) return '000'
      return hexColor.toString(16)
    } else {
      let clean = hexColor
      if (hasHash) {
        clean = hexColor.replace(hashRegEx, '')
      } else if (hasHex) {
        clean = hexColor.replace(hexRegEx, '')
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
    const hexRegex = /^[a-fA-F0-9]{2}$/
    const hexExec = hexRegex.exec(hexString)
    if (hexExec) {
      return FontColorContrast.getValidNumber(parseInt(hexString, 16))
    }
    return 0
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
