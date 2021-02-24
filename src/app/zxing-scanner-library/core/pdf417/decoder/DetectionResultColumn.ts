// Notes from Richard: 
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is being used
// to support the scanning capability of this solution.

/*
 * Copyright 2013 ZXing authors
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

import Formatter from '../../util/Formatter';
import Codeword from './Codeword';
import BoundingBox from './BoundingBox';

/**
 * @author Guenther Grau
 */
export default class DetectionResultColumn {

    private static /*final*/ MAX_NEARBY_DISTANCE: number = 5;

    private /*final*/ boundingBox: BoundingBox;
    private /*final*/ codewords: Codeword[];

    constructor(boundingBox: BoundingBox) {
        this.boundingBox = new BoundingBox(boundingBox);
        this.codewords = new Array<Codeword>(boundingBox.getMaxY() - boundingBox.getMinY() + 1);
    }

    /*final*/  getCodewordNearby(imageRow: number): Codeword {
        let codeword = this.getCodeword(imageRow);
        if (codeword != null) {
            return codeword;
        }
        for (let i = 1; i < DetectionResultColumn.MAX_NEARBY_DISTANCE; i++) {
            let nearImageRow = this.imageRowToCodewordIndex(imageRow) - i;
            if (nearImageRow >= 0) {
                codeword = this.codewords[nearImageRow];
                if (codeword != null) {
                    return codeword;
                }
            }
            nearImageRow = this.imageRowToCodewordIndex(imageRow) + i;
            if (nearImageRow < this.codewords.length) {
                codeword = this.codewords[nearImageRow];
                if (codeword != null) {
                    return codeword;
                }
            }
        }
        return null;
    }

    /*final int*/ imageRowToCodewordIndex(imageRow: number): number {
        return imageRow - this.boundingBox.getMinY();
    }

    /*final void*/ setCodeword(imageRow: number, codeword: Codeword): void {
        this.codewords[this.imageRowToCodewordIndex(imageRow)] = codeword;
    }

/*final*/ getCodeword(imageRow: number): Codeword {
        return this.codewords[this.imageRowToCodewordIndex(imageRow)];
    }

/*final*/ getBoundingBox(): BoundingBox {
        return this.boundingBox;
    }

/*final*/ getCodewords(): Codeword[] {
        return this.codewords;
    }

    // @Override
    public toString(): string {
        const formatter = new Formatter();
        let row = 0;
        for (const codeword of this.codewords) {
            if (codeword == null) {
                formatter.format('%3d:    |   %n', row++);
                continue;
            }
            formatter.format('%3d: %3d|%3d%n', row++, codeword.getRowNumber(), codeword.getValue());
        }
        return formatter.toString();

    }

}
