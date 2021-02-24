// Notes from Richard:  NOT BEING USED
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is not being used
// to support the scanning capability of this solution.  However, I am 
// keeping it around in case it is needed in the future.  It is commented
// out, so that we won't have to maintain the code.

//import DataCharacter from './DataCharacter';
//import FinderPattern from './FinderPattern';

//export default class Pair extends DataCharacter {

//    private finderPattern: FinderPattern;
//    private count: number = 0;

//    public constructor(value: number, checksumPortion: number, finderPattern: FinderPattern) {
//        super(value, checksumPortion);
//        this.finderPattern = finderPattern;
//    }

//    getFinderPattern(): FinderPattern {
//        return this.finderPattern;
//    }

//    getCount(): number {
//        return this.count;
//    }

//    incrementCount() {
//        this.count++;
//    }

//}
