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
export default /*final*/ class Codeword {

  private static /*final*/ BARCODE_ROW_UNKNOWN: number = -1;

    private /*final*/ startX: number;
    private /*final*/ endX: number;
    private /*final*/ bucket: number;
    private /*final*/ value: number;
    private rowNumber: number = Codeword.BARCODE_ROW_UNKNOWN;

    constructor(startX: number, endX: number, bucket: number, value: number) {
    this.startX = Math.trunc(startX);
    this.endX = Math.trunc(endX);
    this.bucket = Math.trunc(bucket);
    this.value = Math.trunc(value);
  }

  hasValidRowNumber(): boolean {
    return this.isValidRowNumber(this.rowNumber);
  }

    isValidRowNumber(rowNumber: number): boolean {
    return rowNumber !== Codeword.BARCODE_ROW_UNKNOWN && this.bucket === (rowNumber % 3) * 3;
  }

  setRowNumberAsRowIndicatorColumn(): void {
    this.rowNumber = Math.trunc((Math.trunc(this.value / 30)) * 3 + Math.trunc(this.bucket / 3));
  }

    getWidth(): number {
    return this.endX - this.startX;
  }

    getStartX(): number {
    return this.startX;
  }

    getEndX(): number {
    return this.endX;
  }

    getBucket(): number {
    return this.bucket;
  }

    getValue(): number {
    return this.value;
  }

    getRowNumber(): number {
    return this.rowNumber;
  }

    setRowNumber(rowNumber: number ): void {
    this.rowNumber = rowNumber;
  }

//   @Override
  public  toString(): string {
    return this.rowNumber + '|' + this.value;
  }

}
