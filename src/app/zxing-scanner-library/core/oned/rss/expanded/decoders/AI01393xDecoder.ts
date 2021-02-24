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
//export default class AI01393xDecoder extends AI01decoder{
//  private static readonly HEADER_SIZE = 5 + 1 + 2;
//  private static readonly LAST_DIGIT_SIZE = 2;
//  private static readonly FIRST_THREE_DIGITS_SIZE = 10;

//  constructor(information:BitArray) {
//    super(information)
//  }

//  public  parseInformation():string {
//    if (this.getInformation().getSize() < AI01393xDecoder.HEADER_SIZE + AI01decoder.GTIN_SIZE) {
//      throw new NotFoundException();
//    }

//    let buf = new StringBuilder();

//    this.encodeCompressedGtin(buf, AI01393xDecoder.HEADER_SIZE);

//    let lastAIdigit = this.getGeneralDecoder().extractNumericValueFromBitArray(AI01393xDecoder.HEADER_SIZE + AI01decoder.GTIN_SIZE, AI01393xDecoder.LAST_DIGIT_SIZE);

//    buf.append("(393");
//    buf.append(lastAIdigit);
//    buf.append(')');

//    let firstThreeDigits = this.getGeneralDecoder().extractNumericValueFromBitArray(AI01393xDecoder.HEADER_SIZE + AI01decoder.GTIN_SIZE + AI01393xDecoder.LAST_DIGIT_SIZE, AI01393xDecoder.FIRST_THREE_DIGITS_SIZE);
//    if (firstThreeDigits / 100 == 0) {
//      buf.append('0');
//    }
//    if (firstThreeDigits / 10 == 0) {
//      buf.append('0');
//    }
//    buf.append(firstThreeDigits);

//    let generalInformation = this.getGeneralDecoder().decodeGeneralPurposeField(AI01393xDecoder.HEADER_SIZE + AI01decoder.GTIN_SIZE + AI01393xDecoder.LAST_DIGIT_SIZE + AI01393xDecoder.FIRST_THREE_DIGITS_SIZE, null);
//    buf.append(generalInformation.getNewString());

//    return buf.toString();
//  }
//}