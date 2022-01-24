import { FontColorContrast } from './FontColorContrast'

describe('constructor()', () => {
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
})

describe('getColor()', () => {
  const fcc = new FontColorContrast()
  let setColorsFromNumbers: jest.SpyInstance<void, [red: number, green: number, blue: number, threshold?: number]>
  let setColorsFromHex: jest.SpyInstance<void, [hexColor: string | number, threshold?: number]>
  let setColorsFromArray: jest.SpyInstance<void, [colorArray: number[], threshold?: number]>

  beforeEach(() => {
    setColorsFromNumbers = jest
      .spyOn(fcc, 'setColorsFromNumbers')
      .mockImplementation(() => null)
    setColorsFromHex = jest
      .spyOn(fcc, 'setColorsFromHex')
      .mockImplementation(() => null)
    setColorsFromArray = jest
      .spyOn(fcc, 'setColorsFromArray')
      .mockImplementation(() => null)
    jest
      .spyOn(fcc, 'contrastFromHSP')
      .mockImplementation(() => '#000000')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('number colors type were identified correctly', () => {
    fcc.getColor(10, 20, 255, 0.3)
    expect(setColorsFromNumbers).toHaveBeenCalledWith(10, 20, 255, 0.3)

    fcc.getColor(-10, NaN, Infinity, 15)
    expect(setColorsFromNumbers).toHaveBeenCalledWith(-10, NaN, Infinity, 15)
  })

  test('array of colors type were identified correctly', () => {
    fcc.getColor([10, 20, 5000], 0.3)
    expect(setColorsFromArray).toHaveBeenCalledWith([10, 20, 5000], 0.3)

    fcc.getColor([-10, NaN, Infinity], 15)
    expect(setColorsFromArray).toHaveBeenCalledWith([-10, NaN, Infinity], 15)
  })

  test('hex string colors type were identified correctly', () => {
    fcc.getColor('#b75301')
    expect(setColorsFromHex).toHaveBeenCalledWith('#b75301', undefined)

    fcc.getColor('#BF4', 0.2)
    expect(setColorsFromHex).toHaveBeenCalledWith('#BF4', 0.2)

    fcc.getColor('hello', 0.2)
    expect(setColorsFromHex).toHaveBeenCalledWith('hello', 0.2)
  })

  test('hex number colors type were identified correctly', () => {
    fcc.getColor(0xb75301)
    expect(setColorsFromHex).toHaveBeenCalledWith(0xb75301, undefined)

    fcc.getColor(0xBF4, 1)
    expect(setColorsFromHex).toHaveBeenCalledWith(0xBF4, 1)

    fcc.getColor(3060, 0)
    expect(setColorsFromHex).toHaveBeenCalledWith(3060, 0)

    fcc.getColor(-8, 0)
    expect(setColorsFromHex).toHaveBeenCalledWith(-8, 0)

    fcc.getColor(NaN, 0)
    expect(setColorsFromHex).toHaveBeenCalledWith(NaN, 0)

    fcc.getColor(Infinity, 0)
    expect(setColorsFromHex).toHaveBeenCalledWith(Infinity, 0)

    expect(setColorsFromHex).toHaveBeenCalledTimes(6)
  })

  test('invalid params should not call any conversion', () => {
    fcc.getColor(['asd', 'fgv', 123] as number[])
    expect(setColorsFromArray).toHaveBeenCalledTimes(0)
    expect(setColorsFromHex).toHaveBeenCalledTimes(0)
    expect(setColorsFromNumbers).toHaveBeenCalledTimes(0)

    fcc.getColor([0, 2, 3, 4])
    expect(setColorsFromArray).toHaveBeenCalledTimes(0)
    expect(setColorsFromHex).toHaveBeenCalledTimes(0)
    expect(setColorsFromNumbers).toHaveBeenCalledTimes(0)

    fcc.getColor({ test: 3 } as unknown as number, 0)
    expect(setColorsFromArray).toHaveBeenCalledTimes(0)
    expect(setColorsFromHex).toHaveBeenCalledTimes(0)
    expect(setColorsFromNumbers).toHaveBeenCalledTimes(0)

    fcc.getColor(new Error('error') as unknown as string)
    expect(setColorsFromArray).toHaveBeenCalledTimes(0)
    expect(setColorsFromHex).toHaveBeenCalledTimes(0)
    expect(setColorsFromNumbers).toHaveBeenCalledTimes(0)

    fcc.getColor(1, undefined, 3, 0)
    expect(setColorsFromArray).toHaveBeenCalledTimes(0)
    expect(setColorsFromHex).toHaveBeenCalledTimes(0)
    expect(setColorsFromNumbers).toHaveBeenCalledTimes(0)

    fcc.getColor(1, 2, undefined, 0)
    expect(setColorsFromArray).toHaveBeenCalledTimes(0)
    expect(setColorsFromHex).toHaveBeenCalledTimes(0)
    expect(setColorsFromNumbers).toHaveBeenCalledTimes(0)

    fcc.getColor(null as unknown as number, 7, 3, 0)
    expect(setColorsFromArray).toHaveBeenCalledTimes(0)
    expect(setColorsFromHex).toHaveBeenCalledTimes(0)
    expect(setColorsFromNumbers).toHaveBeenCalledTimes(0)
  })
})

describe('setColorsFromNumbers(red, gree, blue, threshold?)', () => {
  const fcc = new FontColorContrast()

  test('all possible combinations are set correctly', () => {
    const results: number[][] = []

    fcc.setColorsFromNumbers(0, 84, 600)
    results.push([fcc.red, fcc.green, fcc.blue])

    fcc.setColorsFromNumbers(0x0, 0x54, 0x258)
    results.push([fcc.red, fcc.green, fcc.blue])

    for (let i = 0; i < results.length; i++) {
      const element = results[i]
      expect(element[0]).toBe(0)
      expect(element[1]).toBe(84)
      expect(element[2]).toBe(0)
    }
  })

  test('colors are set correctly', () => {
    fcc.setColorsFromNumbers(123, 255, 0)
    expect(fcc.red).toBe(123)
    expect(fcc.green).toBe(255)
    expect(fcc.blue).toBe(0)
    expect(fcc.threshold).toBe(0.5)
  })

  test('hex colors are converted', () => {
    fcc.setColorsFromNumbers(0x7b, 0xff, 0, 0.2)
    expect(fcc.red).toBe(123)
    expect(fcc.green).toBe(255)
    expect(fcc.blue).toBe(0)
    expect(fcc.threshold).toBe(0.2)
  })

  test('bad colors are reset', () => {
    fcc.setColorsFromNumbers(-3, 256, 852, 3)
    expect(fcc.red).toBe(0)
    expect(fcc.green).toBe(0)
    expect(fcc.blue).toBe(0)
    expect(fcc.threshold).toBe(0.5)
  })

  test('NaN and Infinity colors are reset', () => {
    fcc.setColorsFromNumbers(3, NaN, Infinity, 3)
    expect(fcc.red).toBe(3)
    expect(fcc.green).toBe(0)
    expect(fcc.blue).toBe(0)
    expect(fcc.threshold).toBe(0.5)
  })
})

describe('setColorsFromArray([red, gree, blue], threshold?)', () => {
  const fcc = new FontColorContrast()

  test('all possible combinations are set correctly', () => {
    const results: number[][] = []

    fcc.setColorsFromArray([0, 84, 600])
    results.push([fcc.red, fcc.green, fcc.blue])

    fcc.setColorsFromArray([0x0, 0x54, 0x258])
    results.push([fcc.red, fcc.green, fcc.blue])

    for (let i = 0; i < results.length; i++) {
      const element = results[i]
      expect(element[0]).toBe(0)
      expect(element[1]).toBe(84)
      expect(element[2]).toBe(0)
    }
  })

  test('colors are set correctly', () => {
    fcc.setColorsFromArray([123, 255, 0])
    expect(fcc.red).toBe(123)
    expect(fcc.green).toBe(255)
    expect(fcc.blue).toBe(0)
    expect(fcc.threshold).toBe(0.5)
  })

  test('hex colors are converted', () => {
    fcc.setColorsFromArray([0x7b, 0xff, 0], 0.2)
    expect(fcc.red).toBe(123)
    expect(fcc.green).toBe(255)
    expect(fcc.blue).toBe(0)
    expect(fcc.threshold).toBe(0.2)
  })

  test('bad colors are reset', () => {
    fcc.setColorsFromArray([-3, 256, 852], 3)
    expect(fcc.red).toBe(0)
    expect(fcc.green).toBe(0)
    expect(fcc.blue).toBe(0)
    expect(fcc.threshold).toBe(0.5)
  })

  test('NaN and Infinity colors are reset', () => {
    fcc.setColorsFromArray([3, NaN, Infinity], 3)
    expect(fcc.red).toBe(3)
    expect(fcc.green).toBe(0)
    expect(fcc.blue).toBe(0)
    expect(fcc.threshold).toBe(0.5)
  })
})

describe('setColorsFromHex(rgb, threshold?)', () => {
  const fcc = new FontColorContrast()
  test('all possible combinations are set correctly', () => {
    const results: number[][] = []

    fcc.setColorsFromHex('#0C9')
    results.push([fcc.red, fcc.green, fcc.blue])

    fcc.setColorsFromHex('0C9')
    results.push([fcc.red, fcc.green, fcc.blue])

    fcc.setColorsFromHex('0x0C9')
    results.push([fcc.red, fcc.green, fcc.blue])

    fcc.setColorsFromHex('0X0C9')
    results.push([fcc.red, fcc.green, fcc.blue])

    fcc.setColorsFromHex('#00CC99')
    results.push([fcc.red, fcc.green, fcc.blue])

    fcc.setColorsFromHex('00CC99')
    results.push([fcc.red, fcc.green, fcc.blue])

    fcc.setColorsFromHex(52377)
    results.push([fcc.red, fcc.green, fcc.blue])

    fcc.setColorsFromHex(0x00CC99)
    results.push([fcc.red, fcc.green, fcc.blue])

    for (let i = 0; i < results.length; i++) {
      const element = results[i]
      expect(element[0]).toBe(0)
      expect(element[1]).toBe(204)
      expect(element[2]).toBe(153)
    }
  })

  test('colors are set correctly', () => {
    fcc.setColorsFromHex(0xb75301, 0)
    expect(fcc.red).toBe(183)
    expect(fcc.green).toBe(83)
    expect(fcc.blue).toBe(1)
    expect(fcc.threshold).toBe(0)
  })

  test('hex colors are converted', () => {
    fcc.setColorsFromHex(12014337, 0.2)
    expect(fcc.red).toBe(183)
    expect(fcc.green).toBe(83)
    expect(fcc.blue).toBe(1)
    expect(fcc.threshold).toBe(0.2)
  })

  test('colors with more than 6 chars are reset', () => {
    fcc.setColorsFromHex(0xb753014cf3a, 3)
    expect(fcc.red).toBe(0)
    expect(fcc.green).toBe(0)
    expect(fcc.blue).toBe(0)
    expect(fcc.threshold).toBe(0.5)
  })

  test('invalid string is reset', () => {
    fcc.setColorsFromHex('asdfg', -3)
    expect(fcc.red).toBe(0)
    expect(fcc.green).toBe(0)
    expect(fcc.blue).toBe(0)
    expect(fcc.threshold).toBe(0.5)
  })

  test('negative string is reset', () => {
    fcc.setColorsFromHex('-0xccc', -3)
    expect(fcc.red).toBe(0)
    expect(fcc.green).toBe(0)
    expect(fcc.blue).toBe(0)
    expect(fcc.threshold).toBe(0.5)
  })

  test('NaN color is reset', () => {
    fcc.setColorsFromHex(NaN, -3)
    expect(fcc.red).toBe(0)
    expect(fcc.green).toBe(0)
    expect(fcc.blue).toBe(0)
    expect(fcc.threshold).toBe(0.5)
  })

  test('Infinity color is reset', () => {
    fcc.setColorsFromHex(Infinity, -3)
    expect(fcc.red).toBe(0)
    expect(fcc.green).toBe(0)
    expect(fcc.blue).toBe(0)
    expect(fcc.threshold).toBe(0.5)
  })

  test('negative color is reset', () => {
    fcc.setColorsFromHex(-6, -3)
    expect(fcc.red).toBe(0)
    expect(fcc.green).toBe(0)
    expect(fcc.blue).toBe(0)
    expect(fcc.threshold).toBe(0.5)
  })
})
