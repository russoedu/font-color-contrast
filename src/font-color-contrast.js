var fontColorContrast = function(hexColorOrRedOrArray, green, blue) {
  // Check if the color is hexadecimal (with hash)
  var hash = /#/;
  var isHex = hash.test(hexColorOrRedOrArray);
  var isRGB = green !== undefined && blue !== undefined ? true : false;
  var isArray = Array.isArray(hexColorOrRedOrArray);

  //Default is a bright color
  var fontColor = '#ffffff';
  var red = 0;

  if (isHex) {
    red = hexToDec(hexColorOrRedOrArray.substr(1, 2));
    green = hexToDec(hexColorOrRedOrArray.substr(3, 2));
    blue = hexToDec(hexColorOrRedOrArray.substr(5, 2));

  } else if (isRGB) {
    red = parseInt(hexColorOrRedOrArray);
    green = parseInt(green);
    blue = parseInt(blue);

  } else if (isArray) {
    red = parseInt(hexColorOrRedOrArray[0]);
    green = parseInt(hexColorOrRedOrArray[1]);
    blue = parseInt(hexColorOrRedOrArray[2]);

  } else {
    // Not a color, respond with white color
    return fontColor;
  }

  var contrast = Math.sqrt(
    red * red * .241 +
    green * green * .691 +
    blue * blue * .068
  );

  if (contrast > 130) {
    fontColor = '#000000';
  }

  return fontColor;
};

module.exports = fontColorContrast;

var hexToDec = function(hexString) {
  var decString = (hexString).replace(/[^a-f0-9]/gi, '')
  return parseInt(decString, 16)
}
