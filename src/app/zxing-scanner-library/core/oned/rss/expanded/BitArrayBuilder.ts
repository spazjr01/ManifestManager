// Notes from Richard:  NOT BEING USED
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is not being used
// to support the scanning capability of this solution.  However, I am 
// keeping it around in case it is needed in the future.  It is commented
// out, so that we won't have to maintain the code.

//import BitArray from '../../../common/BitArray';
//import ExpandedPair from './ExpandedPair';
//export default class BitArrayBuilder{
//  constructor() {
//  }
//  static  buildBitArray(pairs:Array<ExpandedPair>):BitArray {
//    let charNumber:number = (pairs.length * 2) - 1;
//    if (pairs[pairs.length - 1].getRightChar() == null) {
//      charNumber -= 1;
//    }

//    let size:number = 12 * charNumber;

//    let binary = new BitArray(size);
//    let accPos = 0;

//    let  firstPair:ExpandedPair = pairs[0];
//    let  firstValue = firstPair.getRightChar().getValue();
//    for (let i = 11; i >= 0; --i) {
//      if ((firstValue & (1 << i)) != 0) {
//        binary.set(accPos);
//      }
//      accPos++;
//    }

//    for (let i = 1; i < pairs.length; ++i) {
//      let currentPair:ExpandedPair = pairs[i];

//      let leftValue = currentPair.getLeftChar().getValue();
//      for (let j = 11; j >= 0; --j) {
//        if ((leftValue & (1 << j)) != 0) {
//          binary.set(accPos);
//        }
//        accPos++;
//      }

//      if (currentPair.getRightChar() != null) {
//        let rightValue = currentPair.getRightChar().getValue();
//        for (let j = 11; j >= 0; --j) {
//          if ((rightValue & (1 << j)) != 0) {
//            binary.set(accPos);
//          }
//          accPos++;
//        }
//      }
//    }
//    return binary;
//  }

//}