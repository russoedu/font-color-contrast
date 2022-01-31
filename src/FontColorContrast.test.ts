/* eslint-disable no-new-wrappers */
import { FontColorContrast, NumberType } from './FontColorContrast'

describe('constructor()', () => {
  test('instance is created', () => {
    const fcc = new FontColorContrast(1, 2, 3, 4)
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
  let setColorsFromRgbNumbers: jest.SpyInstance<any, unknown[]>
  let setColorsFromHexString: jest.SpyInstance<any, unknown[]>
  let setColorsFromNumber: jest.SpyInstance<any, unknown[]>
  let setColorsFromArray: jest.SpyInstance<any, unknown[]>
  let isRgb: jest.SpyInstance<any, unknown[]>
  let isHexString: jest.SpyInstance<any, unknown[]>
  let isNumber: jest.SpyInstance<any, unknown[]>
  let isArray: jest.SpyInstance<any, unknown[]>
  let contrastFromHSP: jest.SpyInstance<'#000000' | '#ffffff', []>

  beforeEach(() => {
    setColorsFromRgbNumbers = jest
      .spyOn(FontColorContrast.prototype, 'setColorsFromRgbNumbers')
      .mockImplementation(() => null)
    setColorsFromHexString = jest
      .spyOn(FontColorContrast.prototype, 'setColorsFromHexString')
      .mockImplementation(() => null)
    setColorsFromNumber = jest
      .spyOn(FontColorContrast.prototype, 'setColorsFromNumber')
      .mockImplementation(() => null)
    setColorsFromArray = jest
      .spyOn(FontColorContrast.prototype, 'setColorsFromArray')
      .mockImplementation(() => null)
    isRgb = jest
      .spyOn(FontColorContrast.prototype, 'isRgb')
      .mockImplementation(() => false)
    isHexString = jest
      .spyOn(FontColorContrast.prototype, 'isHexString')
      .mockImplementation(() => false)
    isNumber = jest
      .spyOn(FontColorContrast.prototype, 'isNumber')
      .mockImplementation(() => false)
    isArray = jest
      .spyOn(FontColorContrast.prototype, 'isArray')
      .mockImplementation(() => false)
    contrastFromHSP = jest
      .spyOn(FontColorContrast.prototype, 'contrastFromHSP')
      .mockImplementation(() => '#000000')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  test('RGB number colors', () => {
    isRgb.mockImplementation(() => true)
    const fcc = new FontColorContrast(10, 20, 255, 0.3)
    fcc.getColor()
    expect(setColorsFromRgbNumbers).toHaveBeenCalledTimes(1)
    expect(setColorsFromHexString).toHaveBeenCalledTimes(0)
    expect(setColorsFromNumber).toHaveBeenCalledTimes(0)
    expect(setColorsFromArray).toHaveBeenCalledTimes(0)
    expect(contrastFromHSP).toHaveBeenCalledTimes(1)
  })

  test('HEX string', () => {
    isHexString.mockImplementation(() => true)
    const fcc = new FontColorContrast(10, 20, 255, 0.3)
    fcc.getColor()
    expect(setColorsFromRgbNumbers).toHaveBeenCalledTimes(0)
    expect(setColorsFromHexString).toHaveBeenCalledTimes(1)
    expect(setColorsFromNumber).toHaveBeenCalledTimes(0)
    expect(setColorsFromArray).toHaveBeenCalledTimes(0)
    expect(contrastFromHSP).toHaveBeenCalledTimes(1)
  })

  test('HEX number', () => {
    isNumber.mockImplementation(() => true)
    const fcc = new FontColorContrast(10, 20, 255, 0.3)
    fcc.getColor()
    expect(setColorsFromRgbNumbers).toHaveBeenCalledTimes(0)
    expect(setColorsFromHexString).toHaveBeenCalledTimes(0)
    expect(setColorsFromNumber).toHaveBeenCalledTimes(1)
    expect(setColorsFromArray).toHaveBeenCalledTimes(0)
    expect(contrastFromHSP).toHaveBeenCalledTimes(1)
  })

  test('HEX array', () => {
    isArray.mockImplementation(() => true)
    const fcc = new FontColorContrast(10, 20, 255, 0.3)
    fcc.getColor()
    expect(setColorsFromRgbNumbers).toHaveBeenCalledTimes(0)
    expect(setColorsFromHexString).toHaveBeenCalledTimes(0)
    expect(setColorsFromNumber).toHaveBeenCalledTimes(0)
    expect(setColorsFromArray).toHaveBeenCalledTimes(1)
    expect(contrastFromHSP).toHaveBeenCalledTimes(1)
  })

  test('failed params', () => {
    const fcc = new FontColorContrast(10, 20, 255, 0.3)
    fcc.getColor()
    expect(setColorsFromRgbNumbers).toHaveBeenCalledTimes(0)
    expect(setColorsFromHexString).toHaveBeenCalledTimes(0)
    expect(setColorsFromNumber).toHaveBeenCalledTimes(0)
    expect(setColorsFromArray).toHaveBeenCalledTimes(0)
    expect(contrastFromHSP).toHaveBeenCalledTimes(0)
  })
})

describe('isRgb()', () => {
  let isValidNumber: jest.SpyInstance<boolean, [num: any, numberType: number]>

  beforeEach(() => {
    isValidNumber = jest
      .spyOn(FontColorContrast, 'isValidNumber')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('functions are called correctly', () => {
    const fcc = new FontColorContrast(10, 0xff, 255, 0.3)

    expect(fcc.isRgb()).toBeTruthy()
    expect(isValidNumber).toHaveBeenCalledTimes(4)
    expect(isValidNumber).toHaveBeenNthCalledWith(1, 10, NumberType.COLOR)
    expect(isValidNumber).toHaveBeenNthCalledWith(2, 255, NumberType.COLOR)
    expect(isValidNumber).toHaveBeenNthCalledWith(3, 255, NumberType.COLOR)
    expect(isValidNumber).toHaveBeenNthCalledWith(4, 0.3, NumberType.THRESHOLD)
  })

  test('functions are called correctly without threshold', () => {
    const fcc = new FontColorContrast(10, 0xff, 255)

    expect(fcc.isRgb()).toBeTruthy()
    expect(isValidNumber).toHaveBeenCalledTimes(4)
    expect(isValidNumber).toHaveBeenNthCalledWith(1, 10, NumberType.COLOR)
    expect(isValidNumber).toHaveBeenNthCalledWith(2, 255, NumberType.COLOR)
    expect(isValidNumber).toHaveBeenNthCalledWith(3, 255, NumberType.COLOR)
    expect(isValidNumber).toHaveBeenNthCalledWith(4, undefined, NumberType.THRESHOLD)
  })

  test('false on the second param', () => {
    const fcc = new FontColorContrast(10, 0x100, 255, 0.3)

    expect(fcc.isRgb()).toBeFalsy()
    expect(isValidNumber).toHaveBeenCalledWith(256, NumberType.COLOR)
    expect(isValidNumber).toHaveBeenCalledWith(10, NumberType.COLOR)
    expect(isValidNumber).toHaveBeenCalledTimes(2)
  })
})

describe('isHexString()', () => {
  let isValidNumber: jest.SpyInstance<boolean, [num: any, numberType: NumberType]>
  let isNotSet: jest.SpyInstance<boolean, [value: any]>

  beforeEach(() => {
    isValidNumber = jest
      .spyOn(FontColorContrast, 'isValidNumber')

    isNotSet = jest
      .spyOn(FontColorContrast, 'isNotSet')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('result for valid 3 chars string', () => {
    const fcc = new FontColorContrast('fff', 0.6, null as unknown as undefined)

    expect(fcc.isHexString()).toBeTruthy()
    expect(isValidNumber).toHaveBeenCalledTimes(2)
    expect(isValidNumber).toHaveBeenNthCalledWith(1, 0xfff, NumberType.RGB)
    expect(isValidNumber).toHaveBeenNthCalledWith(2, 0.6, NumberType.THRESHOLD)
    expect(isNotSet).toHaveBeenCalledTimes(2)
    expect(isNotSet).toHaveBeenNthCalledWith(1, null)
    expect(isNotSet).toHaveBeenNthCalledWith(2, undefined)
  })

  test('result for valid 3 chars string with hash', () => {
    const fcc = new FontColorContrast('#fff', 0.6)

    expect(fcc.isHexString()).toBeTruthy()
    expect(isValidNumber).toHaveBeenNthCalledWith(1, 0xfff, NumberType.RGB)
    expect(isValidNumber).toHaveBeenNthCalledWith(2, 0.6, NumberType.THRESHOLD)
  })

  test('result for valid 3 chars string with hash and space', () => {
    const fcc = new FontColorContrast('# 000', 0.6)

    expect(fcc.isHexString()).toBeTruthy()
    expect(isValidNumber).toHaveBeenNthCalledWith(1, 0x000, NumberType.RGB)
  })

  test('result for string color with nor 3 or 6 chars', () => {
    const fcc = new FontColorContrast('#fcc3')

    expect(fcc.isHexString()).toBeFalsy()
    expect(isValidNumber).toHaveBeenNthCalledWith(1, false, NumberType.RGB)
  })

  test('result for invalid string color', () => {
    const fcc = new FontColorContrast('tex')

    expect(fcc.isHexString()).toBeFalsy()
    expect(isValidNumber).toHaveBeenNthCalledWith(1, NaN, NumberType.RGB)
  })

  test('result for invalid threshold', () => {
    const fcc = new FontColorContrast('fcc', 10)

    expect(fcc.isHexString()).toBeFalsy()
    expect(isValidNumber).toHaveBeenNthCalledWith(1, 0xfcc, NumberType.RGB)
    expect(isValidNumber).toHaveBeenNthCalledWith(2, 10, NumberType.THRESHOLD)
  })

  test('result for not a string', () => {
    const fcc = new FontColorContrast(45)

    expect(fcc.isHexString()).toBeFalsy()
    expect(isValidNumber).toHaveBeenNthCalledWith(1, false, NumberType.RGB)
  })

  test('result when blue is set', () => {
    const fcc = new FontColorContrast('#FC0523', 0.5, 0xff)

    expect(fcc.isHexString()).toBeFalsy()
    expect(isValidNumber).toHaveBeenNthCalledWith(1, 0xFC0523, NumberType.RGB)
    expect(isValidNumber).toHaveBeenNthCalledWith(2, 0.5, NumberType.THRESHOLD)
    expect(isNotSet).toHaveBeenCalledWith(0xff)
  })

  test('result when threshold is set', () => {
    const fcc = new FontColorContrast('#FC0523', 0.5, undefined, 0xff)

    expect(fcc.isHexString()).toBeFalsy()
    expect(isValidNumber).toHaveBeenNthCalledWith(1, 0xFC0523, NumberType.RGB)
    expect(isValidNumber).toHaveBeenNthCalledWith(2, 0.5, NumberType.THRESHOLD)
    expect(isNotSet).toHaveBeenCalledWith(0xff)
    expect(isNotSet).toHaveBeenCalledWith(undefined)
  })
})

describe('isNumber()', () => {
  let isValidNumber: jest.SpyInstance<boolean, [num: any, numberType: NumberType]>
  let isNotSet: jest.SpyInstance<boolean, [value: any]>

  beforeEach(() => {
    isValidNumber = jest
      .spyOn(FontColorContrast, 'isValidNumber')

    isNotSet = jest
      .spyOn(FontColorContrast, 'isNotSet')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('result for valid number and threshold', () => {
    const fcc = new FontColorContrast(0xffffff, 0.6, null as unknown as undefined)

    expect(fcc.isNumber()).toBeTruthy()
    expect(isValidNumber).toHaveBeenCalledTimes(2)
    expect(isValidNumber).toHaveBeenNthCalledWith(1, 0xffffff, NumberType.RGB)
    expect(isValidNumber).toHaveBeenNthCalledWith(2, 0.6, NumberType.THRESHOLD)
    expect(isNotSet).toHaveBeenCalledTimes(2)
    expect(isNotSet).toHaveBeenNthCalledWith(1, null)
    expect(isNotSet).toHaveBeenNthCalledWith(2, undefined)
  })

  test('result for invalid number', () => {
    const fcc = new FontColorContrast(0x1000000)

    expect(fcc.isNumber()).toBeFalsy()
    expect(isValidNumber).toHaveBeenNthCalledWith(1, 0x1000000, NumberType.RGB)
  })

  test('result for invalid threshold', () => {
    const fcc = new FontColorContrast(0, 10)

    expect(fcc.isNumber()).toBeFalsy()
    expect(isValidNumber).toHaveBeenNthCalledWith(1, 0, NumberType.RGB)
    expect(isValidNumber).toHaveBeenNthCalledWith(2, 10, NumberType.THRESHOLD)
  })

  test('result for a string', () => {
    const fcc = new FontColorContrast('45')

    expect(fcc.isNumber()).toBeFalsy()
    expect(isValidNumber).toHaveBeenNthCalledWith(1, '45', NumberType.RGB)
  })

  test('result for NaN', () => {
    const fcc = new FontColorContrast(Number('test'))

    expect(fcc.isNumber()).toBeFalsy()
    expect(isValidNumber).toHaveBeenNthCalledWith(1, NaN, NumberType.RGB)
  })

  test('result for Infinity', () => {
    const fcc = new FontColorContrast(Infinity)

    expect(fcc.isNumber()).toBeFalsy()
    expect(isValidNumber).toHaveBeenNthCalledWith(1, Infinity, NumberType.RGB)
  })

  test('result when blue is set', () => {
    const fcc = new FontColorContrast(0xFC0523, 0.5, 0xff)

    expect(fcc.isNumber()).toBeFalsy()
    expect(isValidNumber).toHaveBeenNthCalledWith(1, 0xFC0523, NumberType.RGB)
    expect(isValidNumber).toHaveBeenNthCalledWith(2, 0.5, NumberType.THRESHOLD)
    expect(isNotSet).toHaveBeenCalledWith(0xff)
  })

  test('result when threshold is set', () => {
    const fcc = new FontColorContrast(0, 0.5, undefined, 0xff)

    expect(fcc.isNumber()).toBeFalsy()
    expect(isValidNumber).toHaveBeenNthCalledWith(1, 0, NumberType.RGB)
    expect(isValidNumber).toHaveBeenNthCalledWith(2, 0.5, NumberType.THRESHOLD)
    expect(isNotSet).toHaveBeenNthCalledWith(1, undefined)
    expect(isNotSet).toHaveBeenNthCalledWith(2, 0xff)
  })
})

describe('isArray()', () => {
  let isValidNumber: jest.SpyInstance<boolean, [num: any, numberType: number]>
  let isNotSet: jest.SpyInstance<boolean, [num: any]>
  beforeEach(() => {
    isValidNumber = jest
      .spyOn(FontColorContrast, 'isValidNumber')

    isNotSet = jest
      .spyOn(FontColorContrast, 'isNotSet')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('result for valid array with threshold', () => {
    const fcc = new FontColorContrast([10, 0xff, 255], 0.3)

    expect(fcc.isArray()).toBeTruthy()
    expect(isValidNumber).toHaveBeenCalledTimes(4)
    expect(isValidNumber).toHaveBeenNthCalledWith(1, 10, NumberType.COLOR)
    expect(isValidNumber).toHaveBeenNthCalledWith(2, 255, NumberType.COLOR)
    expect(isValidNumber).toHaveBeenNthCalledWith(3, 255, NumberType.COLOR)
    expect(isValidNumber).toHaveBeenNthCalledWith(4, 0.3, NumberType.THRESHOLD)
  })

  test('result for valid array without threshold', () => {
    const fcc = new FontColorContrast([10, 0xff, 255])

    expect(fcc.isArray()).toBeTruthy()
    expect(isValidNumber).toHaveBeenCalledTimes(4)
    expect(isValidNumber).toHaveBeenNthCalledWith(1, 10, NumberType.COLOR)
    expect(isValidNumber).toHaveBeenNthCalledWith(2, 255, NumberType.COLOR)
    expect(isValidNumber).toHaveBeenNthCalledWith(3, 255, NumberType.COLOR)
    expect(isValidNumber).toHaveBeenNthCalledWith(4, undefined, NumberType.THRESHOLD)
    expect(isNotSet).toHaveBeenNthCalledWith(1, undefined)
    expect(isNotSet).toHaveBeenNthCalledWith(2, undefined)
  })

  test('result for invalid number', () => {
    const fcc = new FontColorContrast([0, 0xff, 0x100])

    expect(fcc.isArray()).toBeFalsy()
    expect(isValidNumber).toHaveBeenNthCalledWith(1, 0, NumberType.COLOR)
    expect(isValidNumber).toHaveBeenNthCalledWith(2, 0xff, NumberType.COLOR)
    expect(isValidNumber).toHaveBeenNthCalledWith(3, 0x100, NumberType.COLOR)
  })

  test('result for invalid threshold', () => {
    const fcc = new FontColorContrast([0, 0, 0], 10)

    expect(fcc.isArray()).toBeFalsy()
    expect(isValidNumber).toHaveBeenNthCalledWith(4, 10, NumberType.THRESHOLD)
  })

  test('result for an array with string', () => {
    const fcc = new FontColorContrast(['45' as unknown as number, 0, 0])

    expect(fcc.isArray()).toBeFalsy()
    expect(isValidNumber).toHaveBeenNthCalledWith(1, '45', NumberType.COLOR)
  })

  test('result for NaN', () => {
    const fcc = new FontColorContrast([Number('test'), 0, 5])

    expect(fcc.isArray()).toBeFalsy()
    expect(isValidNumber).toHaveBeenNthCalledWith(1, NaN, NumberType.COLOR)
  })

  test('result for Infinity', () => {
    const fcc = new FontColorContrast([Infinity, 0, 3])

    expect(fcc.isArray()).toBeFalsy()
    expect(isValidNumber).toHaveBeenNthCalledWith(1, Infinity, NumberType.COLOR)
  })

  test('result when blue is set', () => {
    const fcc = new FontColorContrast([0xfc, 0xff, 0x56], 0.5, 0xff)

    expect(fcc.isArray()).toBeFalsy()
    expect(isNotSet).toHaveBeenCalledWith(0xff)
  })

  test('result when threshold is set', () => {
    const fcc = new FontColorContrast([0, 0xff, 0xc5], 0.5, undefined, 0xff)

    expect(fcc.isArray()).toBeFalsy()
    expect(isNotSet).toHaveBeenNthCalledWith(2, 0xff)
  })
})

describe('setColorsFromRgbNumbers()', () => {
  test('colors are set and threshold is the default', () => {
    const fcc = new FontColorContrast(5, 10, 0xff)
    fcc.setColorsFromRgbNumbers()
    expect(fcc.red).toBe(5)
    expect(fcc.green).toBe(10)
    expect(fcc.blue).toBe(255)
    expect(fcc.threshold).toBe(0.5)
  })

  test('colors and threshold are set', () => {
    const fcc = new FontColorContrast(5, 10, 0xff, 0.3)
    fcc.setColorsFromRgbNumbers()
    expect(fcc.red).toBe(5)
    expect(fcc.green).toBe(10)
    expect(fcc.blue).toBe(255)
    expect(fcc.threshold).toBe(0.3)
  })
})

describe('setColorsFromArray()', () => {
  test('colors and threshold are set', () => {
    const fcc = new FontColorContrast([5, 10, 0xff], 0.3)
    fcc.setColorsFromArray()
    expect(fcc.red).toBe(5)
    expect(fcc.green).toBe(10)
    expect(fcc.blue).toBe(255)
    expect(fcc.threshold).toBe(0.3)
  })

  test('default threshold are set', () => {
    const fcc = new FontColorContrast([5, 10, 0xff])
    fcc.setColorsFromArray()
    expect(fcc.red).toBe(5)
    expect(fcc.green).toBe(10)
    expect(fcc.blue).toBe(255)
    expect(fcc.threshold).toBe(0.5)
  })
})

describe('setColorsFromHexString()', () => {
  test('colors and threshold are set with 3 chars', () => {
    const fcc = new FontColorContrast('fc1', 0.3)
    fcc.setColorsFromHexString()
    expect(fcc.red).toBe(0xff)
    expect(fcc.green).toBe(0xcc)
    expect(fcc.blue).toBe(0x11)
    expect(fcc.threshold).toBe(0.3)
  })

  test('colors and threshold are set with 6 chars and default theshold', () => {
    const fcc = new FontColorContrast('fce4d1')
    fcc.setColorsFromHexString()
    expect(fcc.red).toBe(0xfc)
    expect(fcc.green).toBe(0xe4)
    expect(fcc.blue).toBe(0xd1)
    expect(fcc.threshold).toBe(0.5)
  })
})

describe('setColorsFromNumber()', () => {
  test('extreme value', () => {
    const fcc = new FontColorContrast(1, 0.3) // 0x000fcc
    fcc.setColorsFromNumber()
    expect(fcc.red).toBe(0x00)
    expect(fcc.green).toBe(0x00)
    expect(fcc.blue).toBe(0x1)
    expect(fcc.threshold).toBe(0.3)
  })
  test('colors and threshold are set', () => {
    const fcc = new FontColorContrast(4044, 0.3) // 0x000fcc
    fcc.setColorsFromNumber()
    expect(fcc.red).toBe(0x00)
    expect(fcc.green).toBe(0x0f)
    expect(fcc.blue).toBe(0xcc)
    expect(fcc.threshold).toBe(0.3)
  })

  test('colors and default threshold are set', () => {
    const fcc = new FontColorContrast(0xfce4d1)
    fcc.setColorsFromNumber()
    expect(fcc.red).toBe(0xfc)
    expect(fcc.green).toBe(0xe4)
    expect(fcc.blue).toBe(0xd1)
    expect(fcc.threshold).toBe(0.5)
  })
})

describe('setThreshold(threshold)', () => {
  test('threshold is set', () => {
    const fcc = new FontColorContrast(0) // 0x000fcc
    fcc.setThreshold(1)
    expect(fcc.threshold).toBe(1)
  })

  test('default threshold is set', () => {
    const fcc = new FontColorContrast(0xfce4d1)
    fcc.setThreshold(undefined)
    expect(fcc.threshold).toBe(0.5)
  })
})

describe('isValidNumber(num, numberType)', () => {
  test('valid COLOR 0', () => {
    const valid = FontColorContrast.isValidNumber(0, NumberType.COLOR)
    expect(valid).toBeTruthy()
  })

  test('valid COLOR 0xff', () => {
    const valid = FontColorContrast.isValidNumber(0xff, NumberType.COLOR)
    expect(valid).toBeTruthy()
  })

  test('invalid negative COLOR', () => {
    const valid = FontColorContrast.isValidNumber(-3, NumberType.COLOR)
    expect(valid).toBeFalsy()
  })

  test('invalid COLOR bigger than 8 bits', () => {
    const valid = FontColorContrast.isValidNumber(256, NumberType.COLOR)
    expect(valid).toBeFalsy()
  })

  test('invalid COLOR NaN', () => {
    const valid = FontColorContrast.isValidNumber(Number('hello'), NumberType.COLOR)
    expect(valid).toBeFalsy()
  })

  test('invalid COLOR Infinity', () => {
    const valid = FontColorContrast.isValidNumber(Math.pow(10, 1000), NumberType.COLOR)
    expect(valid).toBeFalsy()
  })

  test('invalid COLOR not a number', () => {
    const valid = FontColorContrast.isValidNumber('foo', NumberType.COLOR)
    expect(valid).toBeFalsy()
  })

  test('invalid COLOR undefined', () => {
    const valid = FontColorContrast.isValidNumber(undefined, NumberType.COLOR)
    expect(valid).toBeFalsy()
  })

  test('invalid COLOR null', () => {
    const valid = FontColorContrast.isValidNumber(null, NumberType.COLOR)
    expect(valid).toBeFalsy()
  })

  test('invalid RGB bigger than 24 bits', () => {
    const valid = FontColorContrast.isValidNumber(0x100000000, NumberType.RGB)
    expect(valid).toBeFalsy()
  })

  test('valid THRESHOLD undefined', () => {
    const valid = FontColorContrast.isValidNumber(undefined, NumberType.THRESHOLD)
    expect(valid).toBeTruthy()
  })

  test('valid THRESHOLD null', () => {
    const valid = FontColorContrast.isValidNumber(null, NumberType.THRESHOLD)
    expect(valid).toBeTruthy()
  })

  test('invalid THRESHOLD bigger than 1', () => {
    const valid = FontColorContrast.isValidNumber(1.000000000000001, NumberType.THRESHOLD)
    expect(valid).toBeFalsy()
  })
})

describe('getCleanStringAndHexNum()', () => {
  test('not a string', () => {
    const fcc = new FontColorContrast(0)
    const [cleanString, hexNum] = fcc.getCleanStringAndHexNum()
    expect(cleanString).toBe('')
    expect(hexNum).toBeFalsy()
  })

  test('string with 4 chars', () => {
    const fcc = new FontColorContrast('#ffcc')
    const [cleanString, hexNum] = fcc.getCleanStringAndHexNum()
    expect(cleanString).toBe('')
    expect(hexNum).toBeFalsy()
  })

  test('valid string with hash and 3 chars', () => {
    const fcc = new FontColorContrast('#ffc')
    const [cleanString, hexNum] = fcc.getCleanStringAndHexNum()
    expect(cleanString).toBe('ffc')
    expect(hexNum).toBe(0xffc)
  })

  test('valid string with hash, space and 6 chars', () => {
    const fcc = new FontColorContrast('# ff4ffc')
    const [cleanString, hexNum] = fcc.getCleanStringAndHexNum()
    expect(cleanString).toBe('ff4ffc')
    expect(hexNum).toBe(0xff4ffc)
  })

  test('valid string without and 6 chars', () => {
    const fcc = new FontColorContrast('ff4ffc')
    const [cleanString, hexNum] = fcc.getCleanStringAndHexNum()
    expect(cleanString).toBe('ff4ffc')
    expect(hexNum).toBe(0xff4ffc)
  })

  test('valid string that generates NaN', () => {
    const fcc = new FontColorContrast('hellos')
    const [cleanString, hexNum] = fcc.getCleanStringAndHexNum()
    expect(cleanString).toBe('hellos')
    expect(hexNum).toBe(NaN)
  })
})

describe('isNotSet(value)', () => {
  test('undefined', () =>{
    const isSet = FontColorContrast.isNotSet(undefined)
    expect(isSet).toBeTruthy()
  })

  test('null', () =>{
    const isSet = FontColorContrast.isNotSet(null)
    expect(isSet).toBeTruthy()
  })

  test('number', () =>{
    const isSet = FontColorContrast.isNotSet(3)
    expect(isSet).toBeFalsy()
  })

  test('string', () =>{
    const isSet = FontColorContrast.isNotSet('hi there')
    expect(isSet).toBeFalsy()
  })
})
