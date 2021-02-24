// Notes from Richard:  NOT BEING USED
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is not being used
// to support the scanning capability of this solution.  However, I am 
// keeping it around in case it is needed in the future.  It is commented
// out, so that we won't have to maintain the code.

//import BitArray from '../../../../common/BitArray';
//import AI01decoder from './AI01decoder';
//import StringBuilder from '../../../../util/StringBuilder';
//export default abstract class AI01weightDecoder extends AI01decoder {

//  constructor(information: BitArray){
//    super(information);
//}

//  encodeCompressedWeight(buf:StringBuilder, currentPos:number, weightSize:number):void {
//    let originalWeightNumeric = this.getGeneralDecoder().extractNumericValueFromBitArray(currentPos, weightSize);
//    this.addWeightCode(buf, originalWeightNumeric);

//    let weightNumeric = this.checkWeight(originalWeightNumeric);

//    let currentDivisor = 100000;
//    for (let i = 0; i < 5; ++i) {
//      if (weightNumeric / currentDivisor == 0) {
//        buf.append('0');
//      }
//      currentDivisor /= 10;
//    }
//    buf.append(weightNumeric);
//  }

//  protected abstract  addWeightCode(buf:StringBuilder,weight:number):void;

//  protected abstract  checkWeight(weight:number):number;
//}