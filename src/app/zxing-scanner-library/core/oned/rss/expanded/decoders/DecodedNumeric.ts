// Notes from Richard:  NOT BEING USED
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is not being used
// to support the scanning capability of this solution.  However, I am 
// keeping it around in case it is needed in the future.  It is commented
// out, so that we won't have to maintain the code.

//import FormatException from '../../../../FormatException';
//import DecodedObject from './DecodedObject';
//export default class DecodedNumeric extends DecodedObject {
//  private readonly firstDigit: number;
//  private readonly secondDigit: number;
//  static readonly FNC1: number = 10

//  constructor(newPosition:number,firstDigit:number,secondDigit:number) {
//    super(newPosition);
//    if (firstDigit < 0 || firstDigit > 10 || secondDigit < 0 || secondDigit > 10) {
//      throw new FormatException();
//    }
//    this.firstDigit  = firstDigit;
//    this.secondDigit = secondDigit;
//  }

//   getFirstDigit():number {
//    return this.firstDigit;
//  }

//  getSecondDigit():number {
//    return this.secondDigit;
//  }

//  getValue():number {
//    return this.firstDigit * 10 + this.secondDigit;
//  }

//  isFirstDigitFNC1():boolean {
//    return this.firstDigit == DecodedNumeric.FNC1;
//  }

// isSecondDigitFNC1():boolean {
//    return this.secondDigit == DecodedNumeric.FNC1;
//  }

//   isAnyFNC1():boolean {
//    return this.firstDigit === DecodedNumeric.FNC1 || this.secondDigit === DecodedNumeric.FNC1;
//  }

//}