/* eslint-env jasmine */
var fs = require('fs');

describe('text-color-contrast', function() {
  var fontColor = require('../font-color-contrast.js');

  var colors = {
    lightPink: "#f7d4fc",
    pinkRed: 223,
    pinkGreen: 0,
    pinkBlue: 255,
    strangeGrey: "#645466",
    notColor1: "ffffff",
    notColor2: 123456,
    lightGreen: "#b6e9be",
    paleYellowRed: "255",
    paleYellowGreen: "246",
    paleYellowBlue: "199",
    darkBlue: [20, "85", 91]
  };

  it('should respond with black font to light pink background', function() {
    var font = fontColor(colors.lightPink);
    expect(font).toBe("#000000");
  });

  it('should respond with white font to pink background', function() {
    var font = fontColor(
      colors.pinkRed,
      colors.pinkGreen,
      colors.pinkBlue
    );
    expect(font).toBe("#ffffff");
  });

  it('should respond with white font to strange grey background', function() {
    var font = fontColor(colors.strangeGrey);
    expect(font).toBe("#ffffff");
  });

  it('should respond with white font to notColor1', function() {
    var font = fontColor(colors.notColor1);
    expect(font).toBe("#ffffff");
  });

  it('should respond with white font to notColor2', function() {
    var font = fontColor(colors.notColor2);
    expect(font).toBe("#ffffff");
  });

  it('should respond with black font to light green background', function() {
    var font = fontColor(colors.lightGreen);
    expect(font).toBe("#000000");
  });

  it('should respond with black font to pale yellow background', function() {
    var font = fontColor(
      colors.paleYellowRed,
      colors.paleYellowGreen,
      colors.paleYellowBlue
    );
    expect(font).toBe("#000000");
  });

  it('should respond with white font to dark blue', function() {
    var font = fontColor(colors.darkBlue);
    expect(font).toBe("#ffffff");
  });

});
