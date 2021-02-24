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

import NotFoundException from '../../NotFoundException';
import ResultPoint from '../../ResultPoint';
import BitMatrix from '../../common/BitMatrix';

/**
 * @author Guenther Grau
 */
export default /*final*/ class BoundingBox {

    private /*final*/ image!: BitMatrix;
    private /*final*/ topLeft: ResultPoint | undefined;
    private /*final*/ bottomLeft: ResultPoint | undefined;
    private /*final*/ topRight: ResultPoint | undefined;
    private /*final*/ bottomRight: ResultPoint | undefined;
    private /*final*/ minX!: number;
    private /*final*/ maxX!: number;
    private /*final*/ minY!: number;
    private /*final*/ maxY!: number;

    constructor(image: BitMatrix | BoundingBox,
        topLeft?: ResultPoint,
               bottomLeft?: ResultPoint,
               topRight?: ResultPoint,
               bottomRight?: ResultPoint)  {
    if (image instanceof BoundingBox) {
      this.constructor_2(image);
    } else {
      this.constructor_1(image, topLeft, bottomLeft, topRight, bottomRight);
    }
  }

  /**
   *
   * @param image
   * @param topLeft
   * @param bottomLeft
   * @param topRight
   * @param bottomRight
   *
   * @throws NotFoundException
   */
    private constructor_1(image: BitMatrix,
        topLeft: ResultPoint | undefined,
        bottomLeft: ResultPoint | undefined,
        topRight: ResultPoint | undefined,
        bottomRight: ResultPoint | undefined) {
    const leftUnspecified = topLeft == null || bottomLeft == null;
    const rightUnspecified = topRight == null || bottomRight == null;
    if (leftUnspecified && rightUnspecified) {
      throw new NotFoundException();
    }
        if (leftUnspecified) {
            if (topRight) {
                topLeft = new ResultPoint(0, topRight.getY());
            }
            if (bottomRight) {
                bottomLeft = new ResultPoint(0, bottomRight.getY());
            }
        } else if (rightUnspecified) {
            if (topLeft) {
                topRight = new ResultPoint(image.getWidth() - 1, topLeft.getY());
            }
            if (bottomLeft) {
                bottomRight = new ResultPoint(image.getWidth() - 1, bottomLeft.getY());
            }
    }
    this.image = image;
    this.topLeft = topLeft;
    this.bottomLeft = bottomLeft;
    this.topRight = topRight;
        this.bottomRight = bottomRight;
        if (topLeft && bottomLeft) {
            this.minX = <number>Math.trunc(Math.min(topLeft.getX(), bottomLeft.getX()));
        }
        if (topRight && bottomRight) {
            this.maxX = <number>Math.trunc(Math.max(topRight.getX(), bottomRight.getX()));
        }
        if (topLeft && topRight) {
            this.minY = <number>Math.trunc(Math.min(topLeft.getY(), topRight.getY()));
        }
        if (bottomLeft && bottomRight) {
            this.maxY = <number>Math.trunc(Math.max(bottomLeft.getY(), bottomRight.getY()));
        }
  }

  private constructor_2(boundingBox: BoundingBox) {
    this.image = boundingBox.image;
    this.topLeft = boundingBox.getTopLeft();
    this.bottomLeft = boundingBox.getBottomLeft();
    this.topRight = boundingBox.getTopRight();
    this.bottomRight = boundingBox.getBottomRight();
    this.minX = boundingBox.getMinX();
    this.maxX = boundingBox.getMaxX();
    this.minY = boundingBox.getMinY();
    this.maxY = boundingBox.getMaxY();
  }

  /**
   * @throws NotFoundException
   */
  static merge( leftBox: BoundingBox, rightBox: BoundingBox): BoundingBox {
    if (leftBox == null) {
      return rightBox;
    }
    if (rightBox == null) {
      return leftBox;
    }
    return new BoundingBox(leftBox.image, leftBox.topLeft, leftBox.bottomLeft, rightBox.topRight, rightBox.bottomRight);
  }

  /**
   * @throws NotFoundException
   */
    addMissingRows(missingStartRows: number, missingEndRows: number, isLeft: boolean): BoundingBox {
        let newTopLeft: ResultPoint | undefined = this.topLeft;
        let newBottomLeft: ResultPoint | undefined = this.bottomLeft;
        let newTopRight: ResultPoint | undefined = this.topRight;
        let newBottomRight: ResultPoint | undefined = this.bottomRight;

        if (missingStartRows > 0) {
            let top: ResultPoint | undefined = isLeft ? this.topLeft : this.topRight;
            let newMinY: number = -1;
            if (top) {
                newMinY = <number>Math.trunc(top.getY() - missingStartRows);
            }
            if (newMinY < 0) {
            newMinY = 0;
            }
            let newTop: ResultPoint | undefined;
            if (top) {
                newTop = new ResultPoint(top.getX(), newMinY);
            }
      
            if (isLeft) {
                newTopLeft = newTop;
            } else {
                newTopRight = newTop;
            }
        }

        if (missingEndRows > 0) {
            let bottom: ResultPoint | undefined = isLeft ? this.bottomLeft : this.bottomRight;
            let newMaxY: number; 
            if (bottom) {
                newMaxY = <number>Math.trunc(bottom.getY() + missingEndRows);
            }
            else {
                // not sure about this change
                newMaxY = 0;
            }
            if (newMaxY >= this.image.getHeight()) {
                newMaxY = this.image.getHeight() - 1;
            }
            let newBottom: ResultPoint | undefined;
            if (bottom) {
                newBottom = new ResultPoint(bottom.getX(), newMaxY);
            }
            
            if (isLeft) {
                newBottomLeft = newBottom;
            } else {
                newBottomRight = newBottom;
            }
    }

    return new BoundingBox(this.image, newTopLeft, newBottomLeft, newTopRight, newBottomRight);
  }

    getMinX(): number {
    return this.minX;
  }

    getMaxX(): number {
    return this.maxX;
  }

    getMinY(): number {
    return this.minY;
  }

    getMaxY(): number {
    return this.maxY;
  }

    getTopLeft(): ResultPoint | undefined {
    return this.topLeft;
  }

    getTopRight(): ResultPoint | undefined{
    return this.topRight;
  }

    getBottomLeft(): ResultPoint | undefined{
    return this.bottomLeft;
  }

    getBottomRight(): ResultPoint | undefined{
    return this.bottomRight;
  }

}
