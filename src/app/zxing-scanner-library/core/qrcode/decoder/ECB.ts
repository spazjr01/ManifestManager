// Notes from Richard:  NOT BEING USED
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is not being used
// to support the scanning capability of this solution.  However, I am 
// keeping it around in case it is needed in the future.  It is commented
// out, so that we won't have to maintain the code.

///**
// * <p>Encapsulates the parameters for one error-correction block in one symbol version.
// * This includes the number of data codewords, and the number of times a block with these
// * parameters is used consecutively in the QR code version's format.</p>
// */
//export default class ECB {
//    private count: number; /*int*/
//    private dataCodewords: number; /*int*/

//    public constructor(count: number /*int*/, dataCodewords: number /*int*/) {
//        this.count = count;
//        this.dataCodewords = dataCodewords;
//    }

//    public getCount(): number /*int*/ {
//        return this.count;
//    }

//    public getDataCodewords(): number /*int*/ {
//        return this.dataCodewords;
//    }
//}
