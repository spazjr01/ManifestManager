// Notes from Richard:  NOT BEING USED
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is not being used
// to support the scanning capability of this solution.  However, I am 
// keeping it around in case it is needed in the future.  It is commented
// out, so that we won't have to maintain the code.

///*
// * Copyright 2008 ZXing authors
// *
// * Licensed under the Apache License, Version 2.0 (the "License");
// * you may not use this file except in compliance with the License.
// * You may obtain a copy of the License at
// *
// *      http://www.apache.org/licenses/LICENSE-2.0
// *
// * Unless required by applicable law or agreed to in writing, software
// * distributed under the License is distributed on an "AS IS" BASIS,
// * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// * See the License for the specific language governing permissions and
// * limitations under the License.
// */

//import BitArray from '../common/BitArray';
//import DecodeHintType from '../DecodeHintType';

//import Result from '../Result';
//import OneDReader from './OneDReader';
//import NotFoundException from '../NotFoundException';
//import FormatException from '../FormatException';

///**
// * <p>Encapsulates functionality and implementation that is common to UPC and EAN families
// * of one-dimensional barcodes.</p>
// *
// * @author dswitkin@google.com (Daniel Switkin)
// * @author Sean Owen
// * @author alasdair@google.com (Alasdair Mackintosh)
// */
//export default abstract class AbstractUPCEANReader extends OneDReader {
//    // These two values are critical for determining how permissive the decoding will be.
//    // We've arrived at these values through a lot of trial and error. Setting them any higher
//    // lets false positives creep in quickly.
//    private static MAX_AVG_VARIANCE = 0.48;
//    private static MAX_INDIVIDUAL_VARIANCE = 0.7;

//    /**
//     * Start/end guard pattern.
//     */
//    public static START_END_PATTERN: number[] = [1, 1, 1];

//    /**
//     * Pattern marking the middle of a UPC/EAN pattern, separating the two halves.
//     */
//    public static MIDDLE_PATTERN: number[] = [1, 1, 1, 1, 1];
//    /**
//     * end guard pattern.
//     */
//    public static END_PATTERN: number[] = [1, 1, 1, 1, 1, 1];
//    /**
//     * "Odd", or "L" patterns used to encode UPC/EAN digits.
//     */
//    public static L_PATTERNS: number[][] = [
//        [3, 2, 1, 1], // 0
//        [2, 2, 2, 1], // 1
//        [2, 1, 2, 2], // 2
//        [1, 4, 1, 1], // 3
//        [1, 1, 3, 2], // 4
//        [1, 2, 3, 1], // 5
//        [1, 1, 1, 4], // 6
//        [1, 3, 1, 2], // 7
//        [1, 2, 1, 3], // 8
//        [3, 1, 1, 2], // 9
//    ];

//    /**
//     * As above but also including the "even", or "G" patterns used to encode UPC/EAN digits.
//     */
//    public static L_AND_G_PATTERNS: number[][];

//    protected decodeRowStringBuffer = '';
//    // private final UPCEANExtensionSupport extensionReader;
//    // private final EANManufacturerOrgSupport eanManSupport;


//    /*
//    protected UPCEANReader() {
//        decodeRowStringBuffer = new StringBuilder(20);
//        extensionReader = new UPCEANExtensionSupport();
//        eanManSupport = new EANManufacturerOrgSupport();
//    }
//    */

//    static findStartGuardPattern(row: BitArray): number[] {
//        let foundStart = false;
//        let startRange: number[] = null;
//        let nextStart = 0;
//        let counters = [0, 0, 0];
//        while (!foundStart) {
//            counters = [0, 0, 0];
//            startRange = AbstractUPCEANReader.findGuardPattern(row, nextStart, false, this.START_END_PATTERN, counters);
//            let start = startRange[0];
//            nextStart = startRange[1];
//            let quietStart = start - (nextStart - start);
//            if (quietStart >= 0) {
//                foundStart = row.isRange(quietStart, start, false);
//            }
//        }
//        return startRange;
//    }

//    public abstract decodeRow(rowNumber: number, row: BitArray, hints?: Map<DecodeHintType, any>): Result;

//    static checkChecksum(s: string): boolean {
//        return AbstractUPCEANReader.checkStandardUPCEANChecksum(s);
//    }

