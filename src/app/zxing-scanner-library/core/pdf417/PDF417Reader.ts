// Notes from Richard: 
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is being used
// to support the scanning capability of this solution.

/*
 * Copyright 2009 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import BarcodeFormat from '../BarcodeFormat';
import BinaryBitmap from '../BinaryBitmap';
import ChecksumException from '../ChecksumException';
import DecodeHintType from '../DecodeHintType';
import FormatException from '../FormatException';
import NotFoundException from '../NotFoundException';
import Reader from '../Reader';
import Result from '../Result';
import ResultPoint from '../ResultPoint';
import PDF417Common from './PDF417Common';
import Integer from '../util/Integer';
import PDF417ResultMetadata from './PDF417ResultMetadata';
import ResultMetadataType from '../ResultMetadataType';
import MultipleBarcodeReader from '../multi/MultipleBarcodeReader';
import Detector from './detector/Detector';
import PDF417ScanningDecoder from './decoder/PDF417ScanningDecoder';


/**
 * This implementation can detect and decode PDF417 codes in an image.
 * @author Guenther Grau
 */
export default class PDF417Reader implements Reader, MultipleBarcodeReader {

    /**
    * Locates and decodes a PDF417 code in an image.
    * @return a String representing the content encoded by the PDF417 code
    * @throws NotFoundException if a PDF417 code cannot be found,
    * @throws FormatException if a PDF417 cannot be decoded
    * @throws ChecksumException
    */
    public decode(image: BinaryBitmap, hints: Map<DecodeHintType, any> = null): Result {
        let result = PDF417Reader.decode(image, hints, false);
        if (result == null || result.length === 0 || result[0] == null) {
            throw NotFoundException.getNotFoundInstance();
        }
        return result[0];
    }

    public decodeMultiple(image: BinaryBitmap, hints: Map<DecodeHintType, any> = null): Result[] {
        try {
            return PDF417Reader.decode(image, hints, true);
        } catch (ignored) {
            if (ignored instanceof FormatException || ignored instanceof ChecksumException) {
            throw NotFoundException.getNotFoundInstance();
            }

            throw ignored;
        }
    }

    private static decode(image: BinaryBitmap, hints: Map<DecodeHintType, any>, multiple: boolean) {
        const results = new Array<Result>();
        const detectorResult = Detector.detectMultiple(image, hints, multiple);
        for (const points of detectorResult.getPoints()) {

            const decoderResult = PDF417ScanningDecoder.decode(
                detectorResult.getBits(), 
                points[4], 
                points[5],
                points[6],
                points[7],
                PDF417Reader.getMinCodewordWidth(points),
                PDF417Reader.getMaxCodewordWidth(points));

            const result = new Result(
                decoderResult.getText(),
                decoderResult.getRawBytes(),
                undefined,
                points,
                BarcodeFormat.PDF_417);

            result.putMetadata(
                ResultMetadataType.ERROR_CORRECTION_LEVEL,
                decoderResult.getECLevel());

            const pdf417ResultMetadata: PDF417ResultMetadata = decoderResult.getOther();
            if (pdf417ResultMetadata != null) {
                result.putMetadata(
                    ResultMetadataType.PDF417_EXTRA_METADATA,
                    pdf417ResultMetadata);
            }
            results.push(result);
        }
        return results.map(x => x);
    }

    private static getMaxWidth(p1: ResultPoint, p2: ResultPoint): number /*int*/ {
        if (p1 == null || p2 == null) {
            return 0;
        }
        return <number>Math.trunc(Math.abs(p1.getX() - p2.getX()));
    }

    private static getMinWidth(p1: ResultPoint, p2: ResultPoint): number /*int*/ {
        if (p1 == null || p2 == null) {
            return Integer.MAX_VALUE;
        }
        return <number> Math.trunc(Math.abs(p1.getX() - p2.getX()));
    }

    private static getMaxCodewordWidth(p: ResultPoint[]): number /*int*/ {
        return Math.floor(Math.max(
            Math.max(
                PDF417Reader.getMaxWidth(p[0], p[4]),
                PDF417Reader.getMaxWidth(p[6], p[2]) * PDF417Common.MODULES_IN_CODEWORD / PDF417Common.MODULES_IN_STOP_PATTERN),
            Math.max(
                PDF417Reader.getMaxWidth(p[1], p[5]),
                PDF417Reader.getMaxWidth(p[7], p[3]) * PDF417Common.MODULES_IN_CODEWORD / PDF417Common.MODULES_IN_STOP_PATTERN)));
    }

    private static getMinCodewordWidth(p: ResultPoint[]): number /*int*/ {
        return Math.floor(Math.min(
            Math.min(
                PDF417Reader.getMinWidth(p[0], p[4]),
                PDF417Reader.getMinWidth(p[6], p[2]) * PDF417Common.MODULES_IN_CODEWORD / PDF417Common.MODULES_IN_STOP_PATTERN),
            Math.min(
                PDF417Reader.getMinWidth(p[1], p[5]),
                PDF417Reader.getMinWidth(p[7], p[3]) * PDF417Common.MODULES_IN_CODEWORD / PDF417Common.MODULES_IN_STOP_PATTERN)));
    }

    public reset(): void {
    // nothing needs to be reset
    }
}
