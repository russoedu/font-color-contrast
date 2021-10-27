type ColorIntensity = number | string

function fontColorContrast (hex: string): string
function fontColorContrast (red: ColorIntensity, green: ColorIntensity, blue: ColorIntensity): string
function fontColorContrast (redGreenBlue: ColorIntensity[]): string

function fontColorContrast (hexColorOrRedOrArray: ColorIntensity | ColorIntensity[] | string, green?: ColorIntensity, blue?: ColorIntensity) {
  // Check if the color is hexadecimal (with hash)
  const hash = /#/
  const isHex = hash.test(hexColorOrRedOrArray as string)
  const isRGB = !!(green !== undefined && blue !== undefined)
  const isArray = Array.isArray(hexColorOrRedOrArray)

  // Default is a bright color
  let fontColor = '#ffffff'
  let red = 0

  if (isHex) {
    const color: string = hexColorOrRedOrArray as string
    if (color.length === 4) {
      red = hexToDec(color[1].repeat(2))
      green = hexToDec(color[2].repeat(2))
      blue = hexToDec(color[3].repeat(2))
    } else {
      red = hexToDec(color.substr(1, 2))
      green = hexToDec(color.substr(3, 2))
      blue = hexToDec(color.substr(5, 2))
    }
  } else if (isRGB) {
    red = parseInt(hexColorOrRedOrArray as string)
    green = parseInt(green as string)
    blue = parseInt(blue as string)
  } else if (isArray) {
    red = parseInt(hexColorOrRedOrArray[0] as string)
    green = parseInt(hexColorOrRedOrArray[1] as string)
    blue = parseInt(hexColorOrRedOrArray[2] as string)
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
