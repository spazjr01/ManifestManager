// Notes from Richard:  NOT BEING USED
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is not being used
// to support the scanning capability of this solution.  However, I am 
// keeping it around in case it is needed in the future.  It is commented
// out, so that we won't have to maintain the code.

//import ResultPoint from '../../ResultPoint';

//export default class FinderPattern {

//    private resultPoints: Array<ResultPoint>;

//    public constructor(private value: number, private startEnd: number[], start: number, end: number, rowNumber: number) {
//        this.value = value;
//        this.startEnd = startEnd;
//        this.resultPoints = new Array<ResultPoint>();
//        this.resultPoints.push(new ResultPoint(start, rowNumber));
//        this.resultPoints.push(new ResultPoint(end, rowNumber));
//    }

//    public getValue(): number {
//        return this.value;
//    }

//    public getStartEnd(): number[] {
//        return this.startEnd;
//    }

//    public getResultPoints(): Array<ResultPoint> {
//        return this.resultPoints;
//    }

//    public equals(o: object): boolean {
//        if (!(o instanceof FinderPattern)) {
//            return false;
//        }
//        const that = <FinderPattern>o;
//        return this.value === that.value;
//    }

//    public hashCode(): number {
//        return this.value;
//    }
//}
