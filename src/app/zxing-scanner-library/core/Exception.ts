// Notes from Richard: 
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is being used
// to support the scanning capability of this solution.

import { CustomError } from 'ts-custom-error';

/**
 * Custom Error class of type Exception.
 */
export default class Exception extends CustomError {

  /**
   * Allows Exception to be constructed directly
   * with some message and prototype definition.
   */
    constructor(
        public message: string = ''
        ) {
            super(message);
        }
}
