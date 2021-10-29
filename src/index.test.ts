import fontColorContrast from './index'

describe('fontColorContrast', () => {
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
    )
    expect(font).toBe('#ffffff')
  })

  test('strange grey background from string with hash', () => {
    const font = fontColorContrast('#645466')
    expect(font).toBe('#ffffff')
  })

  test('strange grey background from string without hash', () => {
    const font = fontColorContrast('645466')
    expect(font).toBe('#ffffff')
  })

  test('strange grey background from hex number', () => {
    const font = fontColorContrast(0X645466)
    expect(font).toBe('#ffffff')
  })

  test('strange grey background from number with valid hex value', () => {
    const font = fontColorContrast(6575206) // 0X645466 converted to decimal
    expect(font).toBe('#ffffff')
  })

  test('all possibilities returning the same result', () => {
    const c1 = fontColorContrast('#0C9')
    const c2 = fontColorContrast('0C9')
    const c3 = fontColorContrast('#00CC99')
    const c4 = fontColorContrast('00cc99')
    const c5 = fontColorContrast(52377)
    const c6 = fontColorContrast([0, 'cc', '99'])
    const c7 = fontColorContrast(['0', 0Xcc, 0X99])
    const c8 = fontColorContrast([0, '204', 153])
    const c9 = fontColorContrast(0, 'cc', '99')
    const c10 = fontColorContrast('0', 0Xcc, 0X99)
    const c11 = fontColorContrast(0, '204', 153)
    const c12 = fontColorContrast(['0', 'c', 0X99])
    const c13 = fontColorContrast(0x00Cc99)
    expect(c1).toBe('#000000')
    expect(c1).toBe(c2)
    expect(c1).toBe(c3)
    expect(c1).toBe(c4)
    expect(c1).toBe(c5)
    expect(c1).toBe(c6)
    expect(c1).toBe(c7)
    expect(c1).toBe(c8)
    expect(c1).toBe(c9)
    expect(c1).toBe(c10)
    expect(c1).toBe(c11)
    expect(c1).toBe(c12)
    expect(c1).toBe(c13)
  })

  test('all types of string returning the same result', () => {
    const c1 = fontColorContrast('#00FFDD')
    const c2 = fontColorContrast('0FD')
    const c3 = fontColorContrast('#00FFDD')
    const c4 = fontColorContrast('0FD')
    expect(c1).toBe('#000000')
    expect(c1).toBe(c2)
    expect(c1).toBe(c3)
    expect(c1).toBe(c4)
  })

  test('default response when not a valid param', () => {
    let font = fontColorContrast({ color: 'ffffff' } as unknown as string)
    expect(font).toBe('#ffffff')
    font = fontColorContrast(true as unknown as string)
    expect(font).toBe('#ffffff')
  })

  test('RGB color on mixed array', () => {
    const font = fontColorContrast([20, '85', 91])
    expect(font).toBe('#ffffff')
  })

  test('RGB color on number array', () => {
    const font = fontColorContrast([20, 85, 91])
    expect(font).toBe('#ffffff')
  })

  test('RGB color on string array', () => {
    const font = fontColorContrast(['20', '85', '91'])
    expect(font).toBe('#ffffff')
  })
})

