// Notes from Richard:  NOT BEING USED
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is not being used
// to support the scanning capability of this solution.  However, I am 
// keeping it around in case it is needed in the future.  It is commented
// out, so that we won't have to maintain the code.

//import BitArray from '../../../../common/BitArray';
//import StringBuilder from '../../../../util/StringBuilder';
//import AbstractExpandedDecoder from './AbstractExpandedDecoder';


//export default class AnyAIDecoder extends AbstractExpandedDecoder {

//  private static readonly HEADER_SIZE: number = 2 + 1 + 2;

//  constructor(information: BitArray) {
//    super(information);
//  }

//  public parseInformation(): string {
//    let buf = new StringBuilder();
//    return this.getGeneralDecoder().decodeAllCodes(buf, AnyAIDecoder.HEADER_SIZE);
//  }
//}
