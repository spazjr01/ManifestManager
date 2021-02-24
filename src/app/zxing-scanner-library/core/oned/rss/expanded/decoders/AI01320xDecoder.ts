// Notes from Richard:  NOT BEING USED
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is not being used
// to support the scanning capability of this solution.  However, I am 
// keeping it around in case it is needed in the future.  It is commented
// out, so that we won't have to maintain the code.

//import AI013x0xDecoder from './AI013x0xDecoder';
//import BitArray from '../../../../common/BitArray';
//import StringBuilder from '../../../../util/StringBuilder';
//export default class AI01320xDecoder extends AI013x0xDecoder {
//  constructor(information: BitArray) {
//    super(information);
//  }

//  protected  addWeightCode(buf:StringBuilder, weight:number):void {
//    if (weight < 10000) {
//      buf.append("(3202)");
//    } else {
//      buf.append("(3203)");
//    }
//  }

//  protected checkWeight(weight:number):number {
//    if (weight < 10000) {
//      return weight;
//    }
//    return weight - 10000;
//  }
//}