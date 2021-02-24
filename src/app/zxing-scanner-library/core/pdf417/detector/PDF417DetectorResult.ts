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

import ResultPoint from '../../ResultPoint';
import BitMatrix from '../../common/BitMatrix';

/**
 * @author Guenther Grau
 */
export default /*public final*/ class PDF417DetectorResult {

    private /*final*/ bits: BitMatrix;
    private /*final*/ points: ResultPoint[][];

    constructor(bits: BitMatrix, points: ResultPoint[][]) {
        this.bits = bits;
        this.points = points;
    }

    public getBits(): BitMatrix {
        return this.bits;
    }

    public getPoints(): ResultPoint[][] {
        return this.points;
    }

}
