/* eslint-disable no-new-wrappers */
import { FontColorContrast } from './FontColorContrast'

enum NumberType {
  COLOR = 0xff,
  RGB = 0xffffff,
  THRESHOLD = 1,
}

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
  let isValidNumber: jest.SpyInstance<boolean, [num: any, numberType?: number]>

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
    expect(isValidNumber).toHaveBeenNthCalledWith(1, 10)
    expect(isValidNumber).toHaveBeenNthCalledWith(2, 255)
    expect(isValidNumber).toHaveBeenNthCalledWith(3, 255)
    expect(isValidNumber).toHaveBeenNthCalledWith(4, 0.3, NumberType.THRESHOLD)
  })

  test('functions are called correctly without threshold', () => {
    const fcc = new FontColorContrast(10, 0xff, 255)

    expect(fcc.isRgb()).toBeTruthy()
    expect(isValidNumber).toHaveBeenCalledTimes(4)
    expect(isValidNumber).toHaveBeenNthCalledWith(1, 10)
    expect(isValidNumber).toHaveBeenNthCalledWith(2, 255)
    expect(isValidNumber).toHaveBeenNthCalledWith(3, 255)
    expect(isValidNumber).toHaveBeenNthCalledWith(4, undefined, NumberType.THRESHOLD)
  })

  test('false on the second param', () => {
    const fcc = new FontColorContrast(10, 0x100, 255, 0.3)

    expect(fcc.isRgb()).toBeFalsy()
    expect(isValidNumber).toHaveBeenCalledWith(256)
    expect(isValidNumber).toHaveBeenCalledWith(10)
    expect(isValidNumber).toHaveBeenCalledTimes(2)
  })
})

describe('isHexString()', () => {
  let isValidNumber: jest.SpyInstance<boolean, [num: any, numberType?: NumberType]>
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
  let isValidNumber: jest.SpyInstance<boolean, [num: any, numberType?: NumberType]>
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
  let isValidNumber: jest.SpyInstance<boolean, [num: any, numberType?: number]>
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
    expect(isValidNumber).toHaveBeenNthCalledWith(1, 10)
    expect(isValidNumber).toHaveBeenNthCalledWith(2, 255)
    expect(isValidNumber).toHaveBeenNthCalledWith(3, 255)
    expect(isValidNumber).toHaveBeenNthCalledWith(4, 0.3, NumberType.THRESHOLD)
  })

  test('result for valid array without threshold', () => {
    const fcc = new FontColorContrast([10, 0xff, 255])

    expect(fcc.isArray()).toBeTruthy()
    expect(isValidNumber).toHaveBeenCalledTimes(4)
    expect(isValidNumber).toHaveBeenNthCalledWith(1, 10)
    expect(isValidNumber).toHaveBeenNthCalledWith(2, 255)
    expect(isValidNumber).toHaveBeenNthCalledWith(3, 255)
    expect(isValidNumber).toHaveBeenNthCalledWith(4, undefined, NumberType.THRESHOLD)
    expect(isNotSet).toHaveBeenNthCalledWith(1, undefined)
    expect(isNotSet).toHaveBeenNthCalledWith(2, undefined)
  })

  test('result for invalid number', () => {
    const fcc = new FontColorContrast([0, 0xff, 0x100])

    expect(fcc.isArray()).toBeFalsy()
    expect(isValidNumber).toHaveBeenNthCalledWith(1, 0)
    expect(isValidNumber).toHaveBeenNthCalledWith(2, 0xff)
    expect(isValidNumber).toHaveBeenNthCalledWith(3, 0x100)
  })

  test('result for invalid threshold', () => {
    const fcc = new FontColorContrast([0, 0, 0], 10)

    expect(fcc.isArray()).toBeFalsy()
    expect(isValidNumber).toHaveBeenNthCalledWith(4, 10, NumberType.THRESHOLD)
  })

  test('result for an array with string', () => {
    const fcc = new FontColorContrast(['45' as unknown as number, 0, 0])

    expect(fcc.isArray()).toBeFalsy()
    expect(isValidNumber).toHaveBeenNthCalledWith(1, '45')
  })

  test('result for NaN', () => {
    const fcc = new FontColorContrast([Number('test'), 0, 5])

    expect(fcc.isArray()).toBeFalsy()
    expect(isValidNumber).toHaveBeenNthCalledWith(1, NaN)
  })

  test('result for Infinity', () => {
    const fcc = new FontColorContrast([Infinity, 0, 3])

    expect(fcc.isArray()).toBeFalsy()
    expect(isValidNumber).toHaveBeenNthCalledWith(1, Infinity)
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
  test('colors are set and threshold is the default', () => {
    const fcc = new FontColorContrast([5, 10, 0xff])
    fcc.setColorsFromArray()
    expect(fcc.red).toBe(5)
    expect(fcc.green).toBe(10)
    expect(fcc.blue).toBe(255)
    expect(fcc.threshold).toBe(0.5)
  })

  test('colors and threshold are set', () => {
    const fcc = new FontColorContrast([5, 10, 0xff], 0.3)
    fcc.setColorsFromArray()
    expect(fcc.red).toBe(5)
    expect(fcc.green).toBe(10)
    expect(fcc.blue).toBe(255)
    expect(fcc.threshold).toBe(0.3)
  })
})