/*
 * describe('css colors', () => {
 *   const cssColors = [
 *     { name: 'MediumVioletRed', hex: '#C71585', rgb: '199 21 133', font: '#ffffff' },
 *     { name: 'DeepPink', hex: '#FF1493', rgb: '255 20 147', font: '#000000' },
 *     { name: 'PaleVioletRed', hex: '#DB7093', rgb: '219 112 147', font: '#000000' },
 *     { name: 'HotPink', hex: '#FF69B4', rgb: '255 105 180', font: '#000000' },
 *     { name: 'LightPink', hex: '#FFB6C1', rgb: '255 182 193', font: '#000000' },
 *     { name: 'Pink', hex: '#FFC0CB', rgb: '255 192 203', font: '#000000' },
 *     { name: 'DarkRed', hex: '#8B0000', rgb: '139 0 0', font: '#ffffff' },
 *     { name: 'Red', hex: '#FF0000', rgb: '255 0 0', font: '#ffffff' },
 *     { name: 'Firebrick', hex: '#B22222', rgb: '178 34 34', font: '#ffffff' },
 *     { name: 'Crimson', hex: '#DC143C', rgb: '220 20 60', font: '#ffffff' },
 *     { name: 'IndianRed', hex: '#CD5C5C', rgb: '205 92 92', font: '#ffffff' },
 *     { name: 'LightCoral', hex: '#F08080', rgb: '240 128 128', font: '#000000' },
 *     { name: 'Salmon', hex: '#FA8072', rgb: '250 128 114', font: '#000000' },
 *     { name: 'DarkSalmon', hex: '#E9967A', rgb: '233 150 122', font: '#000000' },
 *     { name: 'LightSalmon', hex: '#FFA07A', rgb: '255 160 122', font: '#000000' },
 *     { name: 'OrangeRed', hex: '#FF4500', rgb: '255 69 0', font: '#000000' },
 *     { name: 'Tomato', hex: '#FF6347', rgb: '255 99 71', font: '#000000' },
 *     { name: 'DarkOrange', hex: '#FF8C00', rgb: '255 140 0', font: '#000000' },
 *     { name: 'Coral', hex: '#FF7F50', rgb: '255 127 80', font: '#000000' },
 *     { name: 'Orange', hex: '#FFA500', rgb: '255 165 0', font: '#000000' },
 *     { name: 'DarkKhaki', hex: '#BDB76B', rgb: '189 183 107', font: '#000000' },
 *     { name: 'Gold', hex: '#FFD700', rgb: '255 215 0', font: '#000000' },
 *     { name: 'Khaki', hex: '#F0E68C', rgb: '240 230 140', font: '#000000' },
 *     { name: 'PeachPuff', hex: '#FFDAB9', rgb: '255 218 185', font: '#000000' },
 *     { name: 'Yellow', hex: '#FFFF00', rgb: '255 255 0', font: '#000000' },
 *     { name: 'PaleGoldenrod', hex: '#EEE8AA', rgb: '238 232 170', font: '#000000' },
 *     { name: 'Moccasin', hex: '#FFE4B5', rgb: '255 228 181', font: '#000000' },
 *     { name: 'PapayaWhip', hex: '#FFEFD5', rgb: '255 239 213', font: '#000000' },
 *     { name: 'LightGoldenrodYellow', hex: '#FAFAD2', rgb: '250 250 210', font: '#000000' },
 *     { name: 'LemonChiffon', hex: '#FFFACD', rgb: '255 250 205', font: '#000000' },
 *     { name: 'LightYellow', hex: '#FFFFE0', rgb: '255 255 224', font: '#000000' },
 *     { name: 'Maroon', hex: '#800000', rgb: '128 0 0', font: '#ffffff' },
 *     { name: 'Brown', hex: '#A52A2A', rgb: '165 42 42', font: '#ffffff' },
 *     { name: 'SaddleBrown', hex: '#8B4513', rgb: '139 69 19', font: '#ffffff' },
 *     { name: 'Sienna', hex: '#A0522D', rgb: '160 82 45', font: '#ffffff' },
 *     { name: 'Chocolate', hex: '#D2691E', rgb: '210 105 30', font: '#000000' },
 *     { name: 'DarkGoldenrod', hex: '#B8860B', rgb: '184 134 11', font: '#000000' },
 *     { name: 'Peru', hex: '#CD853F', rgb: '205 133 63', font: '#000000' },
 *     { name: 'RosyBrown', hex: '#BC8F8F', rgb: '188 143 143', font: '#000000' },
 *     { name: 'Goldenrod', hex: '#DAA520', rgb: '218 165 32', font: '#000000' },
 *     { name: 'SandyBrown', hex: '#F4A460', rgb: '244 164 96', font: '#000000' },
 *     { name: 'Tan', hex: '#D2B48C', rgb: '210 180 140', font: '#000000' },
 *     { name: 'Burlywood', hex: '#DEB887', rgb: '222 184 135', font: '#000000' },
 *     { name: 'Wheat', hex: '#F5DEB3', rgb: '245 222 179', font: '#000000' },
 *     { name: 'NavajoWhite', hex: '#FFDEAD', rgb: '255 222 173', font: '#000000' },
 *     { name: 'Bisque', hex: '#FFE4C4', rgb: '255 228 196', font: '#000000' },
 *     { name: 'BlanchedAlmond', hex: '#FFEBCD', rgb: '255 235 205', font: '#000000' },
 *     { name: 'Cornsilk', hex: '#FFF8DC', rgb: '255 248 220', font: '#000000' },
 *     { name: 'DarkGreen', hex: '#006400', rgb: '0 100 0', font: '#ffffff' },
 *     { name: 'Green', hex: '#008000', rgb: '0 128 0', font: '#ffffff' },
 *     { name: 'DarkOliveGreen', hex: '#556B2F', rgb: '85 107 47', font: '#ffffff' },
 *     { name: 'ForestGreen', hex: '#228B22', rgb: '34 139 34', font: '#ffffff' },
 *     { name: 'SeaGreen', hex: '#2E8B57', rgb: '46 139 87', font: '#ffffff' },
 *     { name: 'Olive', hex: '#808000', rgb: '128 128 0', font: '#ffffff' },
 *     { name: 'OliveDrab', hex: '#6B8E23', rgb: '107 142 35', font: '#ffffff' },
 *     { name: 'MediumSeaGreen', hex: '#3CB371', rgb: '60 179 113', font: '#000000' },
 *     { name: 'LimeGreen', hex: '#32CD32', rgb: '50 205 50', font: '#000000' },
 *     { name: 'Lime', hex: '#00FF00', rgb: '0 255 0', font: '#000000' },
 *     { name: 'SpringGreen', hex: '#00FF7F', rgb: '0 255 127', font: '#000000' },
 *     { name: 'MediumSpringGreen', hex: '#00FA9A', rgb: '0 250 154', font: '#000000' },
 *     { name: 'DarkSeaGreen', hex: '#8FBC8F', rgb: '143 188 143', font: '#000000' },
 *     { name: 'MediumAquamarine', hex: '#66CDAA', rgb: '102 205 170', font: '#000000' },
 *     { name: 'YellowGreen', hex: '#9ACD32', rgb: '154 205 50', font: '#000000' },
 *     { name: 'LawnGreen', hex: '#7CFC00', rgb: '124 252 0', font: '#000000' },
 *     { name: 'Chartreuse', hex: '#7FFF00', rgb: '127 255 0', font: '#000000' },
 *     { name: 'LightGreen', hex: '#90EE90', rgb: '144 238 144', font: '#000000' },
 *     { name: 'GreenYellow', hex: '#ADFF2F', rgb: '173 255 47', font: '#000000' },
 *     { name: 'PaleGreen', hex: '#98FB98', rgb: '152 251 152', font: '#000000' },
 *     { name: 'Teal', hex: '#008080', rgb: '0 128 128', font: '#ffffff' },
 *     { name: 'DarkCyan', hex: '#008B8B', rgb: '0 139 139', font: '#ffffff' },
 *     { name: 'LightSeaGreen', hex: '#20B2AA', rgb: '32 178 170', font: '#000000' },
 *     { name: 'CadetBlue', hex: '#5F9EA0', rgb: '95 158 160', font: '#000000' },
 *     { name: 'DarkTurquoise', hex: '#00CED1', rgb: '0 206 209', font: '#000000' },
 *     { name: 'MediumTurquoise', hex: '#48D1CC', rgb: '72 209 204', font: '#000000' },
 *     { name: 'Turquoise', hex: '#40E0D0', rgb: '64 224 208', font: '#000000' },
 *     { name: 'Aqua', hex: '#00FFFF', rgb: '0 255 255', font: '#000000' },
 *     { name: 'Cyan', hex: '#00FFFF', rgb: '0 255 255', font: '#000000' },
 *     { name: 'Aquamarine', hex: '#7FFFD4', rgb: '127 255 212', font: '#000000' },
 *     { name: 'PaleTurquoise', hex: '#AFEEEE', rgb: '175 238 238', font: '#000000' },
 *     { name: 'LightCyan', hex: '#E0FFFF', rgb: '224 255 255', font: '#000000' },
 *     { name: 'Navy', hex: '#000080', rgb: '0 0 128', font: '#ffffff' },
 *     { name: 'DarkBlue', hex: '#00008B', rgb: '0 0 139', font: '#ffffff' },
 *     { name: 'MediumBlue', hex: '#0000CD', rgb: '0 0 205', font: '#ffffff' },
 *     { name: 'Blue', hex: '#0000FF', rgb: '0 0 255', font: '#ffffff' },
 *     { name: 'MidnightBlue', hex: '#191970', rgb: '25 25 112', font: '#ffffff' },
 *     { name: 'RoyalBlue', hex: '#4169E1', rgb: '65 105 225', font: '#ffffff' },
 *     { name: 'SteelBlue', hex: '#4682B4', rgb: '70 130 180', font: '#ffffff' },
 *     { name: 'DodgerBlue', hex: '#1E90FF', rgb: '30 144 255', font: '#000000' },
 *     { name: 'DeepSkyBlue', hex: '#00BFFF', rgb: '0 191 255', font: '#000000' },
 *     { name: 'CornflowerBlue', hex: '#6495ED', rgb: '100 149 237', font: '#000000' },
 *     { name: 'SkyBlue', hex: '#87CEEB', rgb: '135 206 235', font: '#000000' },
 *     { name: 'LightSkyBlue', hex: '#87CEFA', rgb: '135 206 250', font: '#000000' },
 *     { name: 'LightSteelBlue', hex: '#B0C4DE', rgb: '176 196 222', font: '#000000' },
 *     { name: 'LightBlue', hex: '#ADD8E6', rgb: '173 216 230', font: '#000000' },
 *     { name: 'PowderBlue', hex: '#B0E0E6', rgb: '176 224 230', font: '#000000' },
 *     { name: 'Indigo', hex: '#4B0082', rgb: '75 0 130', font: '#ffffff' },
 *     { name: 'Purple', hex: '#800080', rgb: '128 0 128', font: '#ffffff' },
 *     { name: 'DarkMagenta', hex: '#8B008B', rgb: '139 0 139', font: '#ffffff' },
 *     { name: 'DarkViolet', hex: '#9400D3', rgb: '148 0 211', font: '#ffffff' },
 *     { name: 'DarkSlateBlue', hex: '#483D8B', rgb: '72 61 139', font: '#ffffff' },
 *     { name: 'BlueViolet', hex: '#8A2BE2', rgb: '138 43 226', font: '#ffffff' },
 *     { name: 'DarkOrchid', hex: '#9932CC', rgb: '153 50 204', font: '#ffffff' },
 *     { name: 'Fuchsia', hex: '#FF00FF', rgb: '255 0 255', font: '#000000' },
 *     { name: 'Magenta', hex: '#FF00FF', rgb: '255 0 255', font: '#000000' },
 *     { name: 'SlateBlue', hex: '#6A5ACD', rgb: '106 90 205', font: '#ffffff' },
 *     { name: 'MediumSlateBlue', hex: '#7B68EE', rgb: '123 104 238', font: '#ffffff' },
 *     { name: 'MediumOrchid', hex: '#BA55D3', rgb: '186 85 211', font: '#ffffff' },
 *     { name: 'MediumPurple', hex: '#9370DB', rgb: '147 112 219', font: '#000000' },
 *     { name: 'Orchid', hex: '#DA70D6', rgb: '218 112 214', font: '#000000' },
 *     { name: 'Violet', hex: '#EE82EE', rgb: '238 130 238', font: '#000000' },
 *     { name: 'Plum', hex: '#DDA0DD', rgb: '221 160 221', font: '#000000' },
 *     { name: 'Thistle', hex: '#D8BFD8', rgb: '216 191 216', font: '#000000' },
 *     { name: 'Lavender', hex: '#E6E6FA', rgb: '230 230 250', font: '#000000' },
 *     { name: 'MistyRose', hex: '#FFE4E1', rgb: '255 228 225', font: '#000000' },
 *     { name: 'AntiqueWhite', hex: '#FAEBD7', rgb: '250 235 215', font: '#000000' },
 *     { name: 'Linen', hex: '#FAF0E6', rgb: '250 240 230', font: '#000000' },
 *     { name: 'Beige', hex: '#F5F5DC', rgb: '245 245 220', font: '#000000' },
 *     { name: 'WhiteSmoke', hex: '#F5F5F5', rgb: '245 245 245', font: '#000000' },
 *     { name: 'LavenderBlush', hex: '#FFF0F5', rgb: '255 240 245', font: '#000000' },
 *     { name: 'OldLace', hex: '#FDF5E6', rgb: '253 245 230', font: '#000000' },
 *     { name: 'AliceBlue', hex: '#F0F8FF', rgb: '240 248 255', font: '#000000' },
 *     { name: 'Seashell', hex: '#FFF5EE', rgb: '255 245 238', font: '#000000' },
 *     { name: 'GhostWhite', hex: '#F8F8FF', rgb: '248 248 255', font: '#000000' },
 *     { name: 'Honeydew', hex: '#F0FFF0', rgb: '240 255 240', font: '#000000' },
 *     { name: 'FloralWhite', hex: '#FFFAF0', rgb: '255 250 240', font: '#000000' },
 *     { name: 'Azure', hex: '#F0FFFF', rgb: '240 255 255', font: '#000000' },
 *     { name: 'MintCream', hex: '#F5FFFA', rgb: '245 255 250', font: '#000000' },
 *     { name: 'Snow', hex: '#FFFAFA', rgb: '255 250 250', font: '#000000' },
 *     { name: 'Ivory', hex: '#FFFFF0', rgb: '255 255 240', font: '#000000' },
 *     { name: 'White', hex: '#FFFFFF', rgb: '255 255 255', font: '#000000' },
 *     { name: 'Black', hex: '#000000', rgb: '0 0 0', font: '#ffffff' },
 *     { name: 'DarkSlateGray', hex: '#2F4F4F', rgb: '47 79 79', font: '#ffffff' },
 *     { name: 'DimGray', hex: '#696969', rgb: '105 105 105', font: '#ffffff' },
 *     { name: 'SlateGray', hex: '#708090', rgb: '112 128 144', font: '#ffffff' },
 *     { name: 'Gray', hex: '#808080', rgb: '128 128 128', font: '#ffffff' },
 *     { name: 'LightSlateGray', hex: '#778899', rgb: '119 136 153', font: '#000000' },
 *     { name: 'DarkGray', hex: '#A9A9A9', rgb: '169 169 169', font: '#000000' },
 *     { name: 'Silver', hex: '#C0C0C0', rgb: '192 192 192', font: '#000000' },
 *     { name: 'LightGray', hex: '#D3D3D3', rgb: '211 211 211', font: '#000000' },
 *     { name: 'Gainsboro', hex: '#DCDCDC', rgb: '220 220 220', font: '#000000' },
 *     { name: 'Orange', hex: '#FFA500', rgb: '255 165 0', font: '#000000' },
 *     { name: 'RebeccaPurple', hex: '#663399', rgb: '102 51 153', font: '#ffffff' },
 *   ]
 *   for (const color of cssColors) {
 *     const fontoColorName = color.font === '#ffffff' ? 'white' : 'black'
 *     test(`${fontoColorName} font to ${color.name}`, () => {
 *       const font = fontColorContrast(color.hex)
 *       expect(font).toBe(color.font)
 *     })
 *   }
 * })
 */

