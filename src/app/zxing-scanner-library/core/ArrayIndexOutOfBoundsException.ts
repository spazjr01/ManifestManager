// Notes from Richard: 
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is being used
// to support the scanning capability of this solution.

import IndexOutOfBoundsException from './IndexOutOfBoundsException';

/**
 * Custom Error class of type Exception.
 */
export default class ArrayIndexOutOfBoundsException extends IndexOutOfBoundsException {
  constructor(
    public index: number = undefined,
    public message: string = undefined
  ) {
    super(message);
  }
}
