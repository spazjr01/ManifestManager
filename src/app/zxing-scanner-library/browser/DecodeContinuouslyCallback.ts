// Notes from Richard: 
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is being used
// to support the scanning capability of this solution.

import Exception from '../core/Exception';
import Result from '../core/Result';

/**
 * Callback format for continuous decode scan.
 */
export type DecodeContinuouslyCallback = (result: Result, error?: Exception) => any;