/*
 * describe('setColorsFromNumbers()', () => {
 *   test('all possible combinations are set correctly', () => {
 *     const fcc1 = new FontColorContrast(0, 84, 600)
 *     fcc1.setColorsFromRgbNumbers()
 *     expect(fcc1.red).toBe(0)
 *     expect(fcc1.green).toBe(84)
 *     expect(fcc1.blue).toBe(0)
 */

/*
 *     const fcc2 = new FontColorContrast(0x0, 0x54, 0x258)
 *     fcc2.setColorsFromRgbNumbers()
 *     expect(fcc2.red).toBe(0)
 *     expect(fcc2.green).toBe(84)
 *     expect(fcc2.blue).toBe(0)
 *   })
 */

/*
 *   test('colors are set correctly', () => {
 *     const fcc = new FontColorContrast(123, 255, 0)
 *     fcc.setColorsFromRgbNumbers()
 *     expect(fcc.red).toBe(123)
 *     expect(fcc.green).toBe(255)
 *     expect(fcc.blue).toBe(0)
 *     expect(fcc.threshold).toBe(0.5)
 *   })
 */

/*
 *   test('hex colors are converted', () => {
 *     const fcc = new FontColorContrast(0x7b, 0xff, 0, 0.2)
 *     fcc.setColorsFromRgbNumbers()
 *     expect(fcc.red).toBe(123)
 *     expect(fcc.green).toBe(255)
 *     expect(fcc.blue).toBe(0)
 *     expect(fcc.threshold).toBe(0.2)
 *   })
 */

/*
 *   test('bad colors are reset', () => {
 *     const fcc = new FontColorContrast(-3, 256, 852, 3)
 *     fcc.setColorsFromRgbNumbers()
 *     expect(fcc.red).toBe(0)
 *     expect(fcc.green).toBe(0)
 *     expect(fcc.blue).toBe(0)
 *     expect(fcc.threshold).toBe(0.5)
 *   })
 */

/*
 *   test('NaN and Infinity colors are reset', () => {
 *     const fcc = new FontColorContrast(3, NaN, Infinity, 3)
 *     fcc.setColorsFromRgbNumbers()
 *     expect(fcc.red).toBe(3)
 *     expect(fcc.green).toBe(0)
 *     expect(fcc.blue).toBe(0)
 *     expect(fcc.threshold).toBe(0.5)
 *   })
 * })
 */

/*
 * describe('setColorsFromArray()', () => {
 *   test('all possible combinations are set correctly', () => {
 *     const fcc1 = new FontColorContrast([0, 84, 600])
 *     fcc1.setColorsFromArray()
 *     expect(fcc1.red).toBe(0)
 *     expect(fcc1.green).toBe(84)
 *     expect(fcc1.blue).toBe(0)
 */

/*
 *     const fcc2 = new FontColorContrast([0x0, 0x54, 0x258])
 *     fcc2.setColorsFromArray()
 *     expect(fcc2.red).toBe(0)
 *     expect(fcc2.green).toBe(84)
 *     expect(fcc2.blue).toBe(0)
 *   })
 */

