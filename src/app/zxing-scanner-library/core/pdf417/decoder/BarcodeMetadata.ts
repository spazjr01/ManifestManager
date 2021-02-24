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

/**
 * @author Guenther Grau
 */
export default /*final*/ class BarcodeMetadata {

    private /*final*/ columnCount: number;
    private /*final*/ errorCorrectionLevel: number;
    private /*final*/ rowCountUpperPart: number;
    private /*final*/ rowCountLowerPart: number;
    private /*final*/ rowCount: number;

    constructor(columnCount: number, rowCountUpperPart: number, rowCountLowerPart: number, errorCorrectionLevel: number) {
    this.columnCount = columnCount;
    this.errorCorrectionLevel = errorCorrectionLevel;
    this.rowCountUpperPart = rowCountUpperPart;
    this.rowCountLowerPart = rowCountLowerPart;
    this.rowCount = rowCountUpperPart + rowCountLowerPart;
  }

    getColumnCount(): number {
    return this.columnCount;
  }

    getErrorCorrectionLevel(): number {
    return this.errorCorrectionLevel;
  }

    getRowCount(): number {
    return this.rowCount;
  }

    getRowCountUpperPart(): number {
    return this.rowCountUpperPart;
  }

    getRowCountLowerPart(): number {
    return this.rowCountLowerPart;
  }

}
