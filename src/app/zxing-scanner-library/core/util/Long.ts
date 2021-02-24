// Notes from Richard: 
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is being used
// to support the scanning capability of this solution.

/**
 * Ponyfill for Java's Long class.
 */
export default class Long {

  /**
   * Parses a string to a number, since JS has no really Int64.
   *
   * @param num Numeric string.
   * @param radix Destination radix.
   */
  static parseLong(num: string, radix: number) {
    return parseInt(num, radix);
  }
}