//    static checkStandardUPCEANChecksum(s: string): boolean {
//        let length = s.length;
//        if (length === 0) return false;

//        let check = parseInt(s.charAt(length - 1), 10);
//        return AbstractUPCEANReader.getStandardUPCEANChecksum(s.substring(0, length - 1)) === check;
//    }

//    static getStandardUPCEANChecksum(s: string): number {
//        let length = s.length;
//        let sum = 0;
//        for (let i = length - 1; i >= 0; i -= 2) {
//            let digit = s.charAt(i).charCodeAt(0) - '0'.charCodeAt(0);
//            if (digit < 0 || digit > 9) {
//                throw new FormatException();
//            }
//            sum += digit;
//        }
//        sum *= 3;
//        for (let i = length - 2; i >= 0; i -= 2) {
//            let digit = s.charAt(i).charCodeAt(0) - '0'.charCodeAt(0);
//            if (digit < 0 || digit > 9) {
//                throw new FormatException();
//            }
//            sum += digit;
//        }
//        return (1000 - sum) % 10;
//    }

//    static decodeEnd(row: BitArray, endStart: number): number[] {
//        return AbstractUPCEANReader.findGuardPattern(row, endStart, false, AbstractUPCEANReader.START_END_PATTERN, new Array(AbstractUPCEANReader.START_END_PATTERN.length).fill(0));
//    }

//    static findGuardPattern(row: BitArray, rowOffset: number, whiteFirst: boolean, pattern: number[], counters: number[]) {
//        let width = row.getSize();
//        rowOffset = whiteFirst ? row.getNextUnset(rowOffset) : row.getNextSet(rowOffset);
//        let counterPosition = 0;
//        let patternStart = rowOffset;
//        let patternLength = pattern.length;
//        let isWhite = whiteFirst;
//        for (let x = rowOffset; x < width; x++) {
//            if (row.get(x) !== isWhite) {
//                counters[counterPosition]++;
//            } else {
//                if (counterPosition === patternLength - 1) {
//                    if (OneDReader.patternMatchVariance(counters, pattern, AbstractUPCEANReader.MAX_INDIVIDUAL_VARIANCE) < AbstractUPCEANReader.MAX_AVG_VARIANCE) {
//                        return [patternStart, x];
//                    }
//                    patternStart += counters[0] + counters[1];

//                    let slice = counters.slice(2, counters.length);
//                    for (let i = 0; i < counterPosition - 1; i++) {
//                        counters[i] = slice[i];
//                    }

//                    counters[counterPosition - 1] = 0;
//                    counters[counterPosition] = 0;
//                    counterPosition--;
//                } else {
//                    counterPosition++;
//                }
//                counters[counterPosition] = 1;
//                isWhite = !isWhite;
//            }
//        }
//        throw new NotFoundException();
//    }

//    static decodeDigit(row: BitArray, counters: number[], rowOffset: number, patterns: number[][]) {
//        this.recordPattern(row, rowOffset, counters);
//        let bestVariance = this.MAX_AVG_VARIANCE;
//        let bestMatch = -1;
//        let max = patterns.length;
//        for (let i = 0; i < max; i++) {
//            let pattern = patterns[i];
//            let variance = OneDReader.patternMatchVariance(counters, pattern, AbstractUPCEANReader.MAX_INDIVIDUAL_VARIANCE);
//            if (variance < bestVariance) {
//                bestVariance = variance;
//                bestMatch = i;
//            }
//        }
//        if (bestMatch >= 0) {
//            return bestMatch;
//        } else {
//            throw new NotFoundException();
//        }
//    }

//    /**
//     * Get the format of this decoder.
//     *
//     * @return The 1D format.
//     */
//    public abstract getBarcodeFormat();

//    /**
//     * Subclasses override this to decode the portion of a barcode between the start
//     * and end guard patterns.
//     *
//     * @param row row of black/white values to search
//     * @param startRange start/end offset of start guard pattern
//     * @param resultString {@link StringBuilder} to append decoded chars to
//     * @return horizontal offset of first pixel after the "middle" that was decoded
//     * @throws NotFoundException if decoding could not complete successfully
//     */
//    public abstract decodeMiddle(row: BitArray, startRange: number[], resultString: string);
//}
