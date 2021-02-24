// Notes from Richard:  NOT BEING USED
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is not being used
// to support the scanning capability of this solution.  However, I am 
// keeping it around in case it is needed in the future.  It is commented
// out, so that we won't have to maintain the code.

//import DecodedInformation from './DecodedInformation';

//export default class BlockParsedResult {

//  private readonly decodedInformation: DecodedInformation;
//  private readonly finished: boolean;

//  constructor(finished: boolean,decodedInformation?:DecodedInformation) {
//    if (decodedInformation) {
//      this.decodedInformation = null;
//    } else {
//      this.finished = finished;
//      this.decodedInformation = decodedInformation;
//    }
//  }

//  getDecodedInformation(): DecodedInformation{
//    return this.decodedInformation;
//  }

//  isFinished(): boolean{
//    return this.finished;
//  }

//}