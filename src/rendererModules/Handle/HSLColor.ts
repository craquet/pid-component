/**
 * This class represents a color in the HSL color space.
 */
export class HSLColor {
  /**
   * The hue value of the color.
   * @type {number}
   */
  hue: number;

  /**
   * The saturation value of the color.
   * @type {number}
   */
  sat: number;

  /**
   * The luminosity value of the color.
   * @type {number}
   */
  lum: number;

  /**
   * Creates a new HSLColor object.
   * @param hue The hue value of the color.
   * @param sat The saturation value of the color.
   * @param lum The luminosity value of the color.
   * @constructor
   */
  constructor(hue: number, sat: number, lum: number) {
    this.hue = hue;
    this.sat = sat;
    this.lum = lum;
  }

  /**
   * Returns the color as a CSS string.
   * @returns {string} The color as a CSS string.
   */
  toString(): string {
    return `hsl(${this.hue}, ${this.sat}%, ${this.lum}%)`;
  }

  /**
   * Generates a color based on the SHA-256 value of a text.
   * @param text The text to generate the color from.
   * @returns {Promise<HSLColor>} The generated color.
   */
  public static async generateColor(text: string): Promise<HSLColor> {
    if (window.crypto && window.crypto.subtle) {
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
      const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string

      const hue: number = (parseInt(hashHex, 16) % 36000) / 100;
      const lum: number = (parseInt(hashHex, 16) % 450) / 10;
      const sat: number = (parseInt(hashHex, 16) % 250) / 10;
      return new HSLColor(hue, 50 + sat, 30 + lum);
    } else {
      // if crypto is not available, use the text itself
      const hexText = text
        .split('')
        .map(c => c.charCodeAt(0).toString(16))
        .join('');
      const hue: number = (parseInt(hexText, 36) % 36000) / 100;
      const lum: number = (parseInt(hexText, 36) % 450) / 10;
      const sat: number = (parseInt(hexText, 36) % 250) / 10;
      return new HSLColor(hue, 50 + sat, 30 + lum);
    }
  }
}
