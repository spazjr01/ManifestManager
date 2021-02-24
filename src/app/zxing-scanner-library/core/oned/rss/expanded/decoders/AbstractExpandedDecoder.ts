// Notes from Richard:  NOT BEING USED
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is not being used
// to support the scanning capability of this solution.  However, I am 
// keeping it around in case it is needed in the future.  It is commented
// out, so that we won't have to maintain the code.

//import BitArray from '../../../../common/BitArray';
//import GeneralAppIdDecoder from './GeneralAppIdDecoder';

//export default abstract class AbstractExpandedDecoder {

//  private readonly information: BitArray;
//  private readonly generalDecoder: GeneralAppIdDecoder;

//  constructor(information: BitArray) {
//    this.information = information;
//    this.generalDecoder = new GeneralAppIdDecoder(information);
//  }

//  protected getInformation(): BitArray {
//    return this.information;
//  }

//  protected getGeneralDecoder(): GeneralAppIdDecoder {
//    return this.generalDecoder;
//  }

//  public abstract parseInformation(): string;

//  // createDecoder moved to own file due to circular dependency
//}
