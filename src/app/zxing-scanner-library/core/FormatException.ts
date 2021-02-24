// Notes from Richard: 
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is being used
// to support the scanning capability of this solution.

import Exception from './Exception';

/**
 * Custom Error class of type Exception.
 */
export default class FormatException extends Exception {

    static getFormatInstance(): FormatException {
        return new FormatException();
    }
}