/*
 * describe('90\'s Web Safe colors', () => {
 *   const webSafeColors = [
 *     { hex: '#000', font: '#ffffff' },
 *     { hex: '#003', font: '#ffffff' },
 *     { hex: '#006', font: '#ffffff' },
 *     { hex: '#009', font: '#ffffff' },
 *     { hex: '#00C', font: '#ffffff' },
 *     { hex: '#00F', font: '#ffffff' },
 *     { hex: '#030', font: '#ffffff' },
 *     { hex: '#033', font: '#ffffff' },
 *     { hex: '#036', font: '#ffffff' },
 *     { hex: '#039', font: '#ffffff' },
 *     { hex: '#03C', font: '#ffffff' },
 *     { hex: '#03F', font: '#ffffff' },
 *     { hex: '#060', font: '#ffffff' },
 *     { hex: '#063', font: '#ffffff' },
 *     { hex: '#066', font: '#ffffff' },
 *     { hex: '#069', font: '#ffffff' },
 *     { hex: '#06C', font: '#ffffff' },
 *     { hex: '#06F', font: '#ffffff' },
 *     { hex: '#090', font: '#ffffff' },
 *     { hex: '#093', font: '#ffffff' },
 *     { hex: '#096', font: '#ffffff' },
 *     { hex: '#099', font: '#000000' },
 *     { hex: '#09C', font: '#000000' },
 *     { hex: '#09F', font: '#000000' },
 *     { hex: '#0C0', font: '#000000' },
 *     { hex: '#0C3', font: '#000000' },
 *     { hex: '#0C6', font: '#000000' },
 *     { hex: '#0C9', font: '#000000' },
 *     { hex: '#0CC', font: '#000000' },
 *     { hex: '#0CF', font: '#000000' },
 *     { hex: '#0F0', font: '#000000' },
 *     { hex: '#0F3', font: '#000000' },
 *     { hex: '#0F6', font: '#000000' },
 *     { hex: '#0F9', font: '#000000' },
 *     { hex: '#0FC', font: '#000000' },
 *     { hex: '#0FF', font: '#000000' },
 *     { hex: '#300', font: '#ffffff' },
 *     { hex: '#303', font: '#ffffff' },
 *     { hex: '#306', font: '#ffffff' },
 *     { hex: '#309', font: '#ffffff' },
 *     { hex: '#30C', font: '#ffffff' },
 *     { hex: '#30F', font: '#ffffff' },
 *     { hex: '#330', font: '#ffffff' },
 *     { hex: '#333', font: '#ffffff' },
 *     { hex: '#336', font: '#ffffff' },
 *     { hex: '#339', font: '#ffffff' },
 *     { hex: '#33C', font: '#ffffff' },
 *     { hex: '#33F', font: '#ffffff' },
 *     { hex: '#360', font: '#ffffff' },
 *     { hex: '#363', font: '#ffffff' },
 *     { hex: '#366', font: '#ffffff' },
 *     { hex: '#369', font: '#ffffff' },
 *     { hex: '#36C', font: '#ffffff' },
 *     { hex: '#36F', font: '#ffffff' },
 *     { hex: '#390', font: '#ffffff' },
 *     { hex: '#393', font: '#000000' },
 *     { hex: '#396', font: '#000000' },
 *     { hex: '#399', font: '#000000' },
 *     { hex: '#39C', font: '#000000' },
 *     { hex: '#39F', font: '#000000' },
 *     { hex: '#3C0', font: '#000000' },
 *     { hex: '#3C3', font: '#000000' },
 *     { hex: '#3C6', font: '#000000' },
 *     { hex: '#3C9', font: '#000000' },
 *     { hex: '#3CC', font: '#000000' },
 *     { hex: '#3CF', font: '#000000' },
 *     { hex: '#3F0', font: '#000000' },
 *     { hex: '#3F3', font: '#000000' },
 *     { hex: '#3F6', font: '#000000' },
 *     { hex: '#3F9', font: '#000000' },
 *     { hex: '#3FC', font: '#000000' },
 *     { hex: '#3FF', font: '#000000' },
 *     { hex: '#600', font: '#ffffff' },
 *     { hex: '#603', font: '#ffffff' },
 *     { hex: '#606', font: '#ffffff' },
 *     { hex: '#609', font: '#ffffff' },
 *     { hex: '#60C', font: '#ffffff' },
 *     { hex: '#60F', font: '#ffffff' },
 *     { hex: '#630', font: '#ffffff' },
 *     { hex: '#633', font: '#ffffff' },
 *     { hex: '#636', font: '#ffffff' },
 *     { hex: '#639', font: '#ffffff' },
 *     { hex: '#63C', font: '#ffffff' },
 *     { hex: '#63F', font: '#ffffff' },
 *     { hex: '#660', font: '#ffffff' },
 *     { hex: '#663', font: '#ffffff' },
 *     { hex: '#666', font: '#ffffff' },
 *     { hex: '#669', font: '#ffffff' },
 *     { hex: '#66C', font: '#ffffff' },
 *     { hex: '#66F', font: '#ffffff' },
 *     { hex: '#690', font: '#000000' },
 *     { hex: '#693', font: '#000000' },
 *     { hex: '#696', font: '#000000' },
 *     { hex: '#699', font: '#000000' },
 *     { hex: '#69C', font: '#000000' },
 *     { hex: '#69F', font: '#000000' },
 *     { hex: '#6C0', font: '#000000' },
 *     { hex: '#6C3', font: '#000000' },
 *     { hex: '#6C6', font: '#000000' },
 *     { hex: '#6C9', font: '#000000' },
 *     { hex: '#6CC', font: '#000000' },
 *     { hex: '#6CF', font: '#000000' },
 *     { hex: '#6F0', font: '#000000' },
 *     { hex: '#6F3', font: '#000000' },
 *     { hex: '#6F6', font: '#000000' },
 *     { hex: '#6F9', font: '#000000' },
 *     { hex: '#6FC', font: '#000000' },
 *     { hex: '#6FF', font: '#000000' },
 *     { hex: '#900', font: '#ffffff' },
 *     { hex: '#903', font: '#ffffff' },
 *     { hex: '#906', font: '#ffffff' },
 *     { hex: '#909', font: '#ffffff' },
 *     { hex: '#90C', font: '#ffffff' },
 *     { hex: '#90F', font: '#ffffff' },
 *     { hex: '#930', font: '#ffffff' },
 *     { hex: '#933', font: '#ffffff' },
 *     { hex: '#936', font: '#ffffff' },
 *     { hex: '#939', font: '#ffffff' },
 *     { hex: '#93C', font: '#ffffff' },
 *     { hex: '#93F', font: '#ffffff' },
 *     { hex: '#960', font: '#ffffff' },
 *     { hex: '#963', font: '#ffffff' },
 *     { hex: '#966', font: '#ffffff' },
 *     { hex: '#969', font: '#ffffff' },
 *     { hex: '#96C', font: '#ffffff' },
 *     { hex: '#96F', font: '#000000' },
 *     { hex: '#990', font: '#000000' },
 *     { hex: '#993', font: '#000000' },
 *     { hex: '#996', font: '#000000' },
 *     { hex: '#999', font: '#000000' },
 *     { hex: '#99C', font: '#000000' },
 *     { hex: '#99F', font: '#000000' },
 *     { hex: '#9C0', font: '#000000' },
 *     { hex: '#9C3', font: '#000000' },
 *     { hex: '#9C6', font: '#000000' },
 *     { hex: '#9C9', font: '#000000' },
 *     { hex: '#9CC', font: '#000000' },
 *     { hex: '#9CF', font: '#000000' },
 *     { hex: '#9F0', font: '#000000' },
 *     { hex: '#9F3', font: '#000000' },
 *     { hex: '#9F6', font: '#000000' },
 *     { hex: '#9F9', font: '#000000' },
 *     { hex: '#9FC', font: '#000000' },
 *     { hex: '#9FF', font: '#000000' },
 *     { hex: '#C00', font: '#ffffff' },
 *     { hex: '#C03', font: '#ffffff' },
 *     { hex: '#C06', font: '#ffffff' },
 *     { hex: '#C09', font: '#ffffff' },
 *     { hex: '#C0C', font: '#ffffff' },
 *     { hex: '#C0F', font: '#ffffff' },
 *     { hex: '#C30', font: '#ffffff' },
 *     { hex: '#C33', font: '#ffffff' },
 *     { hex: '#C36', font: '#ffffff' },
 *     { hex: '#C39', font: '#ffffff' },
 *     { hex: '#C3C', font: '#ffffff' },
 *     { hex: '#C3F', font: '#ffffff' },
 *     { hex: '#C60', font: '#000000' },
 *     { hex: '#C63', font: '#000000' },
 *     { hex: '#C66', font: '#000000' },
 *     { hex: '#C69', font: '#000000' },
 *     { hex: '#C6C', font: '#000000' },
 *     { hex: '#C6F', font: '#000000' },
 *     { hex: '#C90', font: '#000000' },
 *     { hex: '#C93', font: '#000000' },
 *     { hex: '#C96', font: '#000000' },
 *     { hex: '#C99', font: '#000000' },
 *     { hex: '#C9C', font: '#000000' },
 *     { hex: '#C9F', font: '#000000' },
 *     { hex: '#CC0', font: '#000000' },
 *     { hex: '#CC3', font: '#000000' },
 *     { hex: '#CC6', font: '#000000' },
 *     { hex: '#CC9', font: '#000000' },
 *     { hex: '#CCC', font: '#000000' },
 *     { hex: '#CCF', font: '#000000' },
 *     { hex: '#CF0', font: '#000000' },
 *     { hex: '#CF3', font: '#000000' },
 *     { hex: '#CF6', font: '#000000' },
 *     { hex: '#CF9', font: '#000000' },
 *     { hex: '#CFC', font: '#000000' },
 *     { hex: '#CFF', font: '#000000' },
 *     { hex: '#F00', font: '#ffffff' },
 *     { hex: '#F03', font: '#ffffff' },
 *     { hex: '#F06', font: '#ffffff' },
 *     { hex: '#F09', font: '#000000' },
 *     { hex: '#F0C', font: '#000000' },
 *     { hex: '#F0F', font: '#000000' },
 *     { hex: '#F30', font: '#000000' },
 *     { hex: '#F33', font: '#000000' },
 *     { hex: '#F36', font: '#000000' },
 *     { hex: '#F39', font: '#000000' },
 *     { hex: '#F3C', font: '#000000' },
 *     { hex: '#F3F', font: '#000000' },
 *     { hex: '#F60', font: '#000000' },
 *     { hex: '#F63', font: '#000000' },
 *     { hex: '#F66', font: '#000000' },
 *     { hex: '#F69', font: '#000000' },
 *     { hex: '#F6C', font: '#000000' },
 *     { hex: '#F6F', font: '#000000' },
 *     { hex: '#F90', font: '#000000' },
 *     { hex: '#F93', font: '#000000' },
 *     { hex: '#F96', font: '#000000' },
 *     { hex: '#F99', font: '#000000' },
 *     { hex: '#F9C', font: '#000000' },
 *     { hex: '#F9F', font: '#000000' },
 *     { hex: '#FC0', font: '#000000' },
 *     { hex: '#FC3', font: '#000000' },
 *     { hex: '#FC6', font: '#000000' },
 *     { hex: '#FC9', font: '#000000' },
 *     { hex: '#FCC', font: '#000000' },
 *     { hex: '#FCF', font: '#000000' },
 *     { hex: '#FF0', font: '#000000' },
 *     { hex: '#FF3', font: '#000000' },
 *     { hex: '#FF6', font: '#000000' },
 *     { hex: '#FF9', font: '#000000' },
 *     { hex: '#FFC', font: '#000000' },
 *     { hex: '#FFF', font: '#000000' },
 *   ]
 *   for (const color of webSafeColors) {
 *     const fontoColorName = color.font === '#ffffff' ? 'white' : 'black'
 *     test(`${fontoColorName} font to ${color.hex}`, () => {
 *       const font = fontColorContrast(color.hex)
 *       expect(font).toBe(color.font)
 *     })
 *   }
 * })
 */