/*
 *   test('colors are set correctly', () => {
 *     const fcc = new FontColorContrast([123, 255, 0])
 *     fcc.setColorsFromArray()
 *     expect(fcc.red).toBe(123)
 *     expect(fcc.green).toBe(255)
 *     expect(fcc.blue).toBe(0)
 *     expect(fcc.threshold).toBe(0.5)
 *   })
 */

/*
 *   test('hex colors are converted', () => {
 *     const fcc = new FontColorContrast([0x7b, 0xff, 0], 0.2)
 *     fcc.setColorsFromArray()
 *     expect(fcc.red).toBe(123)
 *     expect(fcc.green).toBe(255)
 *     expect(fcc.blue).toBe(0)
 *     expect(fcc.threshold).toBe(0.2)
 *   })
 */

/*
 *   test('bad colors are reset', () => {
 *     const fcc = new FontColorContrast([-3, 256, 852], 3)
 *     fcc.setColorsFromArray()
 *     expect(fcc.red).toBe(0)
 *     expect(fcc.green).toBe(0)
 *     expect(fcc.blue).toBe(0)
 *     expect(fcc.threshold).toBe(0.5)
 *   })
 */

/*
 *   test('NaN and Infinity colors are reset', () => {
 *     const fcc = new FontColorContrast([3, NaN, Infinity], 3)
 *     fcc.setColorsFromArray()
 *     expect(fcc.red).toBe(3)
 *     expect(fcc.green).toBe(0)
 *     expect(fcc.blue).toBe(0)
 *     expect(fcc.threshold).toBe(0.5)
 *   })
 * })
 */

/*
 * describe('setColorsFromHexString()', () => {
 *   test('string with 3 chars and hash', () => {
 *     const fcc1 = new FontColorContrast('#0C9')
 *     fcc1.setColorsFromNumber()
 *     expect(fcc1.red).toBe(0)
 *     expect(fcc1.green).toBe(204)
 *     expect(fcc1.blue).toBe(153)
 *   })
 */

/*
 *   test('string with 3 chars and without hash', () => {
 *     const fcc2 = new FontColorContrast('0C9')
 *     fcc2.setColorsFromNumber()
 *     expect(fcc2.red).toBe(0)
 *     expect(fcc2.green).toBe(204)
 *     expect(fcc2.blue).toBe(153)
 *   })
 */

/*
 *   test('string with 6 chars and hash', () => {
 *     const fcc5 = new FontColorContrast('#00CC99')
 *     fcc5.setColorsFromNumber()
 *     expect(fcc5.red).toBe(0)
 *     expect(fcc5.green).toBe(204)
 *     expect(fcc5.blue).toBe(153)
 *   })
 */

/*
 *   test('string with 6 chars without hash', () => {
 *     const fcc6 = new FontColorContrast('00CC99')
 *     fcc6.setColorsFromNumber()
 *     expect(fcc6.red).toBe(0)
 *     expect(fcc6.green).toBe(204)
 *     expect(fcc6.blue).toBe(153)
 *   })
 * })
 */

/*
 * describe('setColorsFromNumber()', () => {
 *   test('number that generates hex with 6 chars', () => {
 *     const fcc7 = new FontColorContrast(52377)
 *     fcc7.setColorsFromNumber()
 *     expect(fcc7.red).toBe(0)
 *     expect(fcc7.green).toBe(204)
 *     expect(fcc7.blue).toBe(153)
 *   })
 */

/*
 *   test('number that generates hex with 2 chars', () => {
 *     const fcc7 = new FontColorContrast(44)
 *     fcc7.setColorsFromNumber()
 *     expect(fcc7.red).toBe(0)
 *     expect(fcc7.green).toBe(0)
 *     expect(fcc7.blue).toBe(44)
 *   })
 */

/*
 *   test('number that generates hex with 1 char', () => {
 *     const fcc7 = new FontColorContrast(9)
 *     fcc7.setColorsFromNumber()
 *     expect(fcc7.red).toBe(0)
 *     expect(fcc7.green).toBe(0)
 *     expect(fcc7.blue).toBe(9)
 *   })
 */

/*
 *   test('hex number', () => {
 *     const fcc8 = new FontColorContrast(0x00CC99)
 *     fcc8.setColorsFromNumber()
 *     expect(fcc8.red).toBe(0)
 *     expect(fcc8.green).toBe(204)
 *     expect(fcc8.blue).toBe(153)
 *   })
 */

