import fontColorContrast from './index'

describe('fontColorContrast', () => {
  test('all possibilities strings and numbers', () => {
    const c1 = fontColorContrast('#0C9')
    const c2 = fontColorContrast('0C9')
    const c3 = fontColorContrast('#00CC99')
    const c4 = fontColorContrast('00cc99')
    const c5 = fontColorContrast('00cc99')
    const c6 = fontColorContrast(52377)
    const c7 = fontColorContrast('0x00Cc99')

    expect(c1).toBe('#000000')
    expect(c1).toBe(c2)
    expect(c1).toBe(c3)
    expect(c1).toBe(c4)
    expect(c1).toBe(c5)
    expect(c1).toBe(c6)
    expect(c1).toBe(c7)
  })

  test('all types of string returning the same result', () => {
    const c1 = fontColorContrast('#11FFDD')
    const c2 = fontColorContrast('#1FD')
    const c3 = fontColorContrast('11FFDD')
    const c4 = fontColorContrast('1FD')
    expect(c1).toBe('#000000')
    expect(c1).toBe(c2)
    expect(c1).toBe(c3)
    expect(c1).toBe(c4)
  })

  test('all possibilities strings and numbers with double zero', () => {
    const c1 = fontColorContrast('#009')
    const c2 = fontColorContrast('009')
    const c3 = fontColorContrast('#000099')
    const c4 = fontColorContrast('000099')
    const c5 = fontColorContrast(153)
    const c6 = fontColorContrast(0x00099)

    expect(c1).toBe('#ffffff')
    expect(c1).toBe(c2)
    expect(c1).toBe(c3)
    expect(c1).toBe(c4)
    expect(c1).toBe(c5)
    expect(c1).toBe(c6)
  })

  test('all possibilities strings and numbers with all zeroed', () => {
    const c1 = fontColorContrast('#000')
    const c2 = fontColorContrast('000')
    const c3 = fontColorContrast('#000000')
    const c4 = fontColorContrast('000000')
    const c5 = fontColorContrast(0)
    const c6 = fontColorContrast(0x0)

    expect(c1).toBe('#ffffff')
    expect(c1).toBe(c2)
    expect(c1).toBe(c3)
    expect(c1).toBe(c4)
    expect(c1).toBe(c5)
    expect(c1).toBe(c6)
  })

  test('all possibilities with RGB', () => {
    const c1 = fontColorContrast(0, 0xcc, 153)
    const c2 = fontColorContrast(0x0, 0xcc, 153)
    const c3 = fontColorContrast(0, 204, 0x99)
    expect(c1).toBe('#000000')
    expect(c1).toBe(c2)
    expect(c1).toBe(c3)
  })

  test('hexadecimal color', () => {
    const font = fontColorContrast('#f7d4fc')
    expect(font).toBe('#000000')
  })

  test('hexadecimal number color', () => {
    const font = fontColorContrast(0Xf7d4fc)
    expect(font).toBe('#000000')
  })

  test('RGB color on each param', () => {
    const font = fontColorContrast(
      223,
      0,
      255
    ) // #df00ff
    expect(font).toBe('#000000')
  })

  test('same strange grey background from all types', () => {
    const c1 = fontColorContrast('#645466')
    const c2 = fontColorContrast('645466')
    const c3 = fontColorContrast(0X645466)
    const c4 = fontColorContrast(6575206) // 0X645466 converted to decimal
    const c5 = fontColorContrast([100, 84, 102])
    const c6 = fontColorContrast([0x64, 0x54, 0x66])
    const c7 = fontColorContrast([100, 84, 102])
    expect(c1).toBe('#ffffff')
    expect(c2).toBe('#ffffff')
    expect(c3).toBe('#ffffff')
    expect(c4).toBe('#ffffff')
    expect(c5).toBe('#ffffff')
    expect(c6).toBe('#ffffff')
    expect(c7).toBe('#ffffff')
  })

  test('default response when not a valid param', () => {
    let font = fontColorContrast({ color: 'ffffff' } as unknown as string)
    expect(font).toBe('#ffffff')
    font = fontColorContrast(true as unknown as string)
    expect(font).toBe('#ffffff')
  })

  test('RGB color on array', () => {
    const font = fontColorContrast([20, 85, 91])
    expect(font).toBe('#ffffff')
  })

  test('threshold param should alter result font color with a close to the limit color', () => {
    // This color contrast is 0.4915548540582736
    const hexString = '#837984'
    expect(fontColorContrast(hexString)).toBe('#ffffff')
    expect(fontColorContrast(hexString, 0.49)).toBe('#000000')
    expect(fontColorContrast(hexString, 0)).toBe('#000000')
    expect(fontColorContrast(hexString, 1)).toBe('#ffffff')

    const hexNumber = 0x837984
    expect(fontColorContrast(hexNumber)).toBe('#ffffff')
    expect(fontColorContrast(hexNumber, 0)).toBe('#000000')
    expect(fontColorContrast(hexNumber, 0.49)).toBe('#000000')
    expect(fontColorContrast(hexNumber, 1)).toBe('#ffffff')

    const rbgArray = [131, 121, 132]
    expect(fontColorContrast(rbgArray)).toBe('#ffffff')
    expect(fontColorContrast(rbgArray, 0)).toBe('#000000')
    expect(fontColorContrast(rbgArray, 0.49)).toBe('#000000')
    expect(fontColorContrast(rbgArray, 1)).toBe('#ffffff')

    const red = 131
    const green = 121
    const blue = 132
    expect(fontColorContrast(red, green, blue)).toBe('#ffffff')
    expect(fontColorContrast(red, green, blue, 0)).toBe('#000000')
    expect(fontColorContrast(red, green, blue, 0.49)).toBe('#000000')
    expect(fontColorContrast(red, green, blue, 1)).toBe('#ffffff')
  })
})
