// Notes from Richard: 
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is being used
// to support the scanning capability of this solution.

import CharacterSetECI from '../common/CharacterSetECI';
import StringEncoding from './StringEncoding';


export default class StringBuilder {

  private encoding!: CharacterSetECI;

  public constructor(private value: string = '') {}

  public enableDecoding(encoding: CharacterSetECI): StringBuilder {
    this.encoding = encoding
    return this;
  }

  public append(s: string | number): StringBuilder {
    if (typeof s === 'string') {
      this.value += s.toString();
    } else if (this.encoding) {
      // use passed format (fromCharCode will return UTF8 encoding)
      this.value += StringEncoding.decode(new Uint8Array([s]), this.encoding);
    } else {
      // correctly converts from UTF-8, but not other encodings
      this.value += String.fromCharCode(s);
    }
    return this;
  }

  public length(): number {
    return this.value.length;
  }

  public charAt(n: number): string {
    return this.value.charAt(n);
  }

  public deleteCharAt(n: number) {
    this.value = this.value.substr(0, n) + this.value.substring(n + 1);
  }

  public setCharAt(n: number, c: string) {
    this.value = this.value.substr(0, n) + c + this.value.substr(n + 1);
  }

  public substring(start: number, end: number): string {
    return this.value.substring(start, end);
  }

  /**
   * @note helper method for RSS Expanded
   */
  public setLengthToZero(): void {
      this.value = "";
  }

  public toString(): string {
    return this.value;
  }

  public insert(n: number, c: string) {
    this.value = this.value.substr(0, n) + c + this.value.substr(n + c.length);
  }
}
