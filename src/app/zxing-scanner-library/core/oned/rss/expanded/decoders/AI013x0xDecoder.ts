// Notes from Richard:  NOT BEING USED
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is not being used
// to support the scanning capability of this solution.  However, I am 
// keeping it around in case it is needed in the future.  It is commented
// out, so that we won't have to maintain the code.

//import AI01weightDecoder from './AI01weightDecoder';
//import BitArray from '../../../../common/BitArray';
//import StringBuilder from '../../../../util/StringBuilder';
//import NotFoundException from '../../../../NotFoundException';

//export default  abstract class AI013x0xDecoder extends AI01weightDecoder{
//  private static readonly  HEADER_SIZE = 4 + 1;
//  private static readonly  WEIGHT_SIZE = 15;

//  constructor(information: BitArray) {
//    super(information);
//  }


//  public  parseInformation() {
//    if (this.getInformation().getSize() != AI013x0xDecoder.HEADER_SIZE + AI01weightDecoder.GTIN_SIZE + AI013x0xDecoder.WEIGHT_SIZE) {
//      throw new NotFoundException();
//    }

//    let buf = new StringBuilder();

//    this.encodeCompressedGtin(buf, AI013x0xDecoder.HEADER_SIZE);
//    this.encodeCompressedWeight(buf, AI013x0xDecoder.HEADER_SIZE + AI01weightDecoder.GTIN_SIZE, AI013x0xDecoder.WEIGHT_SIZE);

//    return buf.toString();
//  }
//}