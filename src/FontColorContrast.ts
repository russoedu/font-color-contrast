type ColorIntensity = number | string

export class FontColorContrast {
  red = 0
  green = 0
  blue = 0
  /**
   * Contrast threshold to control the resulting font color, float values from 0 to 1. Default is 0.5
   */
  threshold = 0.5
  #threshold: number|undefined

  getColor (hexColorOrRedOrArray: string | number | number[], greenOrThreshold?: number, blue?: number, threshold?: number) {
    if (blue !== undefined) {
      // Color is set as RGB on each param
      this.setColorsFromNumbers(hexColorOrRedOrArray as number, greenOrThreshold as number, blue as number, threshold)
    } else if (Array.isArray(hexColorOrRedOrArray)) {
      // Color is set as an RGB array
      this.setColorsFromArray(hexColorOrRedOrArray as number[], greenOrThreshold)
    } else if (
      typeof hexColorOrRedOrArray === 'string' ||
        (typeof hexColorOrRedOrArray === 'number' && !isNaN(hexColorOrRedOrArray))
    ) {
      // Color is set on the first param as a number or a string
      this.setColorsFromHex(hexColorOrRedOrArray as ColorIntensity, greenOrThreshold)
    } else {
      // Not a color, respond with white color
      return '#ffffff'
    }
    if (this.#threshold !== undefined) this.threshold = this.#threshold
    return this.contrastFromHSP()
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
    this.#threshold = threshold
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
    this.red = isNaN(colorArray[0]) ? 0 : colorArray[0]
    this.green = isNaN(colorArray[1]) ? 0 : colorArray[1]
    this.blue = isNaN(colorArray[2]) ? 0 : colorArray[2]
    this.#threshold = threshold
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
    this.red = red
    this.green = green
    this.blue = blue
    this.#threshold = threshold
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

    if (typeof hexColor === 'number') return hexColor.toString(16)
    else if (hasHash) return hexColor.replace(hashRegEx, '')
    else if (hasHex) return hexColor.replace(hexRegEx, '')
    else return hexColor
  }

  /**
   * Converts a hexadecimal string to it's correspondent integer
   * @param hexString The hexadecimal string
   * @returns The integer value
   */
  static hexToDec (hexString: string): number {
    const parsed = parseInt(hexString, 16)
    return isNaN(parsed) ? 0 : parsed
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
