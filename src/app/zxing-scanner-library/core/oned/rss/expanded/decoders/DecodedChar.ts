// Notes from Richard:  NOT BEING USED
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is not being used
// to support the scanning capability of this solution.  However, I am 
// keeping it around in case it is needed in the future.  It is commented
// out, so that we won't have to maintain the code.

//import DecodedObject from './DecodedObject';
//export default class DecodedChar extends DecodedObject{
//  private readonly value: string
//  static readonly FNC1 = '$';

//  constructor(newPosition: number, value: string) {
//    super(newPosition);
//    this.value = value;
//  }

//  getValue(): string{
//    return this.value;
//  }
//  isFNC1():boolean {
//    return this.value === DecodedChar.FNC1;
//  }

//}