/*
 *   test('colors are set correctly', () => {
 *     const fcc = new FontColorContrast(0xb75301, 0)
 *     fcc.setColorsFromNumber()
 *     expect(fcc.red).toBe(183)
 *     expect(fcc.green).toBe(83)
 *     expect(fcc.blue).toBe(1)
 *     expect(fcc.threshold).toBe(0)
 *   })
 */

/*
 *   test('hex colors are converted', () => {
 *     const fcc = new FontColorContrast(12014337, 0.2)
 *     fcc.setColorsFromNumber()
 *     expect(fcc.red).toBe(183)
 *     expect(fcc.green).toBe(83)
 *     expect(fcc.blue).toBe(1)
 *     expect(fcc.threshold).toBe(0.2)
 *   })
 */

/*
 *   test('colors with more than 6 chars are reset', () => {
 *     const fcc = new FontColorContrast(0xb753014cf3a, 3)
 *     fcc.setColorsFromNumber()
 *     expect(fcc.red).toBe(0)
 *     expect(fcc.green).toBe(0)
 *     expect(fcc.blue).toBe(0)
 *     expect(fcc.threshold).toBe(0.5)
 *   })
 */

/*
 *   test('invalid string is reset', () => {
 *     const fcc = new FontColorContrast('asdfg', -3)
 *     fcc.setColorsFromNumber()
 *     expect(fcc.red).toBe(0)
 *     expect(fcc.green).toBe(0)
 *     expect(fcc.blue).toBe(0)
 *     expect(fcc.threshold).toBe(0.5)
 *   })
 */

/*
 *   test('negative string is reset', () => {
 *     const fcc = new FontColorContrast('-0xccc', -3)
 *     fcc.setColorsFromNumber()
 *     expect(fcc.red).toBe(0)
 *     expect(fcc.green).toBe(0)
 *     expect(fcc.blue).toBe(0)
 *     expect(fcc.threshold).toBe(0.5)
 *   })
 */

/*
 *   test('NaN color is reset', () => {
 *     const fcc = new FontColorContrast(NaN, -3)
 *     fcc.setColorsFromNumber()
 *     expect(fcc.red).toBe(0)
 *     expect(fcc.green).toBe(0)
 *     expect(fcc.blue).toBe(0)
 *     expect(fcc.threshold).toBe(0.5)
 *   })
 */

/*
 *   test('Infinity color is reset', () => {
 *     const fcc = new FontColorContrast(Infinity, -3)
 *     fcc.setColorsFromNumber()
 *     expect(fcc.red).toBe(0)
 *     expect(fcc.green).toBe(0)
 *     expect(fcc.blue).toBe(0)
 *     expect(fcc.threshold).toBe(0.5)
 *   })
 */

/*
 *   test('negative color is reset', () => {
 *     const fcc = new FontColorContrast(-6, -3)
 *     fcc.setColorsFromNumber()
 *     expect(fcc.red).toBe(0)
 *     expect(fcc.green).toBe(0)
 *     expect(fcc.blue).toBe(0)
 *     expect(fcc.threshold).toBe(0.5)
 *   })
 * })
 */

/*
 * *
 *test('invalid RGB with negative number', () => {
 *  const fcc = new FontColorContrast(-1, 0, 0, 0.3)
 *  expect(fcc.isRgb()).toBeFalsy()
 *})
 *
 *test('invalid RGB with NaN', () => {
 *  const fcc = new FontColorContrast(0, NaN, 10, 15)
 *  expect(fcc.isRgb()).toBeFalsy()
 *})
 *
 *test('invalid RGB with Infinity', () => {
 *  const fcc = new FontColorContrast(0, Infinity, 10, 15)
 *  expect(fcc.isRgb()).toBeFalsy()
 *})
 *
 *test('invalid RGB with number more then 255', () => {
 *  const fcc = new FontColorContrast(0, 100, 0x100, 15)
 *  expect(fcc.isRgb()).toBeFalsy()
 *})
 *
 *test('invalid RGB with string', () => {
 *  const fcc = new FontColorContrast(0, '100' as unknown as number, 0, 15)
 *  expect(fcc.isRgb()).toBeFalsy()
 *})
 *
 */
