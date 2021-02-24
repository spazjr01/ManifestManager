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

import PDF417Common from '../PDF417Common';

/**
 * @author Guenther Grau
 */
export default /*final*/ class BarcodeValue {
    private /*final*/ values = new Map<number, number>();

  /**
   * Add an occurrence of a value
   */
    setValue(value: number): void {
        value = Math.trunc(value);
        let confidence: number | undefined = this.values.get(value);
    if (confidence == null) {
      confidence = 0;
    }
    confidence++;
    this.values.set(value, confidence);
  }

  /**
   * Determines the maximum occurrence of a set value and returns all values which were set with this occurrence.
   * @return an array of int, containing the values with the highest occurrence, or null, if no value was set
   */
   getValue(): Int32Array {
       let maxConfidence: number = -1;
       let result: Array<number> = new Array<number>();
    for (const [key, value] of this.values.entries()) {

      const entry = {
        getKey: () => key,
        getValue: () => value,
      };

      if (entry.getValue() > maxConfidence) {
        maxConfidence = entry.getValue();
        result = [];
        result.push(entry.getKey());
      } else if (entry.getValue() === maxConfidence) {
        result.push(entry.getKey());
      }
    }
    return PDF417Common.toIntArray(result);
  }

    getConfidence(value: number): number | undefined {
    return this.values.get(value);
  }

}
