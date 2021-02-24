// Notes from Richard:  NOT BEING USED
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is not being used
// to support the scanning capability of this solution.  However, I am 
// keeping it around in case it is needed in the future.  It is commented
// out, so that we won't have to maintain the code.

//import AI01decoder from './AI01decoder';
//import BitArray from '../../../../common/BitArray';
//import StringBuilder from '../../../../util/StringBuilder';
//export default class AI01AndOtherAIs extends AI01decoder{

//  private static readonly  HEADER_SIZE = 1 + 1 + 2; //first bit encodes the linkage flag,
//  //the second one is the encodation method, and the other two are for the variable length

//  constructor(information: BitArray) {
//    super(information)
//  }

//  public parseInformation(): string {

//  let buff = new StringBuilder();
//  buff.append("(01)");
//  let initialGtinPosition = buff.length();
//  let  firstGtinDigit = this.getGeneralDecoder().extractNumericValueFromBitArray(AI01AndOtherAIs.HEADER_SIZE, 4);
//  buff.append(firstGtinDigit);
//  this.encodeCompressedGtinWithoutAI(buff, AI01AndOtherAIs.HEADER_SIZE + 4, initialGtinPosition);
//  return this.getGeneralDecoder().decodeAllCodes(buff, AI01AndOtherAIs.HEADER_SIZE + 44);
//}

//}