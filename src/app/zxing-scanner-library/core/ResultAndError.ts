// Notes from Richard: 
// This is part of the original ZXing libary open source code, which
// I migrated to the Manifest Manager solution.  This is being used
// to support the scanning capability of this solution.

import Result from './Result';
import Exception from './Exception';

export interface ResultAndError {
  result?: Result;
  error?: Exception;
}
