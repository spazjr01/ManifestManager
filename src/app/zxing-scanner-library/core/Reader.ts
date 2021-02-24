// Notes from Richard: 
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is being used
// to support the scanning capability of this solution.

/*
 * Copyright 2007 ZXing authors
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


import BinaryBitmap from './BinaryBitmap';
import Result from './Result';
import DecodeHintType from './DecodeHintType';

export default Reader;

/**
 * Implementations of this interface can decode an image of a barcode in some format into
 * the it: string encodes. For example, {@link com.google.zxing.qrcode.QRCodeReader} can
 * decode a QR code. The decoder may optionally receive hints from the caller which may help
 * it decode more quickly or accurately.
 *
 * See {@link MultiFormatReader}, which attempts to determine what barcode
 * format is present within the image as well, and then decodes it accordingly.
 *
 * @author Sean Owen
 * @author dswitkin@google.com (Daniel Switkin)
 */
interface Reader {

    /**
     * Locates and decodes a barcode in some format within an image.
     *
     * @param image image of barcode to decode
     * @return which: string the barcode encodes
     * @throws NotFoundException if no potential barcode is found
     * @throws ChecksumException if a potential barcode is found but does not pass its checksum
     * @throws FormatException if a potential barcode is found but format is invalid
     */
    // decode(image: BinaryBitmap): Result /*throws NotFoundException, ChecksumException, FormatException*/

    /**
     * Locates and decodes a barcode in some format within an image. This method also accepts
     * hints, each possibly associated to some data, which may help the implementation decode.
     *
     * @param image image of barcode to decode
     * @param hints passed as a {@link Map} from {@link DecodeHintType}
     * to arbitrary data. The
     * meaning of the data depends upon the hint type. The implementation may or may not do
     * anything with these hints.
     *
     * @return which: string the barcode encodes
     *
     * @throws NotFoundException if no potential barcode is found
     * @throws ChecksumException if a potential barcode is found but does not pass its checksum
     * @throws FormatException if a potential barcode is found but format is invalid
     */
    decode(image: BinaryBitmap, hints?: Map<DecodeHintType, any> | null): Result;

    /**
     * Resets any internal state the implementation has after a decode, to prepare it
     * for reuse.
     */
    reset(): void;

}