// Notes from Richard:  NOT BEING USED
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is not being used
// to support the scanning capability of this solution.  However, I am 
// keeping it around in case it is needed in the future.  It is commented
// out, so that we won't have to maintain the code.

//import AI01decoder from './AI01decoder';
//import BitArray from '../../../../common/BitArray';
//import NotFoundException from '../../../../NotFoundException';
//import StringBuilder from '../../../../util/StringBuilder';
//export default class AI01392xDecoder extends AI01decoder{
//  private static readonly  HEADER_SIZE = 5 + 1 + 2;
//  private static readonly  LAST_DIGIT_SIZE = 2;

//  constructor(information:BitArray) {
//    super(information);
//  }

//  public  parseInformation():string{
//    if (this.getInformation().getSize() < AI01392xDecoder.HEADER_SIZE + AI01decoder.GTIN_SIZE) {
//      throw new NotFoundException();
//    }
//    let buf = new StringBuilder();

//    this.encodeCompressedGtin(buf, AI01392xDecoder.HEADER_SIZE);

//    let lastAIdigit = this.getGeneralDecoder().extractNumericValueFromBitArray(AI01392xDecoder.HEADER_SIZE + AI01decoder.GTIN_SIZE, AI01392xDecoder.LAST_DIGIT_SIZE);
//    buf.append("(392");
//    buf.append(lastAIdigit);
//    buf.append(')');

//   let decodedInformation = this.getGeneralDecoder().decodeGeneralPurposeField(AI01392xDecoder.HEADER_SIZE + AI01decoder.GTIN_SIZE + AI01392xDecoder.LAST_DIGIT_SIZE, null);
//    buf.append(decodedInformation.getNewString());

//    return buf.toString();
//  }
//}