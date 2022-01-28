import { FontColorContrast } from './FontColorContrast'
import fontColorContrast from './index'

describe('fontColorContrast', () => {
  let getColor: jest.SpyInstance<'#ffffff' | '#000000', []>

  beforeEach(() => {
    getColor = jest
      .spyOn(FontColorContrast.prototype, 'getColor')
      .mockImplementation(() => '#000000')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('getColor is called correctly with HEX string', () => {
    const c1 = fontColorContrast('#0C9')
    expect(getColor).toHaveBeenCalledTimes(1)
    expect(c1).toBe('#000000')
  })

  test('getColor is called correctly with HEX number', () => {
    const c1 = fontColorContrast(0x00CC99)
    expect(getColor).toHaveBeenCalledTimes(1)
    expect(c1).toBe('#000000')
  })

  test('getColor is called correctly with array', () => {
    const c1 = fontColorContrast([0x00, 0xCC, 0x99], 0.3)
    expect(getColor).toHaveBeenCalledTimes(1)
    expect(c1).toBe('#000000')
  })

  test('getColor is called correctly with RGB', () => {
    const c1 = fontColorContrast(0x00, 0xCC, 0x99, 0.3)
    expect(getColor).toHaveBeenCalledTimes(1)
    expect(c1).toBe('#000000')
  })
})
