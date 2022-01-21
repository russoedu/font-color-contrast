import { FontColorContrast } from './FontColorContrast'

describe('FontColorContrast', () => {
  test('instance is created', () => {
    const fcc = new FontColorContrast()
    expect(fcc).toBeInstanceOf(FontColorContrast)
    expect(fcc).toEqual({
      red:       0,
      green:     0,
      blue:      0,
      threshold: 0.5,
    })
  })

  test('number colors type were identified correctly', () => {
    const fcc = new FontColorContrast()
    const setColorsFromNumbers = jest.spyOn(fcc, 'setColorsFromNumbers')

    fcc.getColor(10, 20, 255, 0.3)
    expect(setColorsFromNumbers).toHaveBeenCalledWith(10, 20, 255, 0.3)
    expect(fcc.red).toBe(10)
    expect(fcc.green).toBe(20)
    expect(fcc.blue).toBe(255)
    expect(fcc.threshold).toBe(0.3)
  })

  test('array of colors type were identified correctly', () => {
    const fcc = new FontColorContrast()
    const setColorsFromArray = jest.spyOn(fcc, 'setColorsFromArray')

    fcc.getColor([10, 20, 255], 0.3)
    expect(setColorsFromArray).toHaveBeenCalledWith([10, 20, 255], 0.3)
    expect(fcc.red).toBe(10)
    expect(fcc.green).toBe(20)
    expect(fcc.blue).toBe(255)
    expect(fcc.threshold).toBe(0.3)
  })

  test('hex string colors type were identified and color was converted correctly', () => {
    const fcc = new FontColorContrast()
    const setColorsFromHex = jest.spyOn(fcc, 'setColorsFromHex')

    fcc.getColor('#b75301')
    expect(setColorsFromHex).toHaveBeenCalledWith('#b75301', undefined)
    expect(fcc.red).toBe(183)
    expect(fcc.green).toBe(83)
    expect(fcc.blue).toBe(1)
    expect(fcc.threshold).toBe(0.5)

    fcc.getColor('#BF4', 0.2)
    expect(setColorsFromHex).toHaveBeenCalledWith('#BF4', 0.2)
    expect(fcc.red).toBe(187)
    expect(fcc.green).toBe(255)
    expect(fcc.blue).toBe(68)
    expect(fcc.threshold).toBe(0.2)
  })

  test('hex number colors type were identified and color was converted correctly', () => {
    const fcc = new FontColorContrast()
    const setColorsFromHex = jest.spyOn(fcc, 'setColorsFromHex')

    fcc.getColor(0xb75301)
    expect(setColorsFromHex).toHaveBeenCalledWith(0xb75301, undefined)
    expect(fcc.red).toBe(183)
    expect(fcc.green).toBe(83)
    expect(fcc.blue).toBe(1)
    expect(fcc.threshold).toBe(0.5)

    fcc.getColor(0xBF4, 1)
    expect(setColorsFromHex).toHaveBeenCalledWith(0xBF4, 1)
    expect(fcc.red).toBe(187)
    expect(fcc.green).toBe(255)
    expect(fcc.blue).toBe(68)
    expect(fcc.threshold).toBe(1)

    fcc.getColor(3060, 0)
    expect(setColorsFromHex).toHaveBeenCalledWith(3060, 0)
    expect(fcc.red).toBe(187)
    expect(fcc.green).toBe(255)
    expect(fcc.blue).toBe(68)
    expect(fcc.threshold).toBe(0)
  })
})
