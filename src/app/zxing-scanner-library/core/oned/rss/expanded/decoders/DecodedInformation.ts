// Notes from Richard:  NOT BEING USED
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is not being used
// to support the scanning capability of this solution.  However, I am 
// keeping it around in case it is needed in the future.  It is commented
// out, so that we won't have to maintain the code.

//import DecodedObject from './DecodedObject'
//export default class DecodedInformation extends DecodedObject{

//  private readonly newString: string;
//  private readonly remainingValue: number;
//  private readonly remaining: boolean;

//  constructor(newPosition: number, newString: string,remainingValue?:number) {
//    super(newPosition);
//    if (remainingValue) {
//      this.remaining = true;
//      this.remainingValue = this.remainingValue;
//    } else {
//      this.remaining = false;
//      this.remainingValue = 0;
//    }
//    this.newString = newString;
//  }

//  getNewString(): string{
//    return this.newString;
//  }

//  isRemaining(): boolean{
//    return this.remaining;
//  }
//  getRemainingValue() {
//    return this.remainingValue;
//  }
//